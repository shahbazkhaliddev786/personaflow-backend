import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import questionRoutes from "./routes/question.route";
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err });
});

export default app;
