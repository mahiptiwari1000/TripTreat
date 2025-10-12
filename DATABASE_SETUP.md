# 🗄️ Database Setup Guide

This guide will help you set up the Trip&Treat database for local development.

## 📋 Prerequisites

- Node.js (v18 or higher)
- A Supabase account
- Git (to clone the repository)

## 🚀 Quick Setup

### 1. **Create a Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `trip-treat-dev` (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest to your location
6. Click "Create new project"
7. Wait for the project to be ready (2-3 minutes)

### 2. **Get Your Supabase Credentials**

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API Key** (anon/public key)

### 3. **Set Up Environment Variables**

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_APP_NAME=Trip&Treat
   VITE_APP_VERSION=1.0.0
   VITE_APP_DESCRIPTION=Trip and Treat - Discover homestays, experiences, and local attractions in Northeast India
   VITE_NODE_ENV=development

   # AI Features (Optional - Disabled by default for contributors)
   ENABLE_AI_FEATURES=false
   # Only add these if you want to enable AI features:
   # OPENAI_API_KEY=your_openai_api_key_here
   # GOOGLE_API_KEY=your_google_api_key_here
   # GOOGLE_CSE_ID=your_google_cse_id_here
   ```

### 4. **Run Database Migrations**

#### Option A: Using the Setup Script (Recommended)

```bash
# Install dependencies first
npm install

# Run the database setup script
node scripts/setup-database.js
```

#### Option B: Manual Setup

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the migration files in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_functions.sql`
   - `supabase/migrations/003_rls_policies.sql`
   - `supabase/migrations/004_seed_data.sql`

### 5. **Verify Setup**

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:8080](http://localhost:8080)

3. Try creating an account and logging in

4. Check if you can see sample data in the app

## 🗂️ Database Schema

### **Tables Overview**

| Table               | Description                | Key Features                     |
| ------------------- | -------------------------- | -------------------------------- |
| `profiles`          | User profiles and roles    | Admin, Host, User roles          |
| `listings`          | Homestay listings          | Price, amenities, location       |
| `listing_images`    | Images for listings        | Primary image support            |
| `bookings`          | User bookings              | Date validation, status tracking |
| `host_applications` | Host registration requests | Approval workflow                |
| `planned_tours`     | User-created itineraries   | Personal tour planning           |

### **Sample Data Included**

- ✅ **3 Sample Users**: Admin, Host, Regular user
- ✅ **3 Sample Homestays**: Traditional, Lake view, Hillside
- ✅ **Sample Images**: Linked to homestays
- ✅ **Sample Bookings**: Various statuses and dates
- ✅ **Sample Applications**: Host registration examples
- ✅ **Sample Tours**: User-created itineraries

## 🔐 Security Features

### **Row Level Security (RLS)**

- Users can only see their own data
- Admins can manage everything
- Hosts can manage their listings
- Public can view active listings

### **User Roles**

- **Admin**: Full access to all data
- **Host**: Can manage listings and view bookings
- **User**: Can create bookings and view their data

## 🛠️ Troubleshooting

### **Common Issues**

#### ❌ "Invalid API key" error

- Check your `.env.local` file
- Verify the Supabase URL and key are correct
- Ensure there are no extra spaces or quotes

#### ❌ "Table doesn't exist" error

- Run the migration files in the correct order
- Check the Supabase SQL Editor for any errors
- Verify all tables were created successfully

#### ❌ "Permission denied" error

- Check if RLS policies are enabled
- Verify user authentication is working
- Check if the user has the correct role

#### ❌ "Connection failed" error

- Check your internet connection
- Verify the Supabase project is active
- Check if the project URL is correct

### **Getting Help**

1. **Check the logs**: Look at the browser console and terminal for error messages
2. **Verify setup**: Ensure all steps were completed correctly
3. **Check Supabase**: Verify your project is active and accessible
4. **Ask for help**: Create an issue on GitHub with your error details

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/sql-editor)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)

## 🎉 You're Ready!

Once you've completed these steps, you should have:

- ✅ A working local development environment
- ✅ Sample data to test with
- ✅ All database tables and relationships
- ✅ Proper security policies

Happy coding! 🚀
