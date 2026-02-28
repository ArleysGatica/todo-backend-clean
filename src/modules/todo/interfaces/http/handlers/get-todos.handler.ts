import { container } from 'tsyringe';
import { expressAdapter } from '../../../../shared/infrastructure/http/express.adapter';
import { GetTodosController } from '../../../infrastructure/controllers/get-todos.controller';

export const getTodosHandler = expressAdapter(container.resolve(GetTodosController));
