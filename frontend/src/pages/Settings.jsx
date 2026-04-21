import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Bell, Lock, Eye, Moon, Globe } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    emailUpdates: true,
    darkMode: false,
    twoFactor: false,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Settings</h1>

      {/* Notification Settings */}
      <div className="rounded-lg border p-8 mb-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <Bell className="w-6 h-6" />
          Notifications
        </h2>

        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
            { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive alerts via SMS' },
            { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser notifications' },
            { key: 'emailUpdates', label: 'Email Digest', description: 'Weekly summary of your grievances' },
          ].map(setting => (
            <div key={setting.key} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
              <div>
                <p className="font-semibold" style={{ color: 'var(--foreground)' }}>{setting.label}</p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{setting.description}</p>
              </div>
              <button
                onClick={() => handleToggle(setting.key)}
                className="w-12 h-7 rounded-full transition-colors relative"
                style={{ backgroundColor: settings[setting.key] ? 'var(--primary)' : 'var(--border)' }}
              >
                <div
                  className="w-5 h-5 rounded-full absolute top-1 transition-transform"
                  style={{
                    backgroundColor: 'white',
                    left: settings[setting.key] ? '26px' : '2px'
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="rounded-lg border p-8 mb-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <Lock className="w-6 h-6" />
          Privacy & Security
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
            <div>
              <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Two-Factor Authentication</p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Add extra security to your account</p>
            </div>
            <button
              onClick={() => handleToggle('twoFactor')}
              className="w-12 h-7 rounded-full transition-colors relative"
              style={{ backgroundColor: settings.twoFactor ? 'var(--primary)' : 'var(--border)' }}
            >
              <div
                className="w-5 h-5 rounded-full absolute top-1 transition-transform"
                style={{
                  backgroundColor: 'white',
                  left: settings.twoFactor ? '26px' : '2px'
                }}
              />
            </button>
          </div>

          <button className="w-full p-3 rounded-lg border text-left font-semibold hover:opacity-70 transition-opacity" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Change Password
            </div>
          </button>
        </div>
      </div>

      {/* Display Settings */}
      <div className="rounded-lg border p-8 mb-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <Moon className="w-6 h-6" />
          Display
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
            <div>
              <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Dark Mode</p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Easier on the eyes</p>
            </div>
            <button
              onClick={() => handleToggle('darkMode')}
              className="w-12 h-7 rounded-full transition-colors relative"
              style={{ backgroundColor: settings.darkMode ? 'var(--primary)' : 'var(--border)' }}
            >
              <div
                className="w-5 h-5 rounded-full absolute top-1 transition-transform"
                style={{
                  backgroundColor: 'white',
                  left: settings.darkMode ? '26px' : '2px'
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="rounded-lg border p-8" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <Globe className="w-6 h-6" />
          Account
        </h2>

        <div className="space-y-3">
          <button className="w-full p-3 rounded-lg border text-left font-semibold hover:opacity-70 transition-opacity" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
            Download Your Data
          </button>
          <button className="w-full p-3 rounded-lg border text-left font-semibold hover:opacity-70 transition-opacity" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
