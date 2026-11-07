import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Car, Clock, Shield, MapPin, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Parking() {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const categories = [
    { id: 'standard', name: 'Standard Parking', price: '₦1,000 / hour', icon: Car, features: ['Short-term parking', 'Close to terminal', '24/7 Security'] },
    { id: 'premium', name: 'Premium Multi-Storey', price: '₦2,500 / hour', icon: Shield, features: ['Covered parking', 'Direct terminal link', 'Bay monitoring'] },
    { id: 'valet', name: 'Valet Service', price: '₦5,000 / service', icon: Clock, features: ['Curbside drop-off', 'Assisted parking', 'Priority pickup'] },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      service_type: 'parking',
      user_name: formData.get('user_name') as string,
      user_email: formData.get('user_email') as string,
      user_phone: formData.get('user_phone') as string,
      booking_date: formData.get('entry_date') as string,
      booking_time: formData.get('entry_time') as string,
      vehicle_reg: formData.get('vehicle_reg') as string,
      status: 'pending',
      total_price: 5000, // Dummy fixed price for valet/initial stay
      payment_status: 'unpaid'
    };

    const { error } = await supabase.from('bookings').insert(data);

    if (error) {
      console.error(error);
      setBookingStatus('idle');
      alert('Error submitting reservation. Please try again.');
    } else {
      setBookingStatus('success');
      setTimeout(() => {
        setIsBooking(false);
        setBookingStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center bg-brand-navy">
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <img 
            src="/src/assets/images/airport_parking_modern_1794017430010.jpg" 
            alt="Airport Parking" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold">Secure Parking</h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
              From quick drop-offs to long-term stays, our secure multi-storey facilities provide the perfect spot for your vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="glass-card p-8 rounded-3xl flex flex-col border-t-8 border-brand-gold">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-navy mb-6">
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-navy mb-2">{cat.name}</h3>
              <p className="text-brand-gold font-bold mb-6">{cat.price}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {cat.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setIsBooking(true)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Reserve Space
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="pb-24 container mx-auto px-6">
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-brand-navy">Terminal Accessibility</h2>
            <p className="text-slate-500 leading-relaxed">
              Our multi-storey car park is directly connected to the main terminal building via covered walkways, ensuring you stay dry and comfortable regardless of the weather.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-gold w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-navy">Convenient Locations</h4>
                  <p className="text-sm text-slate-500">Bay A & Bay B are located within 2 minutes of the departure hall.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="text-brand-gold w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-navy">Maximum Security</h4>
                  <p className="text-sm text-slate-500">24/7 CCTV surveillance and regular foot patrols ensure your vehicle is safe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="/src/assets/images/airport_parking_modern_1794017430010.jpg" 
                alt="Parking Bay" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-navy text-white p-6 rounded-2xl shadow-xl max-w-xs space-y-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Pro Tip</span>
              </div>
              <p className="text-sm font-medium">Use our Valet service during peak hours to save time on parking.</p>
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
                <h3 className="text-3xl font-display font-bold text-brand-navy">Reservation Confirmed!</h3>
                <p className="text-slate-500">Your parking space has been secured. Please show your confirmation code at the entry gate.</p>
                <div className="pt-4">
                  <button className="btn-primary w-full" onClick={() => setIsBooking(false)}>Done</button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-brand-navy p-8 text-white">
                  <h3 className="text-2xl font-display font-bold">Parking Reservation</h3>
                  <p className="text-white/60 text-sm">Secure your spot before you arrive.</p>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                      <input name="user_name" required type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Vehicle Reg No.</label>
                      <input name="vehicle_reg" required type="text" placeholder="ABC-123-XY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input name="user_email" required type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                      <input name="user_phone" required type="tel" placeholder="+234..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Entry Date</label>
                      <input name="entry_date" required type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Est. Entry Time</label>
                      <input name="entry_time" required type="time" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/30" />
                    </div>
                  </div>
                  
                  <button 
                    disabled={bookingStatus === 'submitting'}
                    type="submit" 
                    className="btn-gold w-full flex items-center justify-center gap-2"
                  >
                    {bookingStatus === 'submitting' ? 'Processing...' : 'Reserve Space'}
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
