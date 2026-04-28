import { Router } from 'express';
import { createTodoHandler } from './handlers/create-todo.handler';
import { getTodosHandler } from './handlers/get-todos.handler';
import { updateTodoStatusHandler } from './handlers/update-todo-status.handler';

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

/**
 * @swagger
 * /api/todos/{id}/status:
 *   patch:
 *     summary: Actualizar estado de un todo (procesa en segundo plano vía Pub/Sub)
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, IN_PROGRESS, CANCELLED, ON_HOLD, CREATED]
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       404:
 *         description: Todo no encontrado
 *       500:
 *         description: Internal server error
 */
TodoRouter.patch('/:id/status', updateTodoStatusHandler);

export default TodoRouter;
