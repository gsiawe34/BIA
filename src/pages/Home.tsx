import Hero from '@/components/Hero';
import { Plane, Star, Clock, Shield, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

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

export default function Home() {
  const services = [
    { name: 'VIP Lounge', icon: Coffee, desc: 'Exclusive comfort and hospitality.', link: '/lounge', color: 'bg-amber-50 text-amber-600' },
    { name: 'Terminal Parking', icon: Car, desc: 'Secure multi-storey parking facilities.', link: '/parking', color: 'bg-blue-50 text-blue-600' },
    { name: 'Fast Track', icon: Clock, desc: 'Expedited security and check-in.', link: '/services', color: 'bg-purple-50 text-purple-600' },
    { name: 'Safe Travels', icon: Shield, desc: 'Enhanced security and medical care.', link: '/services', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <main>
      <Hero />
      
      {/* Quick Services */}
      <section className="py-24 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-4xl font-display font-bold text-brand-navy uppercase tracking-tight">World Class Passenger Services</h2>
          <p className="text-slate-500 text-lg">Designed for comfort, security, and efficiency. Explore our range of premium airport services.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={service.link}
                className="group block h-full glass-card p-8 rounded-2xl hover:border-brand-gold/30 hover:translate-y-[-4px] transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-navy mb-3">{service.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div className="flex items-center text-brand-gold text-xs font-bold uppercase tracking-widest gap-2">
                  Learn More
                  <div className="w-6 h-[1px] bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Experience */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
           <Plane className="w-full h-full text-white transform -rotate-12 translate-x-1/4" />
        </div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-brand-gold/10 rounded-lg text-brand-gold font-bold text-xs tracking-widest uppercase">
              The BIA Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight uppercase">
              Elegance in Every <br /> Departure & Arrival
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              From our luxurious VIP lounges to our state-of-the-art multi-storey parking, every detail at Bayelsa International Airport is crafted to ensure your journey is as smooth as your destination.
            </p>
            <div className="grid grid-cols-2 gap-8 py-4">
              <div className="space-y-2 text-balance">
                <div className="text-3xl font-display font-bold text-brand-gold">100%</div>
                <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Safety Record</div>
              </div>
              <div className="space-y-2 text-balance">
                <div className="text-3xl font-display font-bold text-brand-gold">24/7</div>
                <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Passenger Support</div>
              </div>
            </div>
            <Link to="/lounge" className="inline-block">
              <button className="btn-gold">Book a VIP Lounge</button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/src/assets/images/vip_lounge_interior_1794017427969.jpg" 
                alt="VIP Lounge" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
