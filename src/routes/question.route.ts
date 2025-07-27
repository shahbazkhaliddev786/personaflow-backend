import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questions.controller';

const router = express.Router();

// @route   POST /api/questions
router.post('/', createQuestion);

// @route   GET /api/questions
router.get('/', getAllQuestions);

// @route   GET /api/questions/:id
router.get('/:id', getQuestionById);

// @route   PUT /api/questions/:id
router.patch('/:id', updateQuestion);

// @route   DELETE /api/questions/:id
router.delete('/:id', deleteQuestion);

export default router;
