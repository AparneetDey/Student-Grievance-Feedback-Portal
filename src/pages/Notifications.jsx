import { useAuth } from '../lib/AuthContext';
import { getNotificationsByUserId } from '../lib/data';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { user } = useAuth();
  const notifications = getNotificationsByUserId(user?.id);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>Notifications</h1>
          <p style={{ color: 'var(--muted-foreground)' }} className="mt-2">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="px-4 py-2 rounded-lg text-sm font-semibold border"
            style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)' }}>
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <Bell className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted-foreground)' }} />
            <p style={{ color: 'var(--muted-foreground)' }}>No notifications yet</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className="p-4 rounded-lg border transition-all hover:shadow-md"
              style={{
                backgroundColor: notification.isRead ? 'var(--card)' : 'var(--secondary)',
                borderColor: 'var(--border)'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{notification.title}</h3>
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></span>
                    )}
                  </div>
                  <p className="text-sm mt-1" style={{ color: 'var(--foreground)' }}>{notification.message}</p>
                  <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                    {new Date(notification.sentAt).toLocaleString()}
                  </p>
                </div>
                {notification.isRead && (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
