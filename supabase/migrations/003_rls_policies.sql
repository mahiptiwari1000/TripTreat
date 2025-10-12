-- Row Level Security (RLS) policies for Trip&Treat
-- This migration sets up security policies for all tables

-- Enable RLS on all tables
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."listings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."listing_images" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."bookings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."host_applications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."planned_tours" ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));
CREATE POLICY "Users can update their own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));
CREATE POLICY "Admins can view all profiles" ON "public"."profiles" FOR SELECT USING ("public"."is_admin"("auth"."uid"()));
CREATE POLICY "Admins can update all profiles" ON "public"."profiles" FOR UPDATE USING ("public"."is_admin"("auth"."uid"()));

-- Listings policies
CREATE POLICY "Anyone can view active listings" ON "public"."listings" FOR SELECT USING (("is_active" = true));
CREATE POLICY "Hosts can manage their own listings" ON "public"."listings" USING (("auth"."uid"() = "host_id"));
CREATE POLICY "Admins can manage all listings" ON "public"."listings" USING ("public"."is_admin"("auth"."uid"()));

-- Listing images policies
CREATE POLICY "Anyone can view listing images" ON "public"."listing_images" FOR SELECT USING (true);
CREATE POLICY "Hosts can manage their listing images" ON "public"."listing_images" USING ((EXISTS ( SELECT 1
   FROM "public"."listings"
  WHERE (("listings"."id" = "listing_images"."listing_id") AND ("listings"."host_id" = "auth"."uid"())))));
CREATE POLICY "Admins can manage all listing images" ON "public"."listing_images" USING ("public"."is_admin"("auth"."uid"()));

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON "public"."bookings" FOR SELECT USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can create their own bookings" ON "public"."bookings" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Hosts can view bookings for their listings" ON "public"."bookings" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."listings"
  WHERE (("listings"."id" = "bookings"."listing_id") AND ("listings"."host_id" = "auth"."uid"())))));
CREATE POLICY "Admins can manage all bookings" ON "public"."bookings" USING ("public"."is_admin"("auth"."uid"()));

-- Host applications policies
CREATE POLICY "Users can view their own host applications" ON "public"."host_applications" FOR SELECT USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can create their own host applications" ON "public"."host_applications" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Admins can view all host applications" ON "public"."host_applications" FOR SELECT USING ("public"."is_admin"("auth"."uid"()));
CREATE POLICY "Admins can update host applications" ON "public"."host_applications" FOR UPDATE USING ("public"."is_admin"("auth"."uid"()));

-- Planned tours policies
CREATE POLICY "Users can view their own planned tours" ON "public"."planned_tours" FOR SELECT USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can create their own planned tours" ON "public"."planned_tours" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can update their own planned tours" ON "public"."planned_tours" FOR UPDATE USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can delete their own planned tours" ON "public"."planned_tours" FOR DELETE USING (("auth"."uid"() = "user_id"));

-- Grant table permissions
GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."listings" TO "anon";
GRANT ALL ON TABLE "public"."listings" TO "authenticated";
GRANT ALL ON TABLE "public"."listings" TO "service_role";

GRANT ALL ON TABLE "public"."listing_images" TO "anon";
GRANT ALL ON TABLE "public"."listing_images" TO "authenticated";
GRANT ALL ON TABLE "public"."listing_images" TO "service_role";

GRANT ALL ON TABLE "public"."bookings" TO "anon";
GRANT ALL ON TABLE "public"."bookings" TO "authenticated";
GRANT ALL ON TABLE "public"."bookings" TO "service_role";

GRANT ALL ON TABLE "public"."host_applications" TO "anon";
GRANT ALL ON TABLE "public"."host_applications" TO "authenticated";
GRANT ALL ON TABLE "public"."host_applications" TO "service_role";

GRANT ALL ON TABLE "public"."planned_tours" TO "anon";
GRANT ALL ON TABLE "public"."planned_tours" TO "authenticated";
GRANT ALL ON TABLE "public"."planned_tours" TO "service_role";
