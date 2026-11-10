REVOKE ALL ON public.partner_vehicle_submissions FROM anon, authenticated;
DROP POLICY "Visitors may submit partner vehicle details" ON public.partner_vehicle_submissions;