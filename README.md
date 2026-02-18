This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Rule

- Supabase schema for this app is `nowedding`.
- See `/Volumes/data/Dev/know-wedding/AGENTS.md` and `/Volumes/data/Dev/know-wedding/docs/PROJECT_MEMORY.md`.

## Supabase Structure

- Migration: `/Volumes/data/Dev/know-wedding/supabase/migrations/20260218230500_init_nowedding_schema.sql`
- Edge functions:
  - `/Volumes/data/Dev/know-wedding/supabase/functions/create_room/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/join_room/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/start_ceremony/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/end_event/index.ts`
  - `/Volumes/data/Dev/know-wedding/supabase/functions/payment_webhook/index.ts`

## Next API Wrappers

- `/Volumes/data/Dev/know-wedding/src/app/api/rooms/create/route.ts`
- `/Volumes/data/Dev/know-wedding/src/app/api/rooms/join/route.ts`
- `/Volumes/data/Dev/know-wedding/src/app/api/rooms/start/route.ts`
- `/Volumes/data/Dev/know-wedding/src/app/api/rooms/end/route.ts`

## Required Env

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_SCHEMA` (default: `nowedding`)
- `SUPABASE_SERVICE_ROLE_KEY` (required for Next API wrappers that invoke Edge Functions)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
