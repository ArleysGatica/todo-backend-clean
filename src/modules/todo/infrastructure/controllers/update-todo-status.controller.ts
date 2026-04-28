import { injectable, inject } from 'tsyringe';
import { Request } from 'express';
import { TodoStatus } from '../../domain/entities/todo.entity';
import { UpdateTodoStatusUseCase } from '../../application/use-cases/update-todo-status.usecase';

const VALID_STATUSES: TodoStatus[] = [
  'PENDING',
  'COMPLETED',
  'IN_PROGRESS',
  'CANCELLED',
  'ON_HOLD',
  'CREATED',
];

@injectable()
export class UpdateTodoStatusController {
  constructor(
    @inject(UpdateTodoStatusUseCase)
    private useCase: UpdateTodoStatusUseCase,
  ) {}

  async execute(req: Request) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id as string);
    const { status } = req.body as { status?: string };

    if (!status || !VALID_STATUSES.includes(status as TodoStatus)) {
      return {
        statusCode: 400,
        data: {
          error: `Estado inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}`,
        },
      };
    }

    const todo = await this.useCase.execute(id, {
      status: status as TodoStatus,
    });

    return {
      statusCode: 200,
      data: {
        message: 'Estado actualizado. El proceso continúa en segundo plano.',
        todo,
      },
    };
  }
}
