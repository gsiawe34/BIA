import { useState, useEffect } from 'react';
import { supabase, Flight } from '@/lib/supabase';
import { PlaneLanding, PlaneTakeoff, Search, RefreshCcw, Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export default function Flights() {
  const [activeTab, setActiveTab] = useState<'arrival' | 'departure'>('arrival');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: flights, isLoading, refetch } = useQuery({
    queryKey: ['flights', activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .eq('type', activeTab)
        .order('scheduled_time', { ascending: true });
      
      if (error) throw error;
      return data as Flight[];
    }
  });

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('flight-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'flights' }, () => {
        refetch();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const filteredFlights = flights?.filter(f => 
    f.flight_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.origin_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.destination_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.airline_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding': return 'text-amber-600 bg-amber-50';
      case 'departed': return 'text-blue-600 bg-blue-50';
      case 'arrived': return 'text-emerald-600 bg-emerald-50';
      case 'delayed': return 'text-rose-600 bg-rose-50';
      case 'cancelled': return 'text-slate-600 bg-slate-100';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Flight Information</h1>
            <p className="text-white/70 text-lg">Real-time arrivals and departures for Bayelsa International Airport.</p>
          </div>
        </div>
      </section>

      {/* Control Bar */}
      <section className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="glass-card rounded-2xl p-4 flex flex-col lg:flex-row items-center gap-6">
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl w-full lg:w-auto">
            <button 
              onClick={() => setActiveTab('arrival')}
              className={cn(
                "flex-1 lg:flex-none px-8 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                activeTab === 'arrival' ? "bg-white text-brand-navy shadow-sm" : "text-slate-500 hover:text-brand-navy"
              )}
            >
              <PlaneLanding className="w-4 h-4" />
              Arrivals
            </button>
            <button 
              onClick={() => setActiveTab('departure')}
              className={cn(
                "flex-1 lg:flex-none px-8 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                activeTab === 'departure' ? "bg-white text-brand-navy shadow-sm" : "text-slate-500 hover:text-brand-navy"
              )}
            >
              <PlaneTakeoff className="w-4 h-4" />
              Departures
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by flight, city or airline..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            onClick={() => refetch()}
            className="p-3 text-slate-500 hover:text-brand-navy hover:bg-slate-50 rounded-xl transition-all"
            title="Refresh schedule"
          >
            <RefreshCcw className={cn("w-5 h-5", isLoading && "animate-spin")} />
          </button>
        </div>
      </section>

      {/* Flight Table */}
      <section className="container mx-auto px-6 py-12">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Airline</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Flight</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">{activeTab === 'arrival' ? 'Origin' : 'Destination'}</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Scheduled</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Terminal / Gate</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-8">
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredFlights?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                      No flights found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredFlights?.map((flight) => (
                    <tr key={flight.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          {flight.airline_logo_url ? (
                            <img src={flight.airline_logo_url} alt={flight.airline_name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">AIR</div>
                          )}
                          <span className="font-bold text-brand-navy">{flight.airline_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-mono font-bold text-slate-600">{flight.flight_number}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-300" />
                          <span className="font-medium">{activeTab === 'arrival' ? flight.origin_city : flight.destination_city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-navy">{formatTime(flight.scheduled_time)}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(flight.scheduled_time).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Terminal {flight.terminal}</div>
                          {flight.gate && <div className="px-2 py-1 bg-blue-50 rounded text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Gate {flight.gate}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          getStatusColor(flight.status)
                        )}>
                          {flight.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="container mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-2xl space-y-4 border-l-4 border-brand-gold">
          <Clock className="text-brand-gold w-8 h-8" />
          <h3 className="text-lg font-display font-bold text-brand-navy">Check-in Times</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Domestic passengers are advised to arrive 2 hours before scheduled departure. International flights require 3 hours.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl space-y-4 border-l-4 border-brand-blue">
          <Tag className="text-brand-blue w-8 h-8" />
          <h3 className="text-lg font-display font-bold text-brand-navy">Baggage Rules</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Check with your airline for weight limits. Liquid restrictions apply at security checkpoints.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl space-y-4 border-l-4 border-emerald-500">
          <Calendar className="text-emerald-500 w-8 h-8" />
          <h3 className="text-lg font-display font-bold text-brand-navy">Flight Alerts</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Enable push notifications on our mobile app to receive real-time updates about your flight status.</p>
        </div>
      </section>
    </div>
  );
}
