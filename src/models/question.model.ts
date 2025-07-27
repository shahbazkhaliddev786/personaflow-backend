import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  chatbotId: 'chatbot1' | 'chatbot2' | 'chatbot3';
  questionId: string;
  text: string;
  type: 'text' | 'number' | 'multiple-choice' | 'boolean';
  options: string[];
  createdAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  chatbotId: {
    type: String,
    required: [true, 'Chatbot ID is required'],
    enum: ['chatbot1', 'chatbot2', 'chatbot3'],
  },
  questionId: {
    type: String,
    required: [true, 'Question ID is required'],
    match: [/^q[1-6]$/, 'Question ID must be q1 to q6'],
  },
  text: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['text', 'number', 'multiple-choice', 'boolean'],
    default: 'text',
  },
  options: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Question = mongoose.model<IQuestion>('Question', questionSchema); 