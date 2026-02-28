import { Router } from 'express';
import { createTodoHandler } from './handlers/create-todo.handler';
import { getTodosHandler } from './handlers/get-todos.handler';

const TodoRouter = Router();

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Crear un todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo creado correctamente
 *       500:
 *         description: Internal server error
 */
TodoRouter.post('/', createTodoHandler);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Obtener todos
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: Todos obtenidos correctamente
 *       500:
 *         description: Internal server error
 */
TodoRouter.get('/', getTodosHandler);

export default TodoRouter;
