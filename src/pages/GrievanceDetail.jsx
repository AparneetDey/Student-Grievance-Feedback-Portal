import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { getGrievanceById, getCommentsByGrievanceId, getUserById, GRIEVANCE_CATEGORIES } from '../lib/data';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';

const GrievanceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  const grievance = getGrievanceById(id);
  const comments = getCommentsByGrievanceId(id);

  if (!grievance) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p style={{ color: 'var(--muted-foreground)' }}>Grievance not found</p>
          <button onClick={() => navigate('/grievances')} className="mt-4 text-primary">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const submittedBy = getUserById(grievance.userId);
  const category = GRIEVANCE_CATEGORIES.find(c => c.value === grievance.category);

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/grievances')}
        className="flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
        style={{ color: 'var(--primary)' }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="rounded-lg border p-6 mb-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{grievance.title}</h1>
                {grievance.anonymous && (
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--secondary)' }}>
                    Anonymous
                  </span>
                )}
              </div>
              <span className="px-4 py-2 rounded-full font-semibold text-sm" style={{
                backgroundColor: grievance.status === 'open' ? 'rgba(255,0,0,0.1)' : 
                                grievance.status === 'in-progress' ? 'rgba(255,165,0,0.1)' : 
                                grievance.status === 'resolved' ? 'rgba(0,255,0,0.1)' : 'rgba(128,128,128,0.1)',
                color: grievance.status === 'open' ? '#dc2626' : 
                       grievance.status === 'in-progress' ? '#f59e0b' : 
                       grievance.status === 'resolved' ? '#16a34a' : '#6b7280'
              }}>
                {grievance.status.toUpperCase().replace('-', ' ')}
              </span>
            </div>

            {/* Meta Information */}
            <div className="space-y-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Category: {category?.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Submitted: {new Date(grievance.createdAt).toLocaleDateString()}</span>
              </div>
              {!grievance.anonymous && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>By: {submittedBy?.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="rounded-lg border p-6 mb-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Description</h2>
            <p style={{ color: 'var(--foreground)', whiteSpace: 'pre-wrap' }}>{grievance.description}</p>
          </div>

          {/* Comments */}
          <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Comments & Responses</h2>

            {comments.length === 0 ? (
              <p style={{ color: 'var(--muted-foreground)' }}>No comments yet</p>
            ) : (
              <div className="space-y-4 mb-6">
                {comments.map(comment => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: comment.isAdminResponse ? 'var(--secondary)' : 'transparent',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                        {comment.isAdminResponse ? 'Administrator' : getUserById(comment.userId)?.name}
                      </span>
                      {comment.isAdminResponse && (
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                          Official Response
                        </span>
                      )}
                    </div>
                    <p style={{ color: 'var(--foreground)' }}>{comment.content}</p>
                    <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            {user?.id === grievance.userId && (
              <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 rounded-lg border mb-3"
                  style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  rows="4"
                />
                <button
                  className="px-4 py-2 rounded-lg text-white font-semibold"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Post Comment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Priority</p>
                <p className="font-semibold mt-1" style={{
                  color: grievance.priority === 'high' ? '#dc2626' : grievance.priority === 'medium' ? '#f59e0b' : '#3b82f6'
                }}>
                  {grievance.priority.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Status</p>
                <p className="font-semibold mt-1" style={{ color: 'var(--foreground)' }}>
                  {grievance.status.charAt(0).toUpperCase() + grievance.status.slice(1).replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Last Updated</p>
                <p className="font-semibold mt-1" style={{ color: 'var(--foreground)' }}>
                  {new Date(grievance.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GrievanceDetailPage