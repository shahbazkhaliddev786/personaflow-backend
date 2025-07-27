import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  chatbots: {
    chatbot1: Array<{
      questionId: string;
      answer: string;
    }>;
    chatbot2: Array<{
      questionId: string;
      answer: string;
    }>;
    chatbot3: Array<{
      questionId: string;
      answer: string;
    }>;
  };
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
  chatbots: {
    chatbot1: [
      {
        questionId: {
          type: String,
          required: [true, 'Question ID is required'],
          match: [/^q[1-6]$/, 'Question ID must be q1 to q6'],
        },
        answer: {
          type: String,
          required: [true, 'Answer is required'],
        },
      },
    ],
    chatbot2: [
      {
        questionId: {
          type: String,
          required: [true, 'Question ID is required'],
          match: [/^q[1-6]$/, 'Question ID must be q1 to q6'],
        },
        answer: {
          type: String,
          required: [true, 'Answer is required'],
        },
      },
    ],
    chatbot3: [
      {
        questionId: {
          type: String,
          required: [true, 'Question ID is required'],
          match: [/^q[1-6]$/, 'Question ID must be q1 to q6'],
        },
        answer: {
          type: String,
          required: [true, 'Answer is required'],
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema); 