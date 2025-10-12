#!/usr/bin/env node

/**
 * Database Verification Script for Trip&Treat
 * This script verifies that the database is set up correctly
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDatabase() {
  console.log('🔍 Verifying Trip&Treat database setup...\n');

  const checks = [
    { name: 'Profiles table', query: () => supabase.from('profiles').select('count').limit(1) },
    { name: 'Listings table', query: () => supabase.from('listings').select('count').limit(1) },
    { name: 'Listing images table', query: () => supabase.from('listing_images').select('count').limit(1) },
    { name: 'Bookings table', query: () => supabase.from('bookings').select('count').limit(1) },
    { name: 'Host applications table', query: () => supabase.from('host_applications').select('count').limit(1) },
    { name: 'Planned tours table', query: () => supabase.from('planned_tours').select('count').limit(1) }
  ];

  let allPassed = true;

  for (const check of checks) {
    try {
      const { data, error } = await check.query();
      
      if (error) {
        console.log(`❌ ${check.name}: ${error.message}`);
        allPassed = false;
      } else {
        console.log(`✅ ${check.name}: OK`);
      }
    } catch (err) {
      console.log(`❌ ${check.name}: ${err.message}`);
      allPassed = false;
    }
  }

  // Check for sample data
  console.log('\n📊 Checking sample data...');
  
  try {
    const { data: profiles } = await supabase.from('profiles').select('count');
    const { data: listings } = await supabase.from('listings').select('count');
    const { data: bookings } = await supabase.from('bookings').select('count');
    
    console.log(`👥 Profiles: ${profiles?.[0]?.count || 0} records`);
    console.log(`🏠 Listings: ${listings?.[0]?.count || 0} records`);
    console.log(`📅 Bookings: ${bookings?.[0]?.count || 0} records`);
    
    if ((profiles?.[0]?.count || 0) > 0) {
      console.log('✅ Sample data found');
    } else {
      console.log('⚠️  No sample data found - run `npm run db:setup` to add sample data');
    }
  } catch (err) {
    console.log(`❌ Error checking sample data: ${err.message}`);
    allPassed = false;
  }

  console.log('\n' + '='.repeat(50));
  
  if (allPassed) {
    console.log('🎉 Database verification completed successfully!');
    console.log('✅ All tables are accessible');
    console.log('✅ Database is ready for development');
  } else {
    console.log('❌ Database verification failed!');
    console.log('🔧 Please check the errors above and run `npm run db:setup`');
    process.exit(1);
  }
}

// Check if we're running this script directly
if (require.main === module) {
  verifyDatabase();
}

module.exports = { verifyDatabase };
