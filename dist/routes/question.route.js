"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_controller_1 = require("../controllers/questions.controller");
const router = express_1.default.Router();
// @route   POST /api/questions
router.post('/', questions_controller_1.createQuestion);
// @route   GET /api/questions
router.get('/', questions_controller_1.getAllQuestions);
// @route   GET /api/questions/:id
router.get('/:id', questions_controller_1.getQuestionById);
// @route   PUT /api/questions/:id
router.patch('/:id', questions_controller_1.updateQuestion);
// @route   DELETE /api/questions/:id
router.delete('/:id', questions_controller_1.deleteQuestion);
exports.default = router;
