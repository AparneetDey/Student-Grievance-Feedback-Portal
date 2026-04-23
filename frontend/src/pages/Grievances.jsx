import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { dummyGrievances, GRIEVANCE_CATEGORIES } from '../lib/data';
import { Plus, Search } from 'lucide-react';

export default function GrievancesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  if (!user) return null;

  const userGrievances = dummyGrievances.filter(g => g.userId == user.id);

  const filtered = userGrievances.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         g.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || g.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>My Grievances</h1>
          <p style={{ color: 'var(--muted-foreground)' }} className="mt-2">
            Manage and track your grievances
          </p>
        </div>
        <button
          onClick={() => navigate('/grievances/new')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <Plus className="w-5 h-5" />
          New Grievance
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
          <input
            type="text"
            placeholder="Search grievances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          />
        </div>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        >
          <option value="">All Categories</option>
          {GRIEVANCE_CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Grievances List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>No grievances found</p>
          </div>
        ) : (
          filtered.map(grievance => (
            <button
              key={grievance.id}
              onClick={() => navigate(`/grievances/${grievance.id}`)}
              className="w-full text-left p-4 rounded-lg border hover:shadow-md transition-all"
              style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{grievance.title}</h3>
                    {grievance.anonymous && (
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)' }}>
                        Anonymous
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{grievance.description.substring(0, 150)}...</p>
                  <div className="mt-2 flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <span>{GRIEVANCE_CATEGORIES.find(c => c.value === grievance.category)?.label}</span>
                    <span>{new Date(grievance.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="ml-4 flex flex-col items-end gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{
                    backgroundColor: grievance.status === 'open' ? 'rgba(255,0,0,0.1)' : 
                                    grievance.status === 'in-progress' ? 'rgba(255,165,0,0.1)' : 
                                    grievance.status === 'resolved' ? 'rgba(0,255,0,0.1)' : 'rgba(128,128,128,0.1)',
                    color: grievance.status === 'open' ? '#dc2626' : 
                           grievance.status === 'in-progress' ? '#f59e0b' : 
                           grievance.status === 'resolved' ? '#16a34a' : '#6b7280'
                  }}>
                    {grievance.status.toUpperCase().replace('-', ' ')}
                  </span>
                  <span style={{ color: grievance.priority === 'high' ? '#dc2626' : grievance.priority === 'medium' ? '#f59e0b' : '#3b82f6' }} className="font-semibold text-xs">
                    {grievance.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
