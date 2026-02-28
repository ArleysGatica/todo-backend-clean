import { TodoStatus } from '../../domain/entities/todo.entity';

export interface CreateTodoDTO {
  title: string;
  description: string;
  status?: TodoStatus;
}
