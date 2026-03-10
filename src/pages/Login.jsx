import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { AlertCircle, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Demo credentials hint
  const demoCredentials = {
    student: { email: 'student@university.edu', password: 'password123' },
    admin: { email: 'admin@university.edu', password: 'password123' },
  };

  const fillDemoCredentials = (role) => {
    setFormData(demoCredentials[role]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: 'var(--background)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center font-bold text-2xl text-white mx-auto mb-4" style={{ backgroundColor: 'var(--primary)' }}>
            SG
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Student Grievances Portal</h1>
          <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>Secure Platform for Academic Concerns</p>
        </div>

        {/* Login Card */}
        <div className="rounded-lg border p-6 shadow-lg" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Welcome Back</h2>

          {/* Error Alert */}
          {(formError || error) && (
            <div className="mb-4 p-3 rounded-lg flex gap-3" style={{ backgroundColor: 'var(--error)', color: 'var(--destructive-foreground)' }}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{formError || error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@university.edu"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg font-semibold transition-colors text-white"
              style={{ backgroundColor: loading ? 'var(--muted)' : 'var(--primary)' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>Demo Credentials</p>
            <div className="space-y-2">
              <button
                onClick={() => fillDemoCredentials('student')}
                className="w-full p-2 rounded-lg text-sm border transition-colors"
                style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                Student Account
              </button>
              <button
                onClick={() => fillDemoCredentials('admin')}
                className="w-full p-2 rounded-lg text-sm border transition-colors"
                style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                Admin Account
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--muted-foreground)' }}>
            Don't have an account? <Link to="/signup" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
