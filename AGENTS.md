# AGENTS.md

## Project Persistent Rules

1. Supabase database work for this repository must use the `nowedding` schema.
2. Do not create or modify tables in the `public` schema for app domain data.
3. Keep schema-qualified SQL explicit, for example `nowedding.rooms`.
4. Apply the same schema policy to RLS, functions, triggers, and views.
5. If a generated query or migration targets `public`, correct it to `nowedding` before applying.

## Runtime/Code Defaults

1. `NEXT_PUBLIC_SUPABASE_SCHEMA` defaults to `nowedding`.
2. Supabase clients in `src/lib/supabase/*` are configured to use this schema by default.

## Handoff Notes

1. Before new DB work, read `/Volumes/data/Dev/know-wedding/docs/PROJECT_MEMORY.md`.
2. When major decisions change, update that memory file in the same task.
