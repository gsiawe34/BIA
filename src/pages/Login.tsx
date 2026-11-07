import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, Mail, Lock, ChevronRight, Plane, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-navy/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Brand Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center mx-auto shadow-lg transform -rotate-12">
            <Plane className="text-brand-gold w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-brand-navy">Staff Access</h1>
            <p className="text-slate-500 font-medium">Bayelsa International Airport Portal</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-[2rem] p-10 shadow-2xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-display font-bold text-brand-navy">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Please sign in to your administrative account.</p>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold flex items-center gap-3">
              <Shield className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Official Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    required
                    type="email" 
                    placeholder="staff@bayelsaairport.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-navy focus:ring-brand-navy transition-colors" />
                <span className="text-xs text-slate-500 font-medium group-hover:text-brand-navy transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-xs font-bold text-brand-gold hover:text-brand-navy transition-colors">Forgot Password?</button>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base shadow-lg shadow-brand-navy/10"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In to Dashboard
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Support Link */}
        <div className="text-center mt-10">
          <p className="text-sm text-slate-400">
            Need technical assistance? <a href="#" className="text-brand-navy font-bold hover:underline">Contact IT Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
