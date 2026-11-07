import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Star, Clock, Users, Wifi, Tv, Wine, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Coffee = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);

export default function Lounge() {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const amenities = [
    { name: 'High-speed Wi-Fi', icon: Wifi },
    { name: 'Gourmet Buffet', icon: Coffee },
    { name: 'Premium Beverages', icon: Wine },
    { name: 'Shower Facilities', icon: ShieldCheck },
    { name: 'Flight Monitors', icon: Tv },
    { name: 'Quiet Zones', icon: Users },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      service_type: 'lounge',
      user_name: formData.get('user_name') as string,
      user_email: formData.get('user_email') as string,
      user_phone: formData.get('user_phone') as string,
      booking_date: formData.get('booking_date') as string,
      booking_time: formData.get('booking_time') as string,
      guest_count: parseInt(formData.get('guest_count') as string),
      status: 'pending',
      total_price: 15000 * parseInt(formData.get('guest_count') as string), // Dummy price: 15k per guest
      payment_status: 'unpaid'
    };

    const { error } = await supabase.from('bookings').insert(data);

    if (error) {
      console.error(error);
      setBookingStatus('idle');
      alert('Error submitting booking. Please try again.');
    } else {
      setBookingStatus('success');
      setTimeout(() => {
        setIsBooking(false);
        setBookingStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/images/vip_lounge_interior_1794017427969.jpg" 
            alt="VIP Lounge" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-brand-gold">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="ml-2 text-xs font-bold uppercase tracking-widest">Premium Membership Lounge</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold">Your Oasis Above <br /> the Clouds</h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              Escape the terminal hustle. Experience tranquility, premium dining, and world-class hospitality at the BIA VIP Lounge.
            </p>
            <button 
              onClick={() => setIsBooking(true)}
              className="btn-gold px-10 py-4 text-lg mt-4"
            >
              Book Your Access
            </button>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-display font-bold text-brand-navy">Exquisite Comfort</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Our lounge is designed to provide the ultimate pre-flight experience. Whether you need to catch up on work or relax before a long journey, we have everything you need.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {amenities.map((item) => (
                <div key={item.name} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-brand-navy group-hover:bg-brand-gold group-hover:text-white transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700">{item.name}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Clock className="text-brand-gold w-6 h-6" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operating Hours</p>
                  <p className="font-display font-bold text-brand-navy">24 Hours / 7 Days</p>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-slate-200"></div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Starting From</p>
                <p className="font-display font-bold text-brand-gold text-xl">₦15,000</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img src="/src/assets/images/duty_free_shopping_1794017428604.jpg" alt="Dining" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square rounded-2xl bg-brand-navy p-8 flex flex-col justify-end text-white">
                <Users className="w-8 h-8 text-brand-gold mb-4" />
                <h4 className="font-display font-bold text-lg">Group Bookings</h4>
                <p className="text-xs text-white/50 mt-1">Special rates for corporate teams</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl bg-brand-gold p-8 flex flex-col justify-end text-brand-navy">
                <Star className="w-8 h-8 mb-4" />
                <h4 className="font-display font-bold text-lg">VIP Treatment</h4>
                <p className="text-xs text-brand-navy/50 mt-1">Dedicated concierge service</p>
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img src="/src/assets/images/vip_lounge_interior_1794017427969.jpg" alt="Lounge" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-navy/40 backdrop-blur-sm" onClick={() => setIsBooking(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {bookingStatus === 'success' ? (
              <div className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-navy">Booking Successful!</h3>
                <p className="text-slate-500">Your VIP access has been reserved. A confirmation email has been sent to your inbox.</p>
                <div className="pt-4">
                  <button className="btn-primary w-full" onClick={() => setIsBooking(false)}>Done</button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-brand-navy p-8 text-white">
                  <h3 className="text-2xl font-display font-bold">Lounge Reservation</h3>
                  <p className="text-white/60 text-sm">Fill in your details to secure your access.</p>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input name="user_name" required type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input name="user_email" required type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                      <input name="user_phone" required type="tel" placeholder="+234..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Travel Date</label>
                      <input name="booking_date" required type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Est. Arrival Time</label>
                      <input name="booking_time" required type="time" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Number of Guests</label>
                    <select name="guest_count" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 outline-none">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4+ Guests</option>
                    </select>
                  </div>
                  
                  <button 
                    disabled={bookingStatus === 'submitting'}
                    type="submit" 
                    className="btn-gold w-full flex items-center justify-center gap-2"
                  >
                    {bookingStatus === 'submitting' ? 'Processing...' : 'Reserve Access'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
