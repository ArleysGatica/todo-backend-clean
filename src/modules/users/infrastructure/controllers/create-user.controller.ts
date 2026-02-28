import { injectable, inject } from 'tsyringe';
import { Request } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';

@injectable()
export class CreateUserController {
  constructor(
    @inject('CreateUserUseCase')
    private useCase: CreateUserUseCase,
  ) {}

  async execute(req: Request) {
    const user = await this.useCase.execute(req.body);

    try {
      return {
        statusCode: 201,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          error: error instanceof Error ? error.message : 'Internal server error',
        },
      };
    }
  }
}
