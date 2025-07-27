import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateChatbotAnswers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/:chatbotName', updateChatbotAnswers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
