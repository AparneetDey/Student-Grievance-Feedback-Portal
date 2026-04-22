import React, { createContext, useContext, useState, useEffect } from 'react';
import { dummyUsers } from './data';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // data contains the user object returned by the backend
      const userData = {
        id: data.uid,
        email: data.email,
        name: data.name,
        role: data.role || 'student',
        studentId: data.studentId,
        department: data.department,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/student/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          studentId: formData.studentId,
          department: formData.department,
          role: 'student'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      
      const newUser = {
        id: data.uid,
        email: data.email,
        name: data.name,
        role: data.role || 'student',
        studentId: data.studentId,
        department: data.department,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
