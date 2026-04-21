import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

// Pages
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import GrievancesPage from './pages/Grievances';
import GrievanceDetailPage from './pages/GrievanceDetail';
import NewGrievancePage from './pages/NewGrievance';
import NotificationsPage from './pages/Notifications';
import AdminGrievancesPage from './pages/AdminGrievances';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import HomePage from './pages/Home';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grievances"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <GrievancesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grievances/new"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <NewGrievancePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grievances/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <GrievanceDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/grievances"
            element={
              <ProtectedRoute allowedRoles={['admin', 'mentor']}>
                <Layout>
                  <AdminGrievancesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
