import { injectable, inject } from 'tsyringe';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository.interface';
import { UpdateTodoStatusDTO } from '../dto/update-todo-status.dto';
import { TodoStatusChangePublisher } from '../../domain/services/todo-status-change.publisher';

@injectable()
export class UpdateTodoStatusUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: TodoRepository,
    @inject('TodoStatusChangePublisher')
    private statusChangePublisher: TodoStatusChangePublisher,
  ) {}

  async execute(todoId: string, dto: UpdateTodoStatusDTO): Promise<Todo> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    const previousStatus = todo.completed;
    const updatedTodo = new Todo(todo.id, todo.title, dto.status, todo.createdAt, todo.description);

    await this.todoRepository.update(updatedTodo);

    await this.statusChangePublisher.publish({
      todoId: todo.id,
      previousStatus,
      newStatus: dto.status,
      title: todo.title,
      timestamp: new Date().toISOString(),
    });

    return updatedTodo;
  }
}
