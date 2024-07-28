import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
<<<<<<< HEAD
    origin: "http://localhost:5173",
=======
    origin: 'http://localhost:3000',
>>>>>>> origin/main
    credentials: true,
  })
);

<<<<<<< HEAD
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", tasksRoutes );
=======
// Use the task routes
app.use('/api/tasks', taskRoutes);

// Use the user routes
app.use('/api/users', userRoutes);
>>>>>>> origin/main

mongoose
  .connect(`${process.env.MONGODB_URL}/taskAppDB`)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });


  app.use(notFound);
  app.use(errorHandler);
