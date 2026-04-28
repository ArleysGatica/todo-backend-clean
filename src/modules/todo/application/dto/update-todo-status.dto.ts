import { TodoStatus } from '../../domain/entities/todo.entity';

export interface UpdateTodoStatusDTO {
  status: TodoStatus;
}
