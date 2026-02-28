import { Todo } from '../entities/todo.entity';

export interface TodoRepository {
  save(todo: Todo): Promise<void>;
  findAll(): Promise<Todo[]>;
}
