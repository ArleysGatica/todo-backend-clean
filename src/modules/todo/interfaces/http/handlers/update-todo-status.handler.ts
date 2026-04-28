import { container } from 'tsyringe';
import { expressAdapter } from '../../../../shared/infrastructure/http/express.adapter';
import { UpdateTodoStatusController } from '../../../infrastructure/controllers/update-todo-status.controller';

export const updateTodoStatusHandler = expressAdapter(
  container.resolve(UpdateTodoStatusController),
);
