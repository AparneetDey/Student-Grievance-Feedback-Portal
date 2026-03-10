import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyGrievances, GRIEVANCE_CATEGORIES, GRIEVANCE_STATUSES } from '../lib/data';
import { Search, Filter } from 'lucide-react';

export default function AdminGrievancesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filtered = dummyGrievances.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || g.status === filterStatus;
    const matchesCategory = !filterCategory || g.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>All Grievances</h1>
        <p style={{ color: 'var(--muted-foreground)' }} className="mt-2">
          Manage and review all student grievances
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        >
          <option value="">All Statuses</option>
          {GRIEVANCE_STATUSES.map(status => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>

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

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Total</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{dummyGrievances.length}</p>
        </div>
        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Open</p>
          <p className="text-2xl font-bold text-red-600">{dummyGrievances.filter(g => g.status === 'open').length}</p>
        </div>
        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>In Progress</p>
          <p className="text-2xl font-bold text-yellow-600">{dummyGrievances.filter(g => g.status === 'in-progress').length}</p>
        </div>
        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Resolved</p>
          <p className="text-2xl font-bold text-green-600">{dummyGrievances.filter(g => g.status === 'resolved').length}</p>
        </div>
      </div>

      {/* Grievances Table */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: 'var(--secondary)' }}>
              <tr>
                <th className="text-left px-6 py-3 font-semibold" style={{ color: 'var(--foreground)' }}>Title</th>
                <th className="text-left px-6 py-3 font-semibold" style={{ color: 'var(--foreground)' }}>Category</th>
                <th className="text-left px-6 py-3 font-semibold" style={{ color: 'var(--foreground)' }}>Status</th>
                <th className="text-left px-6 py-3 font-semibold" style={{ color: 'var(--foreground)' }}>Priority</th>
                <th className="text-left px-6 py-3 font-semibold" style={{ color: 'var(--foreground)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(grievance => (
                <tr
                  key={grievance.id}
                  onClick={() => navigate(`/grievances/${grievance.id}`)}
                  className="border-t cursor-pointer hover:opacity-70 transition-opacity"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className="px-6 py-3" style={{ color: 'var(--foreground)' }}>{grievance.title}</td>
                  <td className="px-6 py-3" style={{ color: 'var(--muted-foreground)' }}>
                    {GRIEVANCE_CATEGORIES.find(c => c.value === grievance.category)?.label}
                  </td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{
                      backgroundColor: grievance.status === 'open' ? 'rgba(255,0,0,0.1)' : 
                                      grievance.status === 'in-progress' ? 'rgba(255,165,0,0.1)' : 
                                      grievance.status === 'resolved' ? 'rgba(0,255,0,0.1)' : 'rgba(128,128,128,0.1)',
                      color: grievance.status === 'open' ? '#dc2626' : 
                             grievance.status === 'in-progress' ? '#f59e0b' : 
                             grievance.status === 'resolved' ? '#16a34a' : '#6b7280'
                    }}>
                      {grievance.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span style={{
                      color: grievance.priority === 'high' ? '#dc2626' : grievance.priority === 'medium' ? '#f59e0b' : '#3b82f6'
                    }}>
                      {grievance.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-3" style={{ color: 'var(--muted-foreground)' }}>
                    {new Date(grievance.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
