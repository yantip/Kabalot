-- ============================================
-- Star Payments tracking
-- ============================================

create table public.star_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  telegram_payment_charge_id text unique not null,
  telegram_user_id bigint not null,
  amount_stars int not null,
  payload jsonb default '{}',
  refunded boolean default false,
  created_at timestamptz default now() not null
);

create index idx_star_payments_user_id on public.star_payments(user_id);

alter table public.star_payments enable row level security;
-- No user-facing RLS policies; only service_role can access

-- Add payment_provider column to subscriptions if not present
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
    and table_name = 'subscriptions'
    and column_name = 'payment_provider'
  ) then
    alter table public.subscriptions add column payment_provider text;
  end if;
end $$;
