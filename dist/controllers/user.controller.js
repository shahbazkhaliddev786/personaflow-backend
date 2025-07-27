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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.updateChatbotAnswers = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const newUser = yield user_model_1.User.create({ name, email, password });
        const userId = newUser._id;
        const token = (0, jwt_1.createToken)(userId);
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err });
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                chatbots: user.chatbots,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.loginUser = loginUser;
// Get All Users
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find();
        res.status(200).json({ users });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err });
    }
});
exports.getAllUsers = getAllUsers;
// Get Single User
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err });
    }
});
exports.getUserById = getUserById;
// Update Chatbot Answers
const updateChatbotAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, chatbotName } = req.params;
    const { answers } = req.body;
    try {
        const user = yield user_model_1.User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (!['chatbot1', 'chatbot2', 'chatbot3'].includes(chatbotName)) {
            return res.status(400).json({ message: 'Invalid chatbot name' });
        }
        user.chatbots[chatbotName] = answers;
        yield user.save();
        res.status(200).json({ message: 'Chatbot answers updated', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err });
    }
});
exports.updateChatbotAnswers = updateChatbotAnswers;
// Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        console.log('Update User:', { id, name, email, password });
        const user = yield user_model_1.User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (password)
            user.password = password; // Will be hashed due to pre-save hook
        yield user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err });
    }
});
exports.updateUser = updateUser;
// Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.User.findByIdAndDelete(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', error: err });
    }
});
exports.deleteUser = deleteUser;
