-- Run this once in the Supabase SQL editor for the project whose URL/anon
-- key go into NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
-- (see .env.local.example). Until this exists, the PQR form at /pqr falls
-- back to a WhatsApp message instead of failing.

create table if not exists public.pqr_solicitudes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tipo text not null check (tipo in ('Petición', 'Queja', 'Reclamo', 'Sugerencia')),
  nombre text not null,
  documento text not null,
  email text not null,
  telefono text not null,
  guia text,
  mensaje text not null
);

alter table public.pqr_solicitudes enable row level security;

-- Anyone (anon key) can submit a PQR, but only authenticated staff can read
-- them back — adjust the read policy once Natalia's team has Supabase
-- logins, or swap it for a service-role dashboard query instead.
create policy "Anyone can submit a PQR"
  on public.pqr_solicitudes for insert
  to anon
  with check (true);
