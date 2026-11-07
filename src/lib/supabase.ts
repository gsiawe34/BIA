import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing. UI will show empty states.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FlightStatus = 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'delayed' | 'cancelled';
export type FlightType = 'arrival' | 'departure';

export interface Flight {
  id: string;
  airline_name: string;
  airline_logo_url?: string;
  flight_number: string;
  origin_city: string;
  destination_city: string;
  scheduled_time: string;
  estimated_time?: string;
  actual_time?: string;
  status: FlightStatus;
  gate?: string;
  terminal: string;
  type: FlightType;
  created_at: string;
}

export interface Airline {
  id: string;
  name: string;
  logo_url: string;
  code: string;
  description?: string;
  website_url?: string;
  contact_info?: string;
}

export interface Booking {
  id: string;
  service_type: 'lounge' | 'parking';
  user_name: string;
  user_email: string;
  user_phone: string;
  booking_date: string;
  booking_time: string;
  guest_count?: number;
  vehicle_reg?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_price: number;
  payment_status: 'unpaid' | 'paid';
  created_at: string;
}
