import "https://deno.land/x/xhr@0.1.0/mod.ts";
 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 // Environment variables
 const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
 const GOOGLE_CSE_ID = Deno.env.get("GOOGLE_CSE_ID");
 const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
 
 // CORS headers for browser requests
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
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
     return data.items?.slice(0, 5).map((item: any) => ({
       title: item.title,
       snippet: item.snippet,
       link: item.link
     })) || [];
   } catch (error) {
     console.error("Error searching Google:", error);
     return [];
   }
 }
 
 // Function to generate a travel itinerary using OpenAI
 async function generateItinerary(budget: number, searchResults: any[]) {
   try {
     console.log(`Generating itinerary for budget: ₹${budget}`);
     
     // Format search results for OpenAI prompt
     const formattedResults = searchResults.map(result => 
       `Title: ${result.title}\nSnippet: ${result.snippet}\nLink: ${result.link}`
     ).join("\n\n");
     
     const response = await fetch("https://api.openai.com/v1/chat/completions", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${OPENAI_API_KEY}`
       },
       body: JSON.stringify({
         model: "gpt-4o-mini",
         messages: [
           {
             role: "system",
             content: "You are a travel itinerary expert specializing in Manipur, India. Generate detailed, practical itineraries with budget breakdowns. Include specific homestays, eateries, and activities in Manipur with approximate costs."
           },
           {
             role: "user",
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
 
 Make the itinerary detailed, practical and ensure the total stays within the budget of ₹${budget}.`
           }
         ],
         temperature: 0.7,
         max_tokens: 2000
       })
     });
     
     if (!response.ok) {
       throw new Error(`OpenAI API error: ${response.status}`);
     }
     
     const data = await response.json();
     console.log("Successfully generated itinerary");
     return data.choices[0].message.content;
   } catch (error) {
     console.error("Error generating itinerary:", error);
     throw error;
   }
 }
 
 serve(async (req) => {
   // Handle CORS preflight requests
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     // Check if required API keys are available
     if (!OPENAI_API_KEY || !GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
       throw new Error("Missing required API keys");
     }
 
     const { budget } = await req.json();
     
     if (!budget || isNaN(budget)) {
       throw new Error("Valid budget is required");
     }
 
     console.log(`Processing itinerary request for budget: ₹${budget}`);
     
     // Perform Google searches for Manipur travel information
     const searchQueries = [
       "Manipur tourist attractions hotspots",
       "Manipur homestays accommodation prices",
       "Manipur local food restaurants prices",
       "Manipur transportation cost travel",
       "Manipur cultural activities experiences"
     ];
     
     // Execute all searches concurrently
     const searchResultsPromises = searchQueries.map(query => searchGoogle(query));
     const searchResultsArray = await Promise.all(searchResultsPromises);
     
     // Flatten the search results
     const searchResults = searchResultsArray.flat();
     
     // Generate the itinerary using the search results
     const itinerary = await generateItinerary(budget, searchResults);
     
     return new Response(JSON.stringify({ itinerary }), {
       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
     });
   } catch (error) {
     console.error("Error:", error);
     return new Response(JSON.stringify({ error: error.message }), {
       status: 500,
       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
     });
   }
 });