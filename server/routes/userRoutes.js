import express from 'express';
import {
  createUsersController,
  adminCreateUserController,
  loginUserController,
  logoutUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController
} from '../controllers/UserController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';
import { validate, registerSchema, loginSchema, updateUserSchema } from '../validations/userValidation.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// Auth Rate Limiters (Prevent Brute Force)
const authLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 10 }); // 10 attempts per 15 min

// Public routes (Standard registration & login with rate limiting & schema validation)
router.post('/register', authLimiter, validate(registerSchema), createUsersController);
router.post('/login', authLimiter, validate(loginSchema), loginUserController);

// Protected routes (Logged in users)
router.post('/logout', verifyToken, logoutUserController);
router.get('/:id', verifyToken, getUserByIdController);
router.put('/:id', verifyToken, validate(updateUserSchema), updateUserController);

// Admin-only protected routes
router.get('/', verifyToken, verifyAdmin, getAllUsersController);
router.post('/admin/create-user', verifyToken, verifyAdmin, adminCreateUserController);
router.delete('/:id', verifyToken, verifyAdmin, deleteUserController);

export default router;
