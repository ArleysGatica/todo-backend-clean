import 'reflect-metadata';
import './modules/users/container';
import './modules/todo/container';
import express from 'express';
import cors from 'cors';
import userRouter from './modules/users/interfaces/http/user.router';
import todoRouter from './modules/todo/interfaces/http/todo.router';
import { setupSwagger } from './swagger';

const app = express();
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

setupSwagger(app);
export default app;
