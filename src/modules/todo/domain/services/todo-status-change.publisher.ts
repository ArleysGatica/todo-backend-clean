import { TodoStatus } from '../entities/todo.entity';

export interface TodoStatusChangeEvent {
  todoId: string;
  previousStatus: TodoStatus;
  newStatus: TodoStatus;
  title: string;
  timestamp: string;
}

export interface TodoStatusChangePublisher {
  publish(event: TodoStatusChangeEvent): Promise<void>;
}
