import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const API_BASE = 'http://localhost:3000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lifePulse_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Guarantee admin role for admin@lifepulse.org even if cached user object had stale role
        if (parsed && parsed.email === 'admin@lifepulse.org') {
          parsed.role = 'admin';
        }
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('lifePulse_token') || null);

  useEffect(() => {
    if (user) {
      if (user.email === 'admin@lifepulse.org') {
        user.role = 'admin';
      }
      localStorage.setItem('lifePulse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lifePulse_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('lifePulse_token', token);
    } else {
      localStorage.removeItem('lifePulse_token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        let loggedInUser = data.user;
        if (loggedInUser && (loggedInUser.email === 'admin@lifepulse.org' || email === 'admin@lifepulse.org')) {
          loggedInUser.role = 'admin';
        }
        setUser(loggedInUser);
        setToken(data.token);
        localStorage.setItem('lifePulse_user', JSON.stringify(loggedInUser));
        localStorage.setItem('lifePulse_token', data.token);
        return { success: true, message: data.message || 'Login successful', user: loggedInUser };
      } else {
        return { success: false, message: data.message || 'Invalid email or password' };
      }
    } catch (err) {
      return { success: false, message: 'Server error: Unable to connect to backend server' };
    }
  };

  // Public account registration (User / Donor only)
  const register = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.token && data.user) {
          let newUserObj = data.user;
          if (newUserObj.email === 'admin@lifepulse.org') {
            newUserObj.role = 'admin';
          }
          setUser(newUserObj);
          setToken(data.token);
        }
        return { success: true, message: data.message || 'Account registered successfully!' };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, message: 'Server error: Unable to connect to backend server. Make sure your server is running on port 3000.' };
    }
  };

  // Admin-only user account creation
  const adminCreateUser = async (formData) => {
    if (!token) return { success: false, message: 'Unauthorized action' };
    try {
      const res = await fetch(`${API_BASE}/users/admin/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: data.message || 'User created successfully' };
      } else {
        return { success: false, message: data.message || 'Creation failed' };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch(`${API_BASE}/users/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (err) {
        console.error('Logout request error:', err);
      }
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('lifePulse_user');
    localStorage.removeItem('lifePulse_token');
  };

  const fetchUsers = async () => {
    if (!token) return { success: false, message: 'No authentication token', users: [] };
    try {
      const res = await fetch(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, users: data.users };
      } else {
        return { success: false, message: data.message || 'Failed to fetch users', users: [] };
      }
    } catch (err) {
      return { success: false, message: 'Server error fetching user directory', users: [] };
    }
  };

  const updateUser = async (id, payload) => {
    if (!token) return { success: false, message: 'Unauthorized action' };
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (user && (user.id === id || user.id === Number(id))) {
          setUser(data.user);
        }
        return { success: true, message: 'User updated successfully', user: data.user };
      } else {
        return { success: false, message: data.message || 'Update failed' };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const removeUser = async (id) => {
    if (!token) return { success: false, message: 'Unauthorized action' };
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: 'User deleted successfully' };
      } else {
        return { success: false, message: data.message || 'Deletion failed' };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        adminCreateUser,
        logout,
        fetchUsers,
        updateUser,
        removeUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
