import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Calendar, User, ArrowRight, Newspaper, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';

export default function News() {
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-brand-navy py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <Newspaper className="w-full h-full rotate-12 transform translate-x-1/4" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block px-4 py-2 bg-brand-gold/10 rounded-lg text-brand-gold font-bold text-xs tracking-widest uppercase">
              Airport Press Centre
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold">Latest Updates <br /> & Announcements</h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Stay informed about BIA developments, new flight routes, and community activities.
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-12">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass-card rounded-3xl h-64 animate-pulse bg-slate-100"></div>
              ))
            ) : newsItems?.length === 0 ? (
              <div className="py-20 text-center space-y-4 glass-card rounded-3xl">
                <p className="text-slate-500">No news articles published yet.</p>
              </div>
            ) : (
              newsItems?.map((news) => (
                <article key={news.id} className="group glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row hover:border-brand-gold/30 transition-all">
                  <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                    <img 
                      src={news.image_url || "/src/assets/images/hero_airport_terminal_1794017427157.jpg"} 
                      alt={news.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="md:w-3/5 p-8 md:p-10 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      <span className="text-brand-gold">{news.category || 'General'}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(news.published_at)}
                      </div>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-brand-navy mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                      {news.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {news.excerpt || news.content.substring(0, 150) + '...'}
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="w-3 h-3 text-slate-400" />
                        </div>
                        {news.author_name || 'BIA Press'}
                      </div>
                      <button className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Categories */}
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h3 className="font-display font-bold text-xl text-brand-navy">Categories</h3>
              <div className="flex flex-col gap-3 text-sm font-medium">
                {['Announcements', 'Operations', 'Community', 'Security'].map(cat => (
                  <button key={cat} className="flex items-center justify-between py-2 text-slate-600 hover:text-brand-navy transition-colors group">
                    {cat}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-gold transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-brand-navy p-8 rounded-3xl text-white space-y-6 relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                <h3 className="font-display font-bold text-xl">Newsletter</h3>
                <p className="text-white/60 text-sm leading-relaxed">Subscribe to receive BIA news and flight updates directly in your inbox.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
                  <button className="btn-gold w-full py-3">Subscribe</button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl"></div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
