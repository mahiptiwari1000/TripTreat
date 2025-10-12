-- Seed data for Trip&Treat development
-- This migration populates the database with sample data for development and testing

-- Insert sample profiles (users)
-- Note: These will be created when users sign up, but we can create some for testing
INSERT INTO "public"."profiles" ("id", "email", "first_name", "last_name", "phone", "role", "created_at", "updated_at") VALUES
-- Admin user (you'll need to replace this UUID with a real one from auth.users)
('00000000-0000-0000-0000-000000000001', 'admin@tripntreat.com', 'Admin', 'User', '+91 9876543210', 'admin', NOW(), NOW()),
-- Host user
('00000000-0000-0000-0000-000000000002', 'host@tripntreat.com', 'John', 'Host', '+91 9876543211', 'host', NOW(), NOW()),
-- Regular user
('00000000-0000-0000-0000-000000000003', 'user@tripntreat.com', 'Jane', 'Traveler', '+91 9876543212', 'user', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample listings (homestays)
INSERT INTO "public"."listings" ("id", "host_id", "title", "description", "location", "price_per_night", "max_guests", "amenities", "is_active", "created_at", "updated_at") VALUES
-- Homestay 1
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', 'Traditional Manipuri Homestay', 'Experience authentic Manipuri culture in this beautiful traditional home. Located in the heart of Imphal, this homestay offers comfortable accommodation with modern amenities while maintaining the traditional charm.', 'Imphal, Manipur', 2500, 4, ARRAY['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Garden'], true, NOW(), NOW()),

-- Homestay 2
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000002', 'Loktak Lake View Homestay', 'Wake up to stunning views of Loktak Lake from your room. This peaceful homestay offers a perfect escape from city life with comfortable rooms and delicious local cuisine.', 'Loktak Lake, Manipur', 3000, 6, ARRAY['WiFi', 'Lake View', 'Traditional Meals', 'Boat Rides', 'Parking'], true, NOW(), NOW()),

-- Homestay 3
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000002', 'Hillside Retreat', 'Nestled in the hills of Manipur, this homestay offers breathtaking mountain views and a peaceful environment. Perfect for nature lovers and those seeking tranquility.', 'Ukhrul, Manipur', 2000, 3, ARRAY['Mountain View', 'Garden', 'Traditional Meals', 'Hiking Trails'], true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample listing images
INSERT INTO "public"."listing_images" ("id", "listing_id", "image_url", "is_primary", "created_at") VALUES
-- Images for Homestay 1
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', '/file-uploads/h1.jpg', true, NOW()),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', '/file-uploads/h111.avif', false, NOW()),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', '/file-uploads/h112.avif', false, NOW()),

-- Images for Homestay 2
('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', '/file-uploads/h2.jpg', true, NOW()),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', '/file-uploads/loktakView.webp', false, NOW()),

-- Images for Homestay 3
('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', '/file-uploads/Hills.jpg', true, NOW()),
('gggggggg-gggg-gggg-gggg-gggggggggggg', '33333333-3333-3333-3333-333333333333', '/file-uploads/h211.avif', false, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample bookings
INSERT INTO "public"."bookings" ("id", "user_id", "listing_id", "check_in_date", "check_out_date", "guests", "price_total", "status", "created_at", "updated_at") VALUES
-- Booking 1
('aaaaaaaa-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', '2024-02-15', '2024-02-18', 2, 7500, 'confirmed', NOW(), NOW()),

-- Booking 2
('bbbbbbbb-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', '2024-03-01', '2024-03-05', 4, 12000, 'pending', NOW(), NOW()),

-- Booking 3
('cccccccc-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', '2024-01-20', '2024-01-22', 2, 4000, 'completed', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample host applications
INSERT INTO "public"."host_applications" ("id", "user_id", "host_type", "property_address", "description", "status", "admin_notes", "created_at", "updated_at") VALUES
-- Application 1
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000003', 'homestay', '123 Main Street, Imphal, Manipur', 'I have a beautiful traditional house with 3 bedrooms that I would like to list as a homestay. The property has a garden and is located in a quiet neighborhood.', 'pending', NULL, NOW(), NOW()),

-- Application 2
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000003', 'eatery', '456 Food Street, Imphal, Manipur', 'I run a small family restaurant serving authentic Manipuri cuisine. I would like to list it on the platform to attract more customers.', 'approved', 'Great location and good reviews from locals', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample planned tours
INSERT INTO "public"."planned_tours" ("id", "user_id", "itinerary", "created_at", "updated_at") VALUES
-- Tour 1
('aaaaaaaa-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000003', 'Day 1: Arrive in Imphal, visit Kangla Fort and Ima Keithel market. Day 2: Explore Loktak Lake and Keibul Lamjao National Park. Day 3: Visit Ukhrul hills and return to Imphal.', NOW(), NOW()),

-- Tour 2
('bbbbbbbb-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000003', 'Day 1: Arrive in Imphal, check into homestay. Day 2: Visit Manipur State Museum and Shree Govindajee Temple. Day 3: Explore local markets and try traditional cuisine. Day 4: Departure.', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
