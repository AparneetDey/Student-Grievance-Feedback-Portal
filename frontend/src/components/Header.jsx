import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Bell, LogOut, User, Settings } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
            SG
          </div>
          <span className="font-bold text-lg hidden sm:inline">Student Grievances</span>
        </button>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-secondary cursor-pointer" onClick={() => navigate('/profile')}>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {getInitials(user.name)}
            </div>
            <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
