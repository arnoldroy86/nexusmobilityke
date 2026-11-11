GRANT INSERT ON public.partner_vehicle_submissions TO anon, authenticated;
GRANT ALL ON public.partner_vehicle_submissions TO service_role;
CREATE POLICY "Public can submit NEXUS partner vehicle details"
ON public.partner_vehicle_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
CREATE POLICY "Public can upload NEXUS partner vehicle photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'nexus-partner-vehicles');