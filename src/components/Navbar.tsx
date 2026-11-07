import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Flights', href: '/flights' },
    { name: 'Services', href: '/services' },
    { name: 'Lounge', href: '/lounge' },
    { name: 'Parking', href: '/parking' },
    { name: 'News', href: '/news' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <Plane className="text-brand-gold w-6 h-6 transform -rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-bold tracking-tight font-display leading-tight transition-colors",
              isScrolled ? "text-brand-navy" : "text-white"
            )}>
              BAYELSA
            </span>
            <span className={cn(
              "text-[10px] font-medium tracking-[0.2em] uppercase transition-colors",
              isScrolled ? "text-slate-500" : "text-white/80"
            )}>
              International Airport
            </span>
          </div>
        </Link>

        {/* Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "whitespace-nowrap shrink-0 transition-all hover:text-brand-gold relative py-1",
                location.pathname === link.href 
                  ? "text-brand-gold" 
                  : isScrolled ? "text-slate-600" : "text-white/90"
              )}
            >
              {link.name}
              {location.pathname === link.href && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-4 shrink-0">
          <button className={cn(
            "p-2 rounded-full transition-colors hidden sm:flex",
            isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}>
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/lounge">
            <button className={cn(
              "btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-widest transition-all",
              !isScrolled && "bg-white text-brand-navy hover:bg-slate-100 shadow-xl shadow-black/10"
            )}>
              Book a Service
            </button>
          </Link>
          
          <button 
            className="lg:hidden p-2 ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-brand-navy" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-brand-navy" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-[60] bg-white h-screen overflow-y-auto"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center">
                  <Plane className="text-brand-gold w-5 h-5 transform -rotate-12" />
                </div>
                <span className="text-lg font-bold font-display text-brand-navy">BIA PORTAL</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-brand-navy"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col p-10 gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "text-3xl font-display font-bold border-b border-slate-50 pb-4 block",
                      location.pathname === link.href ? "text-brand-gold" : "text-brand-navy"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link to="/lounge" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="btn-gold w-full py-4 text-sm font-bold uppercase tracking-widest mt-4">
                    Book a Service
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
