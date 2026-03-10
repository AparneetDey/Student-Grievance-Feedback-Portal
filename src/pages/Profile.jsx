import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { User, Mail, BookOpen, Building2, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    department: user?.department || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would submit to the backend
    setIsEditing(false);
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>User Profile</h1>

      <div className="rounded-lg border p-8" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{user?.name}</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4 mb-8">
          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: isEditing ? 'var(--input)' : 'var(--secondary)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                opacity: isEditing ? 1 : 0.6,
                cursor: isEditing ? 'text' : 'default'
              }}
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: isEditing ? 'var(--input)' : 'var(--secondary)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                opacity: isEditing ? 1 : 0.6,
                cursor: isEditing ? 'text' : 'default'
              }}
            />
          </div>

          {/* Student ID */}
          {user?.role === 'student' && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                <BookOpen className="w-4 h-4" />
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: isEditing ? 'var(--input)' : 'var(--secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  opacity: isEditing ? 1 : 0.6,
                  cursor: isEditing ? 'text' : 'default'
                }}
              />
            </div>
          )}

          {/* Department */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              <Building2 className="w-4 h-4" />
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: isEditing ? 'var(--input)' : 'var(--secondary)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                opacity: isEditing ? 1 : 0.6,
                cursor: isEditing ? 'text' : 'default'
              }}
            />
          </div>

          {/* Member Since */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              <Calendar className="w-4 h-4" />
              Member Since
            </label>
            <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)' }}>
              {new Date(user?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Edit/Save Buttons */}
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg font-semibold text-white"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-lg font-semibold border"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
