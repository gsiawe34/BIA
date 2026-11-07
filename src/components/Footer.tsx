import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Plane className="text-brand-navy w-6 h-6 transform -rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight font-display leading-tight">
                  BAYELSA
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/60">
                  International Airport
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Bayelsa International Airport is the premier gateway to the Niger Delta, connecting the Glory of All Lands to the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/flights" className="hover:text-brand-gold transition-colors">Flight Status</Link></li>
              <li><Link to="/lounge" className="hover:text-brand-gold transition-colors">VIP Lounge</Link></li>
              <li><Link to="/parking" className="hover:text-brand-gold transition-colors">Airport Parking</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">Passenger Services</Link></li>
              <li><Link to="/corporate" className="hover:text-brand-gold transition-colors">Corporate Info</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/faq" className="hover:text-brand-gold transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/security" className="hover:text-brand-gold transition-colors">Security & Guidelines</Link></li>
              <li><Link to="/lost-found" className="hover:text-brand-gold transition-colors">Lost & Found</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <span>BIA Road, Wilberforce Island, Bayelsa State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>+234 (0) 800 BAYELSA</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span>info@bayelsaairport.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Bayelsa International Airport Company Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <span>The Glory of All Lands</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span>Airport Code: BIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
