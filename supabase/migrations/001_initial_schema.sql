-- ============================================
-- ReceiptFlow MVP Schema
-- ============================================

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  telegram_chat_id bigint unique,
  default_project_id uuid,
  pending_telegram_file_id text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  is_default boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Project field settings
create table public.project_field_settings (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  field_name text not null,
  is_enabled boolean default true,
  display_order int default 0,
  unique(project_id, field_name)
);

-- Bot connections
create table public.bot_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  token text unique not null,
  telegram_chat_id bigint,
  status text default 'pending' not null check (status in ('pending', 'active', 'expired', 'revoked')),
  expires_at timestamptz not null,
  connected_at timestamptz,
  created_at timestamptz default now() not null
);

-- Receipts
create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  image_url text not null,
  vendor_name text,
  total_amount numeric(12,2),
  receipt_date date,
  currency text,
  vat_amount numeric(12,2),
  receipt_number text,
  category text,
  notes text,
  raw_text text,
  status text default 'processing' not null check (status in ('processing', 'needs_review', 'confirmed', 'failed')),
  extraction_confidence numeric(3,2),
  image_hash text,
  is_duplicate_suspect boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Extraction logs
create table public.extraction_logs (
  id uuid primary key default gen_random_uuid(),
  receipt_id uuid not null references public.receipts(id) on delete cascade,
  raw_response jsonb,
  model_used text,
  tokens_used int,
  processing_time_ms int,
  error text,
  created_at timestamptz default now() not null
);

-- ============================================
-- Indexes
-- ============================================
create index idx_projects_user_id on public.projects(user_id);
create index idx_receipts_user_id on public.receipts(user_id);
create index idx_receipts_project_id on public.receipts(project_id);
create index idx_receipts_status on public.receipts(status);
create index idx_receipts_vendor_name on public.receipts(vendor_name);
create index idx_receipts_image_hash on public.receipts(image_hash);
create index idx_bot_connections_token on public.bot_connections(token);
create index idx_bot_connections_user_id on public.bot_connections(user_id);
create index idx_profiles_telegram_chat_id on public.profiles(telegram_chat_id);

-- ============================================
-- Foreign key: profiles.default_project_id -> projects
-- ============================================
alter table public.profiles
  add constraint fk_profiles_default_project
  foreign key (default_project_id) references public.projects(id) on delete set null;

-- ============================================
-- Auto-create profile on signup
-- ============================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- Auto-update updated_at
-- ============================================
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

create trigger update_projects_updated_at
  before update on public.projects
  for each row execute procedure public.update_updated_at();

create trigger update_receipts_updated_at
  before update on public.receipts
  for each row execute procedure public.update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_field_settings enable row level security;
alter table public.bot_connections enable row level security;
alter table public.receipts enable row level security;
alter table public.extraction_logs enable row level security;

-- Profiles
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Projects
create policy "Users can view own projects"
  on public.projects for select using (auth.uid() = user_id);
create policy "Users can create own projects"
  on public.projects for insert with check (auth.uid() = user_id);
create policy "Users can update own projects"
  on public.projects for update using (auth.uid() = user_id);
create policy "Users can delete own projects"
  on public.projects for delete using (auth.uid() = user_id);

-- Project field settings
create policy "Users can view own project fields"
  on public.project_field_settings for select
  using (exists (select 1 from public.projects where id = project_id and user_id = auth.uid()));
create policy "Users can manage own project fields"
  on public.project_field_settings for insert
  with check (exists (select 1 from public.projects where id = project_id and user_id = auth.uid()));
create policy "Users can update own project fields"
  on public.project_field_settings for update
  using (exists (select 1 from public.projects where id = project_id and user_id = auth.uid()));
create policy "Users can delete own project fields"
  on public.project_field_settings for delete
  using (exists (select 1 from public.projects where id = project_id and user_id = auth.uid()));

-- Bot connections
create policy "Users can view own bot connections"
  on public.bot_connections for select using (auth.uid() = user_id);
create policy "Users can create own bot connections"
  on public.bot_connections for insert with check (auth.uid() = user_id);
create policy "Users can update own bot connections"
  on public.bot_connections for update using (auth.uid() = user_id);

-- Receipts
create policy "Users can view own receipts"
  on public.receipts for select using (auth.uid() = user_id);
create policy "Users can create own receipts"
  on public.receipts for insert with check (auth.uid() = user_id);
create policy "Users can update own receipts"
  on public.receipts for update using (auth.uid() = user_id);
create policy "Users can delete own receipts"
  on public.receipts for delete using (auth.uid() = user_id);

-- Extraction logs
create policy "Users can view own extraction logs"
  on public.extraction_logs for select
  using (exists (select 1 from public.receipts where id = receipt_id and user_id = auth.uid()));
create policy "Users can create extraction logs"
  on public.extraction_logs for insert
  with check (exists (select 1 from public.receipts where id = receipt_id and user_id = auth.uid()));

-- ============================================
-- Storage bucket
-- ============================================
insert into storage.buckets (id, name, public)
  values ('receipts', 'receipts', true);

create policy "Users can upload own receipts"
  on storage.objects for insert
  with check (
    bucket_id = 'receipts'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can view own receipt images"
  on storage.objects for select
  using (
    bucket_id = 'receipts'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Public can view receipt images"
  on storage.objects for select
  using (bucket_id = 'receipts');

-- ============================================
-- Subscriptions (server-only, no user-facing RLS)
-- ============================================
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade unique,
  plan_id text not null default 'free',
  status text not null default 'active' check (status in ('active', 'cancelled', 'past_due')),
  current_period_start timestamptz default now(),
  current_period_end timestamptz,
  payment_provider text,
  payment_provider_sub_id text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.subscriptions enable row level security;
-- No RLS policies: only service_role key can access this table

create trigger update_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.update_updated_at();
