-- Initial database schema for Trip&Treat
-- This migration creates all the core tables and constraints

-- Create profiles table
CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "phone" "text",
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "role" "text" DEFAULT 'user'::"text" NOT NULL,
    CONSTRAINT "profiles_role_check" CHECK (("role" = ANY (ARRAY['user'::"text", 'host'::"text", 'admin'::"text"])))
);

-- Create listings table
CREATE TABLE IF NOT EXISTS "public"."listings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "host_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "location" "text" NOT NULL,
    "price_per_night" integer NOT NULL,
    "max_guests" integer NOT NULL,
    "amenities" "text"[],
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

-- Create listing_images table
CREATE TABLE IF NOT EXISTS "public"."listing_images" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "listing_id" "uuid" NOT NULL,
    "image_url" "text" NOT NULL,
    "is_primary" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS "public"."bookings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "listing_id" "uuid" NOT NULL,
    "check_in_date" "date" NOT NULL,
    "check_out_date" "date" NOT NULL,
    "guests" integer NOT NULL,
    "price_total" integer NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "bookings_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'confirmed'::"text", 'completed'::"text", 'cancelled'::"text"]))),
    CONSTRAINT "check_in_before_check_out" CHECK (("check_in_date" < "check_out_date"))
);

-- Create host_applications table
CREATE TABLE IF NOT EXISTS "public"."host_applications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "host_type" "text" NOT NULL,
    "property_address" "text" NOT NULL,
    "description" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "admin_notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "host_applications_host_type_check" CHECK (("host_type" = ANY (ARRAY['homestay'::"text", 'eatery'::"text", 'guide'::"text", 'experience'::"text"]))),
    CONSTRAINT "host_applications_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'approved'::"text", 'rejected'::"text"])))
);

-- Create planned_tours table
CREATE TABLE IF NOT EXISTS "public"."planned_tours" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "itinerary" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);

-- Add primary keys
ALTER TABLE ONLY "public"."profiles" ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."listings" ADD CONSTRAINT "listings_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."listing_images" ADD CONSTRAINT "listing_images_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."bookings" ADD CONSTRAINT "bookings_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."host_applications" ADD CONSTRAINT "host_applications_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."planned_tours" ADD CONSTRAINT "planned_tours_pkey" PRIMARY KEY ("id");

-- Add unique constraints
ALTER TABLE ONLY "public"."bookings" ADD CONSTRAINT "no_overlapping_bookings" UNIQUE ("listing_id", "check_in_date", "check_out_date");

-- Add foreign key constraints
ALTER TABLE ONLY "public"."profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."listings" ADD CONSTRAINT "listings_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."listing_images" ADD CONSTRAINT "listing_images_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."bookings" ADD CONSTRAINT "bookings_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."host_applications" ADD CONSTRAINT "host_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."planned_tours" ADD CONSTRAINT "planned_tours_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

-- Create indexes
CREATE INDEX "planned_tours_user_id_idx" ON "public"."planned_tours" USING "btree" ("user_id");
