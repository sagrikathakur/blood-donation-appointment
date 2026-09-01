import express from 'express';
import {
  createUsersController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController
} from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema, updateUserSchema } from '../validations/userValidation.js';

const router = express.Router();

// Public routes
router.post('/register', validate(registerSchema), createUsersController);
router.post('/login', validate(loginSchema), loginUserController);

// Protected routes
router.get('/', verifyToken, getAllUsersController);
router.get('/:id', verifyToken, getUserByIdController);
router.put('/:id', verifyToken, validate(updateUserSchema), updateUserController);
router.delete('/:id', verifyToken, deleteUserController);

export default router;
