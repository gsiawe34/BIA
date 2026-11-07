import { Search, PlaneTakeoff, PlaneLanding, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/hero_airport_terminal_1794017427157.jpg" 
          alt="Bayelsa International Airport Terminal" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
            Now Connecting Bayelsa to the World
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] text-wrap-balance">
            Gateway to the <br />
            <span className="text-brand-gold">Glory of All Lands</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-xl leading-relaxed">
            Experience seamless travel, premium hospitality, and world-class facilities at Bayelsa State's premier international aviation hub.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/flights" className="btn-gold flex items-center gap-2 group">
              View Flight Schedule
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/services" className="btn-primary bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Track Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="container mx-auto px-6 pb-12">
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Arrivals Tab */}
            <button className="flex-1 p-6 flex items-center gap-4 hover:bg-slate-50/50 transition-colors group text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <PlaneLanding className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Track</p>
                <h4 className="font-display font-bold text-lg text-brand-navy">Arrivals</h4>
              </div>
              <ChevronRight className="ml-auto w-5 h-5 text-slate-300" />
            </button>

            {/* Departures Tab */}
            <button className="flex-1 p-6 flex items-center gap-4 hover:bg-slate-50/50 transition-colors group text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <PlaneTakeoff className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Track</p>
                <h4 className="font-display font-bold text-lg text-brand-navy">Departures</h4>
              </div>
              <ChevronRight className="ml-auto w-5 h-5 text-slate-300" />
            </button>

            {/* Search Tab */}
            <div className="flex-[1.5] p-6 flex items-center gap-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Enter flight number, city, or airline..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all border-transparent focus:border-brand-gold/30"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
