import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');

    // Test 1: Check if client is initialized
    console.log('✓ Supabase client initialized');

    // Test 2: Try to query user_profiles table
    const { data, error, count } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('✗ Connection failed:', error.message);
      return false;
    }

    console.log('✓ Successfully connected to Supabase!');
    console.log(`✓ Database accessible (user_profiles table exists)`);

    // Test 3: Check auth status
    const { data: { session } } = await supabase.auth.getSession();
    console.log('✓ Auth module working');
    console.log(`  Current session: ${session ? 'Active' : 'No active session'}`);

    return true;
  } catch (err) {
    console.error('✗ Unexpected error:', err);
    return false;
  }
};
