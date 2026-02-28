import { injectable, inject } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository.interface';
import { CreateTodoDTO } from '../dto/create-todo.dto';

@injectable()
export class CreateTodoUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: TodoRepository,
  ) {}

  async execute(data: CreateTodoDTO) {
    const todo = new Todo(uuid(), data.title, 'CREATED', new Date(), data.description);
    await this.todoRepository.save(todo);
    return todo;
  }
}
