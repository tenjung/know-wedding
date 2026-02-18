-- MVP feature upgrade for 2D virtual wedding room (30 concurrent users)
-- Schema: nowedding

create table if not exists nowedding.room_templates (
  id text primary key,
  name text not null,
  description text,
  default_background_key text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

insert into nowedding.room_templates (id, name, description, default_background_key)
values
  ('classic_hall', 'Classic Hall', 'Traditional indoor hall style with stage focus.', 'bg_classic_hall'),
  ('garden_daylight', 'Garden Daylight', 'Outdoor bright ceremony mood.', 'bg_garden_daylight'),
  ('night_reception', 'Night Reception', 'Evening reception with spotlight atmosphere.', 'bg_night_reception')
on conflict (id) do nothing;

alter table nowedding.rooms
  add column if not exists template_id text references nowedding.room_templates(id),
  add column if not exists background_key text,
  add column if not exists couple_name_a text,
  add column if not exists couple_name_b text,
  add column if not exists greeting_message text,
  add column if not exists account_bank text,
  add column if not exists account_holder text,
  add column if not exists account_number text,
  add column if not exists ceremony_started_at timestamptz,
  add column if not exists ceremony_ended_at timestamptz;

create table if not exists nowedding.ceremony_program_items (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references nowedding.rooms(id) on delete cascade,
  item_type text not null check (item_type in ('speech', 'video')),
  title text not null,
  starts_after_sec integer not null default 0 check (starts_after_sec >= 0),
  duration_sec integer not null default 60 check (duration_sec > 0),
  video_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists ceremony_program_items_room_id_idx
  on nowedding.ceremony_program_items(room_id, sort_order);

create table if not exists nowedding.room_reactions (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references nowedding.rooms(id) on delete cascade,
  member_id uuid references nowedding.room_members(id) on delete set null,
  reaction_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists room_reactions_room_id_created_at_idx
  on nowedding.room_reactions(room_id, created_at desc);

create table if not exists nowedding.archived_media (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references nowedding.rooms(id) on delete cascade,
  member_id uuid references nowedding.room_members(id) on delete set null,
  media_type text not null check (media_type in ('image', 'video')),
  storage_path text not null,
  caption text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists archived_media_room_id_created_at_idx
  on nowedding.archived_media(room_id, created_at desc);

alter table nowedding.room_templates enable row level security;
alter table nowedding.ceremony_program_items enable row level security;
alter table nowedding.room_reactions enable row level security;
alter table nowedding.archived_media enable row level security;

create policy room_templates_select_active
on nowedding.room_templates
for select
to authenticated
using (is_active = true);

create policy ceremony_program_items_select_for_members
on nowedding.ceremony_program_items
for select
to authenticated
using (nowedding.is_room_member(room_id) or nowedding.is_room_host(room_id));

create policy ceremony_program_items_insert_for_host
on nowedding.ceremony_program_items
for insert
to authenticated
with check (nowedding.is_room_host(room_id));

create policy ceremony_program_items_update_for_host
on nowedding.ceremony_program_items
for update
to authenticated
using (nowedding.is_room_host(room_id))
with check (nowedding.is_room_host(room_id));

create policy ceremony_program_items_delete_for_host
on nowedding.ceremony_program_items
for delete
to authenticated
using (nowedding.is_room_host(room_id));

create policy room_reactions_select_for_members
on nowedding.room_reactions
for select
to authenticated
using (nowedding.is_room_member(room_id) or nowedding.is_room_host(room_id));

create policy room_reactions_insert_for_members
on nowedding.room_reactions
for insert
to authenticated
with check (
  nowedding.is_room_member(room_id)
  and (
    member_id is null
    or exists (
      select 1
      from nowedding.room_members rm
      where rm.id = member_id
        and rm.room_id = room_id
        and rm.user_id = auth.uid()
        and rm.left_at is null
    )
  )
);

create policy archived_media_select_for_members
on nowedding.archived_media
for select
to authenticated
using (nowedding.is_room_member(room_id) or nowedding.is_room_host(room_id));

create policy archived_media_insert_for_members
on nowedding.archived_media
for insert
to authenticated
with check (
  nowedding.is_room_member(room_id)
  and (
    member_id is null
    or exists (
      select 1
      from nowedding.room_members rm
      where rm.id = member_id
        and rm.room_id = room_id
        and rm.user_id = auth.uid()
        and rm.left_at is null
    )
  )
);

grant select on nowedding.room_templates to authenticated;
grant select, insert, update, delete on nowedding.ceremony_program_items to authenticated;
grant select, insert on nowedding.room_reactions to authenticated;
grant select, insert on nowedding.archived_media to authenticated;
