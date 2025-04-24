-- Create the planned_tours table
 CREATE TABLE IF NOT EXISTS public.planned_tours (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
   itinerary TEXT NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 );
 
 -- Create index on user_id for faster querying
 CREATE INDEX IF NOT EXISTS planned_tours_user_id_idx ON public.planned_tours(user_id);
 
 -- Set up RLS policies
 ALTER TABLE public.planned_tours ENABLE ROW LEVEL SECURITY;
 
 -- Users can view only their own planned tours
 CREATE POLICY "Users can view their own planned tours" 
   ON public.planned_tours 
   FOR SELECT 
   USING (auth.uid() = user_id);
 
 -- Users can insert their own planned tours
 CREATE POLICY "Users can create their own planned tours" 
   ON public.planned_tours 
   FOR INSERT 
   WITH CHECK (auth.uid() = user_id);
 
 -- Users can update their own planned tours
 CREATE POLICY "Users can update their own planned tours" 
   ON public.planned_tours 
   FOR UPDATE 
   USING (auth.uid() = user_id);
 
 -- Users can delete their own planned tours
 CREATE POLICY "Users can delete their own planned tours" 
   ON public.planned_tours 
   FOR DELETE 
   USING (auth.uid() = user_id);
 
 -- Administrators can access all planned tours
 CREATE POLICY "Administrators can access all planned tours" 
   ON public.planned_tours 
   FOR ALL 
   USING (auth.uid() IN (
     SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
   ));