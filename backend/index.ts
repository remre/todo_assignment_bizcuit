import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/users';
import taskRoutes from './src/routes/tasks';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.LOCAL_HOST || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export { app };
