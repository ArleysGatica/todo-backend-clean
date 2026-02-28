import { injectable, inject } from 'tsyringe';
import { TodoRepository } from '../../domain/repositories/todo.repository.interface';

@injectable()
export class GetTodosUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: TodoRepository,
  ) {}

  async execute() {
    return await this.todoRepository.findAll();
  }
}
