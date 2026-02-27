import { Router } from 'express';
import { createUserHandler } from './handlers/create-user.handler';

const router = Router();
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       500:
 *         description: Internal server error
 */

//http://localhost:3000/docs/#/Users/post_api_users_register
router.post('/register', createUserHandler);
export default router;
