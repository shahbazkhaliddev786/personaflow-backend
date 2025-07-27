"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getQuestionById = exports.getAllQuestions = void 0;
const question_model_1 = require("../models/question.model");
// GET all questions (optionally filter by chatbotId)
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatbotId } = req.query;
        const filter = chatbotId ? { chatbotId } : {};
        const questions = yield question_model_1.Question.find(filter);
        res.status(200).json({ success: true, data: questions });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch questions', error });
    }
});
exports.getAllQuestions = getAllQuestions;
// GET a single question by ID
const getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield question_model_1.Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.status(200).json({ success: true, data: question });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch question', error });
    }
});
exports.getQuestionById = getQuestionById;
// CREATE a new question
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = new question_model_1.Question(req.body);
        const savedQuestion = yield question.save();
        res.status(201).json({ success: true, data: savedQuestion });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create question', error });
    }
});
exports.createQuestion = createQuestion;
// UPDATE a question
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield question_model_1.Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update question', error });
    }
});
exports.updateQuestion = updateQuestion;
// DELETE a question
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield question_model_1.Question.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.status(200).json({ success: true, message: 'Question deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete question', error });
    }
});
exports.deleteQuestion = deleteQuestion;
