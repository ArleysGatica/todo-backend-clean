import { injectable, inject } from 'tsyringe';
import { Request } from 'express';
import { CreateTodoUseCase } from '../../application/use-cases/create-todo.usecase';

@injectable()
export class CreateTodoController {
  constructor(
    @inject(CreateTodoUseCase)
    private useCase: CreateTodoUseCase,
  ) {}

  async execute(req: Request) {
    const todo = await this.useCase.execute(req.body);

    return {
      statusCode: 201,
      message: 'Todo created successfully',
      data: todo,
    };
  }
}
