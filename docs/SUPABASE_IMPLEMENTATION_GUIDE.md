# Supabase Implementation Guide

## Prerequisites
- Supabase account (sign up at https://supabase.com)
- Supabase CLI installed (already installed via `npm install supabase --save-dev`)

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in project details:
   - **Name**: DebDestroyer
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (upgrade to Pro for production at $25/mo)
4. Wait for project to finish setting up (~2 minutes)
5. Save your project credentials:
   - **Project URL**: Found in Settings > API
   - **Anon Public Key**: Found in Settings > API
   - **Service Role Key**: Found in Settings > API (keep secret)

## Step 2: Link Local Project to Supabase

```bash
cd DebtDestroyer
npx supabase login
npx supabase link --project-ref <your-project-ref>
```

The `project-ref` is found in your Supabase dashboard URL: `https://supabase.com/dashboard/project/<project-ref>`

## Step 3: Deploy Database Schema

```bash
cd DebtDestroyer
npx supabase db push
```

This will deploy the migration file `supabase/migrations/20251122_initial_schema.sql` to your Supabase database.

## Step 4: Install Supabase Client Libraries

```bash
cd DebtDestroyer
npm install @supabase/supabase-js
npm install @react-native-async-storage/async-storage
npm install react-native-url-polyfill
```

## Step 5: Configure Environment Variables

Create `.env` file in `DebtDestroyer/` directory:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

Install dotenv for React Native:

```bash
npm install react-native-dotenv
```

Add to `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};
```

Create `types/env.d.ts`:

```typescript
declare module '@env' {
  export const SUPABASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
}
```

## Step 6: Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

## Step 7: Verify Database Connection

Test the connection:

```typescript
import { supabase } from './lib/supabase';

// Test query
const testConnection = async () => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('count');

  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log('Connection successful!');
  }
};
```

## Step 8: Enable Row Level Security (Already Configured)

The migration file already includes RLS policies. Verify in Supabase Dashboard:
- Go to Authentication > Policies
- All tables should show policies for SELECT, INSERT, UPDATE, DELETE

## Next Steps

1. **Implement Authentication** (Phase 6)
   - Email/password signup and login
   - Google/Apple OAuth (optional)

2. **Create Data Service Layer** (Phase 6)
   - CRUD operations for debts, expenses, goals
   - Sync local AsyncStorage data to Supabase

3. **Test Data Sync** (Phase 7)
   - Offline-first approach
   - Conflict resolution

## Useful Commands

```bash
# Start local Supabase (optional for development)
npx supabase start

# Stop local Supabase
npx supabase stop

# Check migration status
npx supabase db diff

# Create new migration
npx supabase migration new <migration-name>

# Reset database (CAUTION: deletes all data)
npx supabase db reset
```

## Cost Estimate

- **Free Tier**: 500MB database, 2GB bandwidth, 50MB file storage
- **Pro Tier**: $25/month - 8GB database, 250GB bandwidth, 100GB file storage
- **Production Recommendation**: Start with Free, upgrade to Pro when you have 100+ active users

## Security Checklist

- ✅ RLS policies enabled on all tables
- ✅ Service role key kept secret (never in client code)
- ✅ Anon key safe to expose (read/write limited by RLS)
- ⚠️ Add `.env` to `.gitignore` (prevent credential leaks)
- ⚠️ Use environment variables for all sensitive data
