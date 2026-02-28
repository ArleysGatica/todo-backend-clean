import { container } from 'tsyringe';
import { expressAdapter } from '../../../../shared/infrastructure/http/express.adapter';
import { CreateTodoController } from '../../../infrastructure/controllers/create-todo.controller';

export const createTodoHandler = expressAdapter(container.resolve(CreateTodoController));
