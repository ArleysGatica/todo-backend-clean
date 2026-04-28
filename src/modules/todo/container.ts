import { container } from 'tsyringe';
import { TodoRepository } from './domain/repositories/todo.repository.interface';
import { TodoStatusChangePublisher } from './domain/services/todo-status-change.publisher';
import { TodoFirestoreRepository } from './infrastructure/repositories/todo.firestore.repository';
import { PubSubTodoStatusChangePublisher } from './infrastructure/pubsub/todo-status-change.publisher';
import { CreateTodoUseCase } from './application/use-cases/create-todo.usecase';
import { GetTodosUseCase } from './application/use-cases/get-todos.usecase';
import { UpdateTodoStatusUseCase } from './application/use-cases/update-todo-status.usecase';

container.register<TodoRepository>('TodoRepository', { useClass: TodoFirestoreRepository });
container.register<TodoStatusChangePublisher>('TodoStatusChangePublisher', {
  useClass: PubSubTodoStatusChangePublisher,
});

container.register('CreateTodoUseCase', { useClass: CreateTodoUseCase });
container.register('GetTodosUseCase', { useClass: GetTodosUseCase });
container.register(UpdateTodoStatusUseCase, { useClass: UpdateTodoStatusUseCase });
