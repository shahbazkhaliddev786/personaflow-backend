import { Request, Response } from 'express';
import { Question } from '../models/question.model';

// GET all questions (optionally filter by chatbotId)
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const { chatbotId } = req.query;
    const filter = chatbotId ? { chatbotId } : {};
    const questions = await Question.find(filter);
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch questions', error });
  }
};

// GET a single question by ID
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch question', error });
  }
};

// CREATE a new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = new Question(req.body);
    const savedQuestion = await question.save();
    res.status(201).json({ success: true, data: savedQuestion });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create question', error });
  }
};

// UPDATE a question
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update question', error });
  }
};

// DELETE a question
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete question', error });
  }
};
