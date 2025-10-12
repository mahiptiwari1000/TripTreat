#!/usr/bin/env node

/**
 * Database Setup Script for Trip&Treat
 * This script helps contributors set up their local database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error(
    'Please check your .env.local file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  console.log('🚀 Setting up Trip&Treat database...\n');

  try {
    // Read migration files
    const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
    const migrationFiles = [
      '001_initial_schema.sql',
      '002_functions.sql',
      '003_rls_policies.sql',
      '004_seed_data.sql',
    ];

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);

      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Migration file not found: ${file}`);
        continue;
      }

      console.log(`📄 Running migration: ${file}`);

      const sql = fs.readFileSync(filePath, 'utf8');

      // Split SQL into individual statements
      const statements = sql
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      for (const statement of statements) {
        if (statement.trim()) {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          if (error) {
            console.warn(`⚠️  Warning in ${file}: ${error.message}`);
          }
        }
      }

      console.log(`✅ Completed: ${file}`);
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Visit http://localhost:8080');
    console.log('3. Try creating an account and exploring the app');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check your Supabase credentials in .env.local');
    console.error('2. Ensure your Supabase project is active');
    console.error('3. Check if you have the necessary permissions');
    process.exit(1);
  }
}

// Check if we're running this script directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
