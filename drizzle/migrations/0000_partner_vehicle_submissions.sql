CREATE TABLE public.partner_vehicle_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  vehicle_make text NOT NULL,
  vehicle_model text NOT NULL,
  vehicle_year integer,
  notes text,
  photo_storage_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT partner_vehicle_submissions_name_length CHECK (char_length(btrim(full_name)) BETWEEN 2 AND 120),
  CONSTRAINT partner_vehicle_submissions_email_length CHECK (char_length(btrim(email)) BETWEEN 3 AND 255),
  CONSTRAINT partner_vehicle_submissions_email_format CHECK (btrim(email) ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  CONSTRAINT partner_vehicle_submissions_phone_format CHECK (btrim(phone) ~ '^[+0-9() -]{7,25}$'),
  CONSTRAINT partner_vehicle_submissions_make_length CHECK (char_length(btrim(vehicle_make)) BETWEEN 1 AND 80),
  CONSTRAINT partner_vehicle_submissions_model_length CHECK (char_length(btrim(vehicle_model)) BETWEEN 1 AND 100),
  CONSTRAINT partner_vehicle_submissions_year_range CHECK (vehicle_year IS NULL OR vehicle_year BETWEEN 1950 AND 2100),
  CONSTRAINT partner_vehicle_submissions_notes_length CHECK (notes IS NULL OR char_length(notes) <= 1200),
  CONSTRAINT partner_vehicle_submissions_photo_path_format CHECK (photo_storage_path ~ '^[0-9a-f-]+\.(jpg|png|webp)$')
);
GRANT INSERT ON public.partner_vehicle_submissions TO anon, authenticated;
GRANT ALL ON public.partner_vehicle_submissions TO service_role;
ALTER TABLE public.partner_vehicle_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit partner vehicle details" ON public.partner_vehicle_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Only visitors may upload partner vehicle photos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'partner-vehicle-photos' AND name ~ '^[0-9a-f-]+\.(jpg|png|webp)$' AND metadata->>'mimetype' IN ('image/jpeg', 'image/png', 'image/webp'));