-- Create storage bucket for host images if not exists
do $$
begin
  if not exists (
    select 1 from storage.buckets where id = 'host_images'
  ) then
    insert into storage.buckets (id, name, public)
    values ('host_images', 'host_images', true);
  end if;
end $$;

-- Add image_urls column to host_applications to store array of image URLs
alter table if exists public.host_applications
  add column if not exists image_urls text[] default '{}'::text[];

-- Public read access to host_images (optional: keep public to render in app)
-- Adjust policies as needed for your environment
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read access to host_images'
  ) then
    create policy "Public read access to host_images"
      on storage.objects for select
      using (bucket_id = 'host_images');
  end if;
end $$;

-- Allow authenticated users to insert into host_images
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can upload to host_images'
  ) then
    create policy "Authenticated users can upload to host_images"
      on storage.objects for insert to authenticated
      with check (bucket_id = 'host_images');
  end if;
end $$;


