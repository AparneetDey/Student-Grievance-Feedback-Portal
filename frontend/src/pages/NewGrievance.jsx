import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GRIEVANCE_CATEGORIES, dummyGrievances } from '../lib/data';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function NewGrievancePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new grievance and add it to the dummy data
    const newGrievance = {
      id: String(Date.now()), // Generate unique ID
      anonymous: formData.anonymous,
      category: formData.category,
      title: formData.title,
      description: formData.description,
      status: 'open',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user?.id,
    };
    
    // Add to the front of the array
    dummyGrievances.unshift(newGrievance);

    navigate('/grievances');
  };

  return (
    <div className="p-8 max-w-2xl">
      <button
        onClick={() => navigate('/grievances')}
        className="flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
        style={{ color: 'var(--primary)' }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="rounded-lg border p-8" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Submit New Grievance</h1>
        <p style={{ color: 'var(--muted-foreground)' }} className="mb-8">
          Please provide detailed information about your concern. The more details you provide, the faster we can resolve it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title of your grievance"
              className="w-full px-4 py-2 rounded-lg border"
              style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              required
            >
              <option value="">Select a category</option>
              {GRIEVANCE_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about your grievance..."
              className="w-full px-4 py-2 rounded-lg border"
              style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              rows="6"
              required
            />
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="anonymous" className="text-sm" style={{ color: 'var(--foreground)' }}>
              Submit as anonymous
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Submit Grievance
          </button>
        </form>
      </div>
    </div>
  );
}
