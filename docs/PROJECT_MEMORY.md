# Project Memory

Last updated: 2026-02-18

## Fixed Decision

- This project uses Supabase schema `nowedding` for all app domain tables and policies.
- `public` schema is not used for wedding-domain entities.

## Why

- Existing Supabase project contains other products.
- Schema isolation prevents collision and accidental cross-service access.

## Current Setup

- Next.js app bootstrapped in this repository.
- Supabase SSR/browser clients set default schema from `NEXT_PUBLIC_SUPABASE_SCHEMA`.
- Environment default is `NEXT_PUBLIC_SUPABASE_SCHEMA=nowedding`.
- Initial Supabase migration added:
  - `/Volumes/data/Dev/know-wedding/supabase/migrations/20260218230500_init_nowedding_schema.sql`
- Edge Function skeletons added:
  - `/Volumes/data/Dev/know-wedding/supabase/functions/create_room/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/join_room/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/start_ceremony/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/end_event/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/payment_webhook/index.ts`

## Next Recommended Tasks

1. Link project with Supabase CLI and run migration on remote.
2. Replace placeholder join code generation with collision-safe flow.
3. Add webhook signature verification (Stripe or Toss) in `payment_webhook`.
4. Add integration tests for RLS and room capacity edge cases.
