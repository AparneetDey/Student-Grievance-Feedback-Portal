import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { AlertCircle, User, Mail, Lock, BookOpen, Building2 } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: 'var(--background)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center font-bold text-2xl text-white mx-auto mb-4" style={{ backgroundColor: 'var(--primary)' }}>
            SG
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Create Account</h1>
          <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>Join the Grievance Portal</p>
        </div>

        {/* Signup Card */}
        <div className="rounded-lg border p-6 shadow-lg" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          {/* Error Alert */}
          {(formError || error) && (
            <div className="mb-4 p-3 rounded-lg flex gap-3" style={{ backgroundColor: 'var(--error)', color: 'var(--destructive-foreground)' }}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{formError || error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  required
                />
              </div>
            </div>

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

            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Student ID</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="STU20230001"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Department</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
              className="w-full py-2 px-4 rounded-lg font-semibold transition-colors text-white mt-6"
              style={{ backgroundColor: loading ? 'var(--muted)' : 'var(--primary)' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--muted-foreground)' }}>
            Already have an account? <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
