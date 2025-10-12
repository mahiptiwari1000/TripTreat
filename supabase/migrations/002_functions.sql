-- Helper functions for Trip&Treat
-- This migration creates utility functions for user management and permissions

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION "public"."is_admin"("user_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
  SELECT role = 'admin' FROM public.profiles WHERE id = user_id;
$$;

-- Function to check if user is host
CREATE OR REPLACE FUNCTION "public"."is_host"("user_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
  SELECT role = 'host' FROM public.profiles WHERE id = user_id;
$$;

-- Grant permissions on functions
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."is_host"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_host"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_host"("user_id" "uuid") TO "service_role";
