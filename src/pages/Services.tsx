import { useState } from 'react';
import { supabase, Booking } from '@/lib/supabase';
import { ShoppingBag, Utensils, Search, MapPin, ExternalLink, Clock, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'restaurant' | 'retail'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['businesses', activeCategory],
    queryFn: async () => {
      let query = supabase.from('businesses').select('*');
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const filteredBusinesses = businesses?.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Shopping & Dining</h1>
            <p className="text-white/70 text-lg">Discover premium retail and exquisite dining options at BIA.</p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="glass-card rounded-2xl p-4 flex flex-col lg:flex-row items-center gap-6">
          <div className="flex p-1 bg-slate-100 rounded-xl w-full lg:w-auto">
            <button 
              onClick={() => setActiveCategory('all')}
              className={cn(
                "flex-1 lg:flex-none px-8 py-3 rounded-lg text-sm font-bold transition-all",
                activeCategory === 'all' ? "bg-white text-brand-navy shadow-sm" : "text-slate-500 hover:text-brand-navy"
              )}
            >
              All Listings
            </button>
            <button 
              onClick={() => setActiveCategory('restaurant')}
              className={cn(
                "flex-1 lg:flex-none px-8 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                activeCategory === 'restaurant' ? "bg-white text-brand-navy shadow-sm" : "text-slate-500 hover:text-brand-navy"
              )}
            >
              <Utensils className="w-4 h-4" />
              Dining
            </button>
            <button 
              onClick={() => setActiveCategory('retail')}
              className={cn(
                "flex-1 lg:flex-none px-8 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                activeCategory === 'retail' ? "bg-white text-brand-navy shadow-sm" : "text-slate-500 hover:text-brand-navy"
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              Retail
            </button>
          </div>

          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by shop name, category or location..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
             Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl h-80 animate-pulse bg-slate-100"></div>
            ))
          ) : filteredBusinesses?.length === 0 ? (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-display font-bold text-brand-navy">No results found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            filteredBusinesses?.map((biz) => (
              <div key={biz.id} className="group glass-card rounded-3xl overflow-hidden flex flex-col hover:border-brand-gold/30 hover:translate-y-[-4px] transition-all">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={biz.image_url || "/src/assets/images/duty_free_shopping_1794017428604.jpg"} 
                    alt={biz.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-navy">
                    {biz.category}
                  </div>
                </div>
                
                <div className="p-8 flex-grow space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-brand-navy">{biz.name}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{biz.description}</p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      {biz.location}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      {biz.opening_hours || 'Open 24 Hours'}
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <button className="w-full btn-primary bg-slate-50 text-brand-navy border border-slate-200 hover:bg-slate-100 flex items-center justify-center gap-2">
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Promo */}
      <section className="container mx-auto px-6 pb-24">
        <div className="bg-brand-gold rounded-[2rem] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 flex items-center justify-center">
            <ShoppingBag className="w-64 h-64 -rotate-12" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-4xl font-display font-bold text-brand-navy">Become a Business Partner</h2>
            <p className="text-brand-navy/70 text-lg leading-relaxed">
              Bayelsa International Airport is home to Nigeria's fastest-growing travel retail space. Join our network of premium brands and service providers.
            </p>
            <button className="btn-primary">Apply for Space</button>
          </div>
        </div>
      </section>
    </div>
  );
}
