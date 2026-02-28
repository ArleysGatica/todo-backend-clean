import { injectable, inject } from 'tsyringe';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UserRepository } from '../../domain/repositories/user.repository.interface';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute(data: CreateUserDTO) {
    const user = new User(uuid(), data.email, data.name, data.password, new Date());
    await this.userRepository.save(user);
    return user;
  }
}
