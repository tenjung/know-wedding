-- Initial schema for No Wedding / Know Wedding
-- IMPORTANT: app domain tables live in nowedding schema only.

create schema if not exists nowedding;

grant usage on schema nowedding to anon, authenticated, service_role;

create or replace function nowedding.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists nowedding.rooms (
  id uuid primary key default gen_random_uuid(),
  host_user_id uuid not null references auth.users(id) on delete restrict,
  title text not null,
  scheduled_at timestamptz,
  status text not null default 'lobby' check (status in ('lobby', 'ceremony', 'archive')),
  capacity integer not null default 30 check (capacity > 0 and capacity <= 30),
  join_code text not null unique,
  theme_id text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists nowedding.room_members (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references nowedding.rooms(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  nickname text not null,
  role text not null default 'guest' check (role in ('host', 'guest')),
  skin_id text,
  joined_at timestamptz not null default timezone('utc', now()),
  left_at timestamptz
);

create unique index if not exists room_members_room_user_unique
  on nowedding.room_members(room_id, user_id)
  where user_id is not null;

create table if not exists nowedding.room_object_state (
  room_id uuid primary key references nowedding.rooms(id) on delete cascade,
  billboard_text text,
  billboard_queue jsonb not null default '[]'::jsonb,
  decor_objects jsonb not null default '[]'::jsonb,
  active_effects jsonb not null default '[]'::jsonb,
  theme_id text,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists nowedding.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references nowedding.rooms(id) on delete cascade,
  member_id uuid not null references nowedding.room_members(id) on delete cascade,
  message text not null,
  type text not null default 'normal' check (type in ('normal', 'stamp')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists nowedding.items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('billboard', 'effect', 'decor', 'theme', 'aura', 'stamp')),
  price numeric(12, 2) not null check (price >= 0),
  payload_schema jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists nowedding.purchases (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references nowedding.rooms(id) on delete cascade,
  buyer_member_id uuid not null references nowedding.room_members(id) on delete restrict,
  item_id uuid not null references nowedding.items(id) on delete restrict,
  price numeric(12, 2) not null check (price >= 0),
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded')),
  provider text,
  provider_tx_id text,
  created_at timestamptz not null default timezone('utc', now()),
  paid_at timestamptz,
  refunded_at timestamptz,
  unique (provider, provider_tx_id)
);

create table if not exists nowedding.settlements (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null unique references nowedding.rooms(id) on delete cascade,
  gross numeric(12, 2) not null default 0,
  fee numeric(12, 2) not null default 0,
  net numeric(12, 2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'paid')),
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists room_members_room_id_idx on nowedding.room_members(room_id);
create index if not exists room_members_user_id_idx on nowedding.room_members(user_id);
create index if not exists chat_messages_room_id_created_at_idx on nowedding.chat_messages(room_id, created_at desc);
create index if not exists purchases_room_id_created_at_idx on nowedding.purchases(room_id, created_at desc);

create trigger rooms_set_updated_at
before update on nowedding.rooms
for each row
execute function nowedding.set_updated_at();

create trigger room_object_state_set_updated_at
before update on nowedding.room_object_state
for each row
execute function nowedding.set_updated_at();

create trigger settlements_set_updated_at
before update on nowedding.settlements
for each row
execute function nowedding.set_updated_at();

create or replace function nowedding.is_room_member(target_room_id uuid)
returns boolean
language sql
security definer
set search_path = nowedding, public
stable
as $$
  select exists (
    select 1
    from nowedding.room_members rm
    where rm.room_id = target_room_id
      and rm.user_id = auth.uid()
      and rm.left_at is null
  );
$$;

create or replace function nowedding.is_room_host(target_room_id uuid)
returns boolean
language sql
security definer
set search_path = nowedding, public
stable
as $$
  select exists (
    select 1
    from nowedding.rooms r
    where r.id = target_room_id
      and r.host_user_id = auth.uid()
  );
$$;

grant execute on function nowedding.is_room_member(uuid) to authenticated;
grant execute on function nowedding.is_room_host(uuid) to authenticated;

create or replace function nowedding.increment_settlement_totals(
  p_room_id uuid,
  p_gross_inc numeric,
  p_fee_inc numeric,
  p_net_inc numeric
)
returns void
language plpgsql
security definer
set search_path = nowedding, public
as $$
begin
  insert into nowedding.settlements (room_id, gross, fee, net, status)
  values (p_room_id, p_gross_inc, p_fee_inc, p_net_inc, 'pending')
  on conflict (room_id)
  do update set
    gross = nowedding.settlements.gross + excluded.gross,
    fee = nowedding.settlements.fee + excluded.fee,
    net = nowedding.settlements.net + excluded.net,
    updated_at = timezone('utc', now());
end;
$$;

grant execute on function nowedding.increment_settlement_totals(uuid, numeric, numeric, numeric) to service_role;

alter table nowedding.rooms enable row level security;
alter table nowedding.room_members enable row level security;
alter table nowedding.room_object_state enable row level security;
alter table nowedding.chat_messages enable row level security;
alter table nowedding.items enable row level security;
alter table nowedding.purchases enable row level security;
alter table nowedding.settlements enable row level security;

-- rooms: room members can read, host can write
create policy rooms_select_for_members
on nowedding.rooms
for select
to authenticated
using (nowedding.is_room_member(id) or host_user_id = auth.uid());

create policy rooms_insert_for_host
on nowedding.rooms
for insert
to authenticated
with check (host_user_id = auth.uid());

create policy rooms_update_for_host
on nowedding.rooms
for update
to authenticated
using (host_user_id = auth.uid())
with check (host_user_id = auth.uid());

-- room_members: room members can read members in same room
create policy room_members_select_for_members
on nowedding.room_members
for select
to authenticated
using (nowedding.is_room_member(room_id) or nowedding.is_room_host(room_id));

-- user can add self as guest; host can add host/member entries
create policy room_members_insert_self_or_host
on nowedding.room_members
for insert
to authenticated
with check (
  (user_id = auth.uid() and role = 'guest')
  or nowedding.is_room_host(room_id)
);

create policy room_members_update_self_or_host
on nowedding.room_members
for update
to authenticated
using (user_id = auth.uid() or nowedding.is_room_host(room_id))
with check (user_id = auth.uid() or nowedding.is_room_host(room_id));

-- room_object_state: members read, host writes
create policy room_object_state_select_for_members
on nowedding.room_object_state
for select
to authenticated
using (nowedding.is_room_member(room_id) or nowedding.is_room_host(room_id));

create policy room_object_state_insert_for_host
on nowedding.room_object_state
for insert
to authenticated
with check (nowedding.is_room_host(room_id));

create policy room_object_state_update_for_host
on nowedding.room_object_state
for update
to authenticated
using (nowedding.is_room_host(room_id))
with check (nowedding.is_room_host(room_id));

-- chat: room members read/write
create policy chat_messages_select_for_members
on nowedding.chat_messages
for select
to authenticated
using (nowedding.is_room_member(room_id) or nowedding.is_room_host(room_id));

create policy chat_messages_insert_for_members
on nowedding.chat_messages
for insert
to authenticated
with check (
  exists (
    select 1
    from nowedding.room_members rm
    where rm.id = member_id
      and rm.room_id = room_id
      and rm.user_id = auth.uid()
      and rm.left_at is null
  )
);

-- items: authenticated read only active catalog
create policy items_select_active
on nowedding.items
for select
to authenticated
using (is_active = true);

-- purchases: buyer read only, insert/update should be done by backend service role
create policy purchases_select_for_buyer
on nowedding.purchases
for select
to authenticated
using (
  exists (
    select 1
    from nowedding.room_members rm
    where rm.id = buyer_member_id
      and rm.user_id = auth.uid()
  )
);

-- settlements: host read only
create policy settlements_select_for_host
on nowedding.settlements
for select
to authenticated
using (nowedding.is_room_host(room_id));

-- Restrict direct client writes for these tables to keep webhook/edge as source of truth.
revoke insert, update, delete on nowedding.purchases from authenticated, anon;
revoke insert, update, delete on nowedding.settlements from authenticated, anon;

-- Base grants for PostgREST roles (RLS still applies)
grant select on all tables in schema nowedding to authenticated;
grant insert, update, delete on nowedding.rooms to authenticated;
grant insert, update on nowedding.room_members to authenticated;
grant insert on nowedding.chat_messages to authenticated;
grant insert, update on nowedding.room_object_state to authenticated;
