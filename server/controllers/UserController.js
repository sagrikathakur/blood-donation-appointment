import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { createUser, findUserByEmail, getAllUsers, getUserById, updateuser, deleteUser } from '../models/User.js';

// Public registration (Users & Donors only)
export const createUsersController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Security Check: Prevent self-assigned admin creation via public registration
    if (role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Security Violation: Admin accounts cannot be created via public registration.'
      });
    }

    const assignedRole = role === 'donor' ? 'donor' : 'user';

    // Check if email already exists
    const emailController = await findUserByEmail(email);
    if (emailController) {
      return res.status(409).json({
        success: false,
        message: 'Email address is already registered'
      });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      role: assignedRole
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, email: newUser.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Admin-only user creation controller
export const adminCreateUserController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const emailController = await findUserByEmail(email);
    if (emailController) {
      return res.status(409).json({
        success: false,
        message: 'Email address is already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    const assignedRole = (role || 'user').toLowerCase();

    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      role: assignedRole
    });

    return res.status(201).json({
      success: true,
      message: 'User account created by Admin',
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Ensure admin@lifepulse.org is granted admin role in database
    if (user.email === 'admin@lifepulse.org' && user.role !== 'admin') {
      user.role = 'admin';
      await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [user.email]);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    const { password: _, ...userData } = user;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Logout user
export const logoutUserController = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all users (Admin only)
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user by ID
export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Non-admin users can only view their own profile
    if (req.user.role !== 'admin' && String(req.user.id) !== String(id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only view your own profile'
      });
    }

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update user
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Security check: non-admins can only update their own profile and cannot change roles
    if (req.user.role !== 'admin') {
      if (String(req.user.id) !== String(id)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You can only update your own account'
        });
      }
      if (role && role !== req.user.role) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: Only administrators can modify user roles'
        });
      }
    }

    const targetRole = req.user.role === 'admin' ? (role ? role.toLowerCase() : undefined) : undefined;
    const updatedUser = await updateuser(id, { name, email, role: targetRole });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete user (Admin only)
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      user: deletedUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};