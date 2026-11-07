import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  LayoutDashboard, 
  Plane, 
  Users, 
  Calendar, 
  ShoppingBag, 
  Newspaper, 
  Settings, 
  LogOut, 
  TrendingUp, 
  AlertCircle,
  Bell,
  Search,
  User as UserIcon,
  ChevronRight,
  Clock,
  MoreVertical
} from 'lucide-react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { cn, formatTime } from '@/lib/utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate('/auth/login');
      } else {
        setUser(data.user);
      }
    });
  }, [navigate]);

  const stats = [
    { name: 'Total Flights', value: '24', change: '+12%', icon: Plane, color: 'text-blue-600 bg-blue-50' },
    { name: 'Lounge Bookings', value: '18', change: '+5%', icon: Coffee, color: 'text-amber-600 bg-amber-50' },
    { name: 'Parking Revenue', value: '₦450k', change: '+18%', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Support Issues', value: '2', change: '-50%', icon: AlertCircle, color: 'text-rose-600 bg-rose-50' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-navy text-white flex flex-col shrink-0 fixed inset-y-0 z-50">
        <div className="p-8 border-b border-white/10 flex items-center gap-3">
           <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center">
            <Plane className="text-brand-navy w-5 h-5 transform -rotate-12" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">BIA Admin</span>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'flights', name: 'Flight Ops', icon: Plane },
            { id: 'bookings', name: 'Bookings', icon: Calendar },
            { id: 'commercial', name: 'Commercial', icon: ShoppingBag },
            { id: 'news', name: 'News & Media', icon: Newspaper },
            { id: 'users', name: 'User Access', icon: Users },
            { id: 'settings', name: 'System Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                activeTab === item.id ? "bg-brand-gold text-brand-navy shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-brand-navy" : "text-white/40 group-hover:text-white")} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search data, flights, or records..."
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-brand-navy transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-brand-navy leading-none">Admin User</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <UserIcon className="text-slate-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10 space-y-10">
          {/* Welcome */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-bold text-brand-navy uppercase tracking-tight">Administrative Console</h1>
              <p className="text-slate-500 text-sm font-medium">Monitoring terminal operations and passenger services.</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Download Report</button>
               <button className="px-5 py-2.5 bg-brand-navy text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-navy/10 hover:bg-slate-800 transition-all">Add New Flight</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-lg",
                    stat.change.startsWith('+') ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.name}</p>
                  <p className="text-3xl font-display font-bold text-brand-navy">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tables Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Recent Bookings */}
             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="font-display font-bold text-xl text-brand-navy">Recent Bookings</h3>
                 <button className="text-xs font-bold text-brand-gold uppercase tracking-widest hover:underline">View All</button>
               </div>
               <div className="flex-grow">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="px-8 py-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-all group">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                         <Calendar className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-brand-navy">Lounge Reservation #{1020 + i}</p>
                         <p className="text-xs text-slate-400">John Doe · 2 Guests</p>
                       </div>
                     </div>
                     <div className="text-right flex items-center gap-4">
                       <div>
                         <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase">Pending</p>
                         <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">12:30 PM</p>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-brand-navy" />
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Ops Feed */}
             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="font-display font-bold text-xl text-brand-navy">Operations Feed</h3>
                 <button className="text-xs font-bold text-brand-gold uppercase tracking-widest hover:underline">Full Log</button>
               </div>
               <div className="flex-grow p-8 space-y-6">
                 {[
                   { time: '10:45 AM', event: 'Flight APK471 arrived at Gate 4', type: 'flight' },
                   { time: '10:30 AM', event: 'Security alert cleared in Terminal 1', type: 'security' },
                   { time: '09:15 AM', event: 'New parking rate deployment complete', type: 'system' },
                   { time: '08:00 AM', event: 'Shift change: Morning Ops Team on duty', type: 'staff' },
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 relative last:after:hidden after:absolute after:left-[7px] after:top-[20px] after:bottom-[-20px] after:w-[2px] after:bg-slate-100">
                     <div className="w-4 h-4 rounded-full bg-slate-200 border-4 border-white z-10 shrink-0 mt-1"></div>
                     <div className="space-y-1">
                       <p className="text-sm font-bold text-brand-navy">{log.event}</p>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                         <Clock className="w-3 h-3" />
                         {log.time}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-component for icons to fix coffee import error
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
