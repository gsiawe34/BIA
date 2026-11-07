-- 
-- BAYELSA INTERNATIONAL AIRPORT (BIA) DATABASE SCHEMA
--

-- Enable Row Level Security
-- 1. FLIGHTS TABLE
CREATE TABLE IF NOT EXISTS flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airline_name TEXT NOT NULL,
  airline_logo_url TEXT,
  flight_number TEXT NOT NULL,
  origin_city TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL,
  estimated_time TIMESTAMPTZ,
  actual_time TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'boarding', 'departed', 'arrived', 'delayed', 'cancelled')),
  gate TEXT,
  terminal TEXT NOT NULL DEFAULT 'T1',
  type TEXT NOT NULL CHECK (type IN ('arrival', 'departure')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. AIRLINES TABLE
CREATE TABLE IF NOT EXISTS airlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  website_url TEXT,
  contact_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL CHECK (service_type IN ('lounge', 'parking')),
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  guest_count INTEGER,
  vehicle_reg TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  total_price DECIMAL(10, 2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BUSINESSES TABLE (Shopping & Dining)
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('restaurant', 'cafe', 'retail', 'convenience', 'other')),
  logo_url TEXT,
  image_url TEXT,
  description TEXT,
  location TEXT NOT NULL,
  opening_hours TEXT,
  contact_details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. NEWS TABLE
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  image_url TEXT,
  author_name TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE airlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES (Read Only)
CREATE POLICY "Public can view flights" ON flights FOR SELECT USING (true);
CREATE POLICY "Public can view airlines" ON airlines FOR SELECT USING (true);
CREATE POLICY "Public can view businesses" ON businesses FOR SELECT USING (true);
CREATE POLICY "Public can view news" ON news FOR SELECT USING (true);

-- BOOKING POLICIES (Insert only for public)
CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.jwt() ->> 'email' = user_email);

-- SEED DATA
INSERT INTO airlines (name, logo_url, code, description) VALUES
('Air Peace', 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Air_Peace_Logo.png', 'APK', 'Nigeria''s leading airline'),
('United Nigeria', 'https://unitednigeriaairline.com/wp-content/uploads/2021/02/cropped-Logo-1.png', 'UNA', 'Connecting Nigeria with ease'),
('Ibom Air', 'https://www.ibomair.com/wp-content/uploads/2019/04/Logo-Ibom-Air-New.png', 'IBN', 'The pride of Akwa Ibom');

INSERT INTO flights (airline_name, flight_number, origin_city, destination_city, scheduled_time, status, type) VALUES
('Air Peace', 'P47120', 'Lagos', 'Bayelsa', NOW() + INTERVAL '2 hours', 'scheduled', 'arrival'),
('United Nigeria', 'UN234', 'Abuja', 'Bayelsa', NOW() + INTERVAL '1 hour', 'boarding', 'arrival'),
('Ibom Air', 'IB99', 'Bayelsa', 'Enugu', NOW() + INTERVAL '30 minutes', 'scheduled', 'departure');
