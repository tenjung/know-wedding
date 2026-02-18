# No Wedding 2D Virtual Room MVP Functional Spec

Updated: 2026-02-18

## Goal

- Build a 2D avatar wedding room for up to 30 concurrent participants.
- Preserve key wedding functions without a physical ceremony: notify, celebrate, gift, archive.

## Scope (In)

### 1. Room Creation

- 3 fixed templates:
  - `classic_hall`
  - `garden_daylight`
  - `night_reception`
- Input fields:
  - couple names
  - greeting message
  - background key (optional override)
  - account info (bank, holder, account number)
- Capacity hard limit: 30

### 2. Real-time Entry

- Nickname-based join
- 2D avatar skin ID
- Position sync via Supabase Realtime broadcast only (no high-frequency DB writes)

### 3. Ceremony Progress

- Host-only state transitions:
  - `lobby -> ceremony -> archive`
- Program items:
  - `speech` timer blocks
  - `video` playback blocks with URL
- Ceremony timestamps recorded on start/end

### 4. Gift Display

- Room-level account information stored and rendered in UI
- Copy-friendly account value in client UI

### 5. Archive

- Chat log table already persisted
- Archived media metadata table for uploaded videos/images
- Reactions stored as low-frequency log events

## Scope (Out)

- AI auto theme generation
- Advanced avatar customization
- NFT/blockchain features
- Multi-room horizontal scaling beyond current room architecture

## Monetization Direction (Direct)

### Pricing

- Base virtual wedding room: 390,000 KRW
  - 1 event
  - 1-year archive retention
- Premium package: 990,000 KRW+
  - Custom theme
  - Video production add-on
  - Unlimited retention
  - USB delivery

### Upsell Funnel

- Free invitation
- VIP design invitation
- Virtual wedding room
- Video production add-on

### Additional Revenue

- Theme marketplace sales
- Extended data retention plans
- Partnership advertising
- Linked shooting package sales

## Data Model Additions

- `nowedding.room_templates`
- `nowedding.ceremony_program_items`
- `nowedding.room_reactions`
- `nowedding.archived_media`
- `nowedding.rooms` extended with:
  - `template_id`, `background_key`
  - `couple_name_a`, `couple_name_b`, `greeting_message`
  - `account_bank`, `account_holder`, `account_number`
  - `ceremony_started_at`, `ceremony_ended_at`

## Security/RLS

- Room templates: authenticated read (`is_active = true`)
- Ceremony program: room members read, host write
- Reactions/media: room members read/insert
- Existing room/member/host RLS policy kept as base

## Implementation Status

- Migration added for all fields/tables and RLS policies.
- `create_room` function upgraded for new room metadata.
- `start_ceremony` and `end_event` record ceremony timestamps.
- Dev room control page supports template/couple/account inputs.
