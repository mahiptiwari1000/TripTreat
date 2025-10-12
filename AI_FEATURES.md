# 🤖 AI Features Documentation

This document explains the AI-powered features in Trip&Treat and how to configure them for different use cases.

## 📋 Overview

Trip&Treat includes AI-powered itinerary generation that can create personalized travel plans for Manipur, India. The AI features are **optional** and can be disabled for contributors to work without API costs.

## 🔧 Configuration

### **For Contributors (Default)**
AI features are **disabled by default** to ensure contributors can work without any costs:

```env
# In .env.local
ENABLE_AI_FEATURES=false
```

**Benefits:**
- ✅ No API keys required
- ✅ No costs incurred
- ✅ Full functionality testing
- ✅ Realistic sample data

### **For Production**
To enable AI features, set the environment variable and add API keys:

```env
# In .env.local
ENABLE_AI_FEATURES=true
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CSE_ID=your_google_cse_id_here
```

## 🛠️ How It Works

### **When AI Features Disabled (Default)**
- Uses pre-defined sample itineraries
- No external API calls
- No costs incurred
- Perfect for development and testing

### **When AI Features Enabled**
- Makes real-time Google searches for Manipur travel information
- Uses OpenAI GPT-4o-mini to generate personalized itineraries
- Provides up-to-date pricing and recommendations
- Incurs API costs per request

## 📊 Sample Itineraries

The system includes three tiers of sample itineraries:

### **Budget (₹0 - ₹4,999)**
- 3-day budget adventure
- Budget homestays (₹600-800/night)
- Public transportation
- Free and low-cost activities

### **Comfortable (₹5,000 - ₹14,999)**
- 4-day comfortable experience
- Mid-range homestays (₹1,200-1,500/night)
- Private transportation
- Guided tours and activities

### **Luxury (₹15,000+)**
- 5-day luxury discovery
- Premium accommodations (₹3,000-4,000/night)
- Private vehicles and helicopter tours
- Exclusive experiences and gourmet dining

## 💰 Cost Analysis

### **API Costs (When Enabled)**
- **OpenAI GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Google Custom Search**: $5 per 1,000 queries (first 100 queries/day free)
- **Estimated cost per itinerary**: $0.01-0.05

### **Cost-Free Alternative (Default)**
- Uses sample itineraries
- No external API calls
- Perfect for contributors and development

## 🚀 Getting Started

### **For Contributors**
1. Clone the repository
2. Set up environment variables (no API keys needed)
3. Start development server
4. AI features work with sample data

### **For Production**
1. Get API keys from OpenAI and Google
2. Set `ENABLE_AI_FEATURES=true`
3. Add API keys to environment variables
4. Deploy to Supabase

## 🔍 Testing

### **Test with Sample Data**
```bash
# Start the app
npm run dev

# Open the chatbot and try itinerary generation
# It will use sample data without API calls
```

### **Test with AI Features**
```bash
# Set ENABLE_AI_FEATURES=true in .env.local
# Add your API keys
# Restart the app
# Try itinerary generation - it will use real AI
```

## 🛡️ Security

- API keys are stored in environment variables
- No hardcoded credentials
- Secure Supabase function deployment
- Proper error handling and fallbacks

## 📝 Troubleshooting

### **Common Issues**

#### **"AI features disabled" message**
- This is normal for contributors
- Sample itineraries will be used instead
- No action needed unless you want to enable AI features

#### **"API keys not configured" message**
- Add your API keys to `.env.local`
- Set `ENABLE_AI_FEATURES=true`
- Restart the application

#### **"Error occurred, using sample itinerary" message**
- AI API call failed
- System automatically falls back to sample data
- Check your API keys and internet connection

## 🎯 Best Practices

### **For Contributors**
- Keep `ENABLE_AI_FEATURES=false`
- Use sample data for development
- Test all functionality without API costs

### **For Production**
- Monitor API usage and costs
- Set up proper error handling
- Consider rate limiting for high traffic

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Custom Search API](https://developers.google.com/custom-search/v1/introduction)
- [Supabase Functions](https://supabase.com/docs/guides/functions)

---

**Note**: This project is designed to be contributor-friendly. AI features are optional and disabled by default to ensure anyone can contribute without incurring costs.
