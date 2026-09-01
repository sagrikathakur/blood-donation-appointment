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

const router = express.Router();

// Public routes
router.post('/register', createUsersController);
router.post('/login', loginUserController);

// Protected routes
router.get('/', verifyToken, getAllUsersController);
router.get('/:id', verifyToken, getUserByIdController);
router.put('/:id', verifyToken, updateUserController);
router.delete('/:id', verifyToken, deleteUserController);

export default router;
