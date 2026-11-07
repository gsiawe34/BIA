import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Flights from '@/pages/Flights';
import Lounge from '@/pages/Lounge';
import Parking from '@/pages/Parking';
import Services from '@/pages/Services';
import News from '@/pages/News';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/AdminDashboard';

const Corporate = () => <div className="py-40 text-center">Corporate Info Page (Coming Soon)</div>;

const queryClient = new QueryClient();

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/auth/login');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <div className="flex-grow">
        {children}
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/services" element={<Services />} />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/parking" element={<Parking />} />
            <Route path="/news" element={<News />} />
            <Route path="/corporate" element={<Corporate />} />
            
            {/* Auth & Admin Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </QueryClientProvider>
  );
}
