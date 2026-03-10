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
      // Simulate API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user by email
      const foundUser = Object.values(dummyUsers).find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      // In a real app, verify password
      if (password !== 'password123') {
        throw new Error('Invalid password');
      }
      
      const userData = {
        ...foundUser,
        // Don't store password in localStorage
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email already exists
      const exists = Object.values(dummyUsers).some(u => u.email === formData.email);
      if (exists) {
        throw new Error('Email already registered');
      }
      
      const newUser = {
        id: String(Object.keys(dummyUsers).length + 1),
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: 'student',
        studentId: formData.studentId || '',
        department: formData.department || '',
        createdAt: new Date(),
        updatedAt: new Date(),
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
