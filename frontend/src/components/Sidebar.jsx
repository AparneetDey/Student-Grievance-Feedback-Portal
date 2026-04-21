import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { LayoutDashboard, FileText, Bell, User, BarChart3, Settings, Users } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const isActive = (href) => location.pathname === href;

  // Navigation items based on role
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student', 'admin', 'mentor'] },
    { href: '/grievances', label: 'My Grievances', icon: FileText, roles: ['student'] },
    { href: '/admin/grievances', label: 'All Grievances', icon: FileText, roles: ['admin', 'mentor'] },
    { href: '/notifications', label: 'Notifications', icon: Bell, roles: ['student', 'admin', 'mentor'] },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin'] },
    { href: '/admin/users', label: 'Users', icon: Users, roles: ['admin'] },
    { href: '/profile', label: 'Profile', icon: User, roles: ['student', 'admin', 'mentor'] },
    { href: '/settings', label: 'Settings', icon: Settings, roles: ['student', 'admin', 'mentor'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-64 border-r min-h-screen" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
      <nav className="p-4 space-y-2">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: active ? 'var(--primary)' : 'transparent',
                color: active ? 'var(--primary-foreground)' : 'var(--foreground)',
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
