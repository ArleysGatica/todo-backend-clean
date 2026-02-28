import { container } from 'tsyringe';
import { TodoRepository } from './domain/repositories/todo.repository.interface';
import { TodoFirestoreRepository } from './infrastructure/repositories/todo.firestore.repository';
import { CreateTodoUseCase } from './application/use-cases/create-todo.usecase';
import { GetTodosUseCase } from './application/use-cases/get-todos.usecase';

container.register<TodoRepository>('TodoRepository', { useClass: TodoFirestoreRepository });

container.register('CreateTodoUseCase', { useClass: CreateTodoUseCase });
container.register('GetTodosUseCase', { useClass: GetTodosUseCase });
