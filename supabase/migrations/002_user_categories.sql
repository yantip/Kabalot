-- User-managed categories
create table public.user_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  display_order int default 0,
  created_at timestamptz default now() not null,
  unique(user_id, name)
);

create index idx_user_categories_user_id on public.user_categories(user_id);

alter table public.user_categories enable row level security;

create policy "Users can view own categories"
  on public.user_categories for select using (auth.uid() = user_id);
create policy "Users can create own categories"
  on public.user_categories for insert with check (auth.uid() = user_id);
create policy "Users can update own categories"
  on public.user_categories for update using (auth.uid() = user_id);
create policy "Users can delete own categories"
  on public.user_categories for delete using (auth.uid() = user_id);
