import { injectable, inject } from 'tsyringe';
import { Request } from 'express';
import { GetTodosUseCase } from '../../application/use-cases/get-todos.usecase';

@injectable()
export class GetTodosController {
  constructor(
    @inject(GetTodosUseCase)
    private useCase: GetTodosUseCase,
  ) {}

  async execute(_req: Request) {
    const todos = await this.useCase.execute();

    return {
      statusCode: 200,
      data: todos,
    };
  }
}
