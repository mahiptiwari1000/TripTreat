import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// Environment variables
const ENABLE_AI_FEATURES = Deno.env.get('ENABLE_AI_FEATURES') === 'true';
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const GOOGLE_CSE_ID = Deno.env.get('GOOGLE_CSE_ID');
const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

// Mock itinerary data for when AI features are disabled
const mockItineraries = {
  low: `🏠 **Budget Manipur Adventure (₹${budget})**

**Day 1: Arrival in Imphal**
- Morning: Arrive in Imphal, check into budget homestay (₹800/night)
- Afternoon: Visit Kangla Fort (Free entry)
- Evening: Explore Ima Keithel market, try local street food (₹200)
- Dinner: Traditional Manipuri thali at local eatery (₹150)

**Day 2: Loktak Lake Exploration**
- Morning: Travel to Loktak Lake (₹300 by bus)
- Afternoon: Boat ride on Loktak Lake (₹200)
- Evening: Visit Keibul Lamjao National Park (₹100 entry)
- Stay: Budget homestay near lake (₹600/night)

**Day 3: Cultural Immersion**
- Morning: Visit Manipur State Museum (₹50 entry)
- Afternoon: Explore Shree Govindajee Temple (Free)
- Evening: Traditional dance performance (₹100)
- Return to Imphal

**Total Estimated Cost: ₹${budget}**
- Accommodation: ₹1,400 (2 nights)
- Food: ₹500
- Transportation: ₹500
- Activities: ₹250
- Buffer: ₹350

*Note: This is a sample itinerary. AI features are disabled for open source contributors.*`,

  medium: `🌟 **Comfortable Manipur Experience (₹${budget})**

**Day 1: Imphal Arrival & City Tour**
- Morning: Arrive in Imphal, check into comfortable homestay (₹1,500/night)
- Afternoon: Private tour of Kangla Fort with guide (₹500)
- Evening: Fine dining at traditional Manipuri restaurant (₹400)
- Night: Cultural show at auditorium (₹200)

**Day 2: Loktak Lake & Wildlife**
- Morning: Private car to Loktak Lake (₹800)
- Afternoon: Premium boat tour with guide (₹600)
- Evening: Stay at lake-view homestay (₹1,200/night)
- Dinner: Fresh fish dinner (₹300)

**Day 3: Ukhrul Hills Adventure**
- Morning: Travel to Ukhrul (₹1,000)
- Afternoon: Hiking and nature exploration (₹300)
- Evening: Return to Imphal (₹1,000)
- Stay: Comfortable homestay (₹1,500/night)

**Day 4: Cultural Heritage**
- Morning: Visit Manipur State Museum (₹100)
- Afternoon: Traditional craft workshop (₹500)
- Evening: Farewell dinner (₹400)

**Total Estimated Cost: ₹${budget}**
- Accommodation: ₹4,200 (3 nights)
- Food: ₹1,500
- Transportation: ₹2,600
- Activities: ₹1,100
- Buffer: ₹600

*Note: This is a sample itinerary. AI features are disabled for open source contributors.*`,

  high: `👑 **Luxury Manipur Discovery (₹${budget})**

**Day 1: Premium Arrival**
- Morning: Arrive in Imphal, luxury homestay (₹3,000/night)
- Afternoon: Private guided tour of Kangla Fort (₹1,000)
- Evening: Fine dining at 5-star restaurant (₹800)
- Night: Exclusive cultural performance (₹500)

**Day 2: Loktak Lake Luxury**
- Morning: Private car with driver to Loktak (₹1,500)
- Afternoon: Premium boat tour with personal guide (₹1,200)
- Evening: Luxury lake resort (₹4,000/night)
- Dinner: Gourmet meal with local delicacies (₹1,000)

**Day 3: Ukhrul Hills Premium**
- Morning: Private helicopter tour to Ukhrul (₹5,000)
- Afternoon: Private hiking guide and equipment (₹1,500)
- Evening: Luxury mountain lodge (₹3,500/night)
- Dinner: Chef's special menu (₹800)

**Day 4: Cultural Immersion**
- Morning: Private museum tour with curator (₹800)
- Afternoon: Exclusive craft workshop with master artisans (₹1,200)
- Evening: Return to Imphal in luxury vehicle (₹1,500)
- Stay: Premium homestay (₹3,000/night)

**Day 5: Departure**
- Morning: Spa treatment and relaxation (₹1,000)
- Afternoon: Final shopping and farewell lunch (₹600)
- Evening: Departure

**Total Estimated Cost: ₹${budget}**
- Accommodation: ₹13,500 (4 nights)
- Food: ₹4,200
- Transportation: ₹8,000
- Activities: ₹4,000
- Buffer: ₹5,300

*Note: This is a sample itinerary. AI features are disabled for open source contributors.*`
};

// Function to generate mock itinerary based on budget
function generateMockItinerary(budget: number): string {
  if (budget < 5000) {
    return mockItineraries.low.replace(/\${budget}/g, budget.toString());
  } else if (budget < 15000) {
    return mockItineraries.medium.replace(/\${budget}/g, budget.toString());
  } else {
    return mockItineraries.high.replace(/\${budget}/g, budget.toString());
  }
}

// Function to perform a Google search
async function searchGoogle(query: string) {
  try {
    console.log(`Searching Google for: ${query}`);
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google search failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Google search returned ${data.items?.length || 0} results`);

    // Extract useful information from search results
    return (
      data.items?.slice(0, 5).map((item: any) => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link,
      })) || []
    );
  } catch (error) {
    console.error('Error searching Google:', error);
    return [];
  }
}

// Function to generate a travel itinerary using OpenAI
async function generateItinerary(budget: number, searchResults: any[]) {
  try {
    console.log(`Generating itinerary for budget: ₹${budget}`);

    // Format search results for OpenAI prompt
    const formattedResults = searchResults
      .map(
        result =>
          `Title: ${result.title}\nSnippet: ${result.snippet}\nLink: ${result.link}`
      )
      .join('\n\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a travel itinerary expert specializing in Manipur, India. Generate detailed, practical itineraries with budget breakdowns. Include specific homestays, eateries, and activities in Manipur with approximate costs.',
          },
          {
            role: 'user',
            content: `Create a detailed multi-day travel itinerary for Manipur, India with a total budget of ₹${budget}. 
             
 The itinerary should include:
 1. Recommended number of days based on the budget
 2. Daily activities with specific locations in Manipur
 3. Recommended homestays with approximate prices per night
 4. Food recommendations with approximate costs
 5. Transportation suggestions and costs
 6. Any additional expenses to consider
 7. A detailed breakdown of the entire budget
 
 Here is some information about Manipur attractions and services to help you:
 ${formattedResults}
 
 Make the itinerary detailed, practical and ensure the total stays within the budget of ₹${budget}.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully generated itinerary');
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
}

serve(async req => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { budget } = await req.json();

    if (!budget || isNaN(budget)) {
      throw new Error('Valid budget is required');
    }

    console.log(`Processing itinerary request for budget: ₹${budget}`);

    // Check if AI features are enabled
    if (!ENABLE_AI_FEATURES) {
      console.log('AI features disabled, using mock itinerary');
      const mockItinerary = generateMockItinerary(budget);
      return new Response(JSON.stringify({ 
        itinerary: mockItinerary,
        isMock: true,
        message: 'AI features disabled. Using sample itinerary for open source contributors.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if required API keys are available for AI features
    if (!OPENAI_API_KEY || !GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
      console.log('API keys missing, falling back to mock itinerary');
      const mockItinerary = generateMockItinerary(budget);
      return new Response(JSON.stringify({ 
        itinerary: mockItinerary,
        isMock: true,
        message: 'API keys not configured. Using sample itinerary.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Perform Google searches for Manipur travel information
    const searchQueries = [
      'Manipur tourist attractions hotspots',
      'Manipur homestays accommodation prices',
      'Manipur local food restaurants prices',
      'Manipur transportation cost travel',
      'Manipur cultural activities experiences',
    ];

    // Execute all searches concurrently
    const searchResultsPromises = searchQueries.map(query =>
      searchGoogle(query)
    );
    const searchResultsArray = await Promise.all(searchResultsPromises);

    // Flatten the search results
    const searchResults = searchResultsArray.flat();

    // Generate the itinerary using the search results
    const itinerary = await generateItinerary(budget, searchResults);

    return new Response(JSON.stringify({ 
      itinerary,
      isMock: false,
      message: 'AI-generated itinerary using real-time data'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    
    // Fallback to mock data even on error
    try {
      const { budget } = await req.json();
      const mockItinerary = generateMockItinerary(budget || 10000);
      return new Response(JSON.stringify({ 
        itinerary: mockItinerary,
        isMock: true,
        message: 'Error occurred, using sample itinerary as fallback'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fallbackError) {
      return new Response(JSON.stringify({ 
        error: 'Unable to process request',
        message: 'Please try again or contact support'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }
});
