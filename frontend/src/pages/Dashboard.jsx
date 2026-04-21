import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { dummyGrievances, dummyNotifications, getNotificationsByUserId } from '../lib/data';
import { FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const userGrievances = dummyGrievances.filter(g => g.userId === user.id);
  const userNotifications = getNotificationsByUserId(user.id);

  const stats = {
    total: userGrievances.length,
    open: userGrievances.filter(g => g.status === 'open').length,
    inProgress: userGrievances.filter(g => g.status === 'in-progress').length,
    resolved: userGrievances.filter(g => g.status === 'resolved').length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
          Welcome, {user.name.split(' ')[0]}!
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }} className="mt-2">
          Here's your grievance overview and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Grievances */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Total Grievances</p>
              <p className="text-3xl font-bold mt-2" style={{ color: 'var(--foreground)' }}>{stats.total}</p>
            </div>
            <FileText className="w-12 h-12" style={{ color: 'var(--primary)' }} />
          </div>
        </div>

        {/* Open */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Open</p>
              <p className="text-3xl font-bold mt-2" style={{ color: 'var(--foreground)' }}>{stats.open}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* In Progress */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>In Progress</p>
              <p className="text-3xl font-bold mt-2" style={{ color: 'var(--foreground)' }}>{stats.inProgress}</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-500" />
          </div>
        </div>

        {/* Resolved */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Resolved</p>
              <p className="text-3xl font-bold mt-2" style={{ color: 'var(--foreground)' }}>{stats.resolved}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Grievances */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Recent Grievances</h2>
          {user.role === 'student' && (
            <button
              onClick={() => navigate('/grievances/new')}
              className="px-4 py-2 rounded-lg text-white font-semibold transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              New Grievance
            </button>
          )}
        </div>

        {userGrievances.length === 0 ? (
          <div className="p-8 text-center rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>No grievances yet. Submit one to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {userGrievances.slice(0, 5).map(grievance => (
              <button
                key={grievance.id}
                onClick={() => navigate(`/grievances/${grievance.id}`)}
                className="w-full text-left p-4 rounded-lg border hover:shadow-md transition-all"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{grievance.title}</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{grievance.description.substring(0, 100)}...</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{
                    backgroundColor: grievance.status === 'open' ? 'rgba(255,0,0,0.1)' : 
                                    grievance.status === 'in-progress' ? 'rgba(255,165,0,0.1)' : 'rgba(0,255,0,0.1)',
                    color: grievance.status === 'open' ? '#dc2626' : 
                           grievance.status === 'in-progress' ? '#f59e0b' : '#16a34a'
                  }}>
                    {grievance.status.toUpperCase()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Recent Notifications</h2>
        {userNotifications.length === 0 ? (
          <div className="p-8 text-center rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {userNotifications.slice(0, 5).map(notification => (
              <div
                key={notification.id}
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: notification.isRead ? 'var(--card)' : 'var(--secondary)',
                  borderColor: 'var(--border)' 
                }}
              >
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{notification.title}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{notification.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
