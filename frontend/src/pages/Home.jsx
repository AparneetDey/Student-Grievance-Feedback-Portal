import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useEffect } from 'react';
import { ShieldCheck, Zap, Users, Lock } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div style={{ backgroundColor: 'var(--background)' }} className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
              SG
            </div>
            <span className="font-bold text-lg">Student Grievances</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-4 py-2 rounded-lg text-white font-semibold transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Student Grievances Portal
          </h1>
          <p className="text-xl mb-8" style={{ color: 'var(--muted-foreground)' }}>
            A secure platform for students to submit, track, and resolve academic concerns with confidence.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 rounded-lg text-white font-semibold text-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Start Using Portal
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>Why Choose Our Portal?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <ShieldCheck className="w-12 h-12 mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--foreground)' }}>Secure & Private</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>Your grievances are encrypted and handled confidentially by administrators.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <Zap className="w-12 h-12 mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--foreground)' }}>Fast Resolution</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>Track your grievances in real-time and get quick feedback from admins.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <Users className="w-12 h-12 mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--foreground)' }}>Transparent Process</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>Complete visibility into your grievance status and admin responses.</p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <Lock className="w-12 h-12 mb-4" style={{ color: 'var(--primary)' }} />
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--foreground)' }}>Easy & Simple</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>Intuitive interface that's easy to navigate and use for all students.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center" style={{ color: 'var(--muted-foreground)' }}>
            © 2024 Student Grievances Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
