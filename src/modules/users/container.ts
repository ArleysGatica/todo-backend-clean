import { container } from "tsyringe";
import { UserRepository } from "./domain/repositories/user.repository.interface";
import { UserFirestoreRepository } from "./infrastructure/repositories/user.firestore.repository";
import { CreateUserUseCase } from "./application/use-cases/create-user.usecase";

container.register<UserRepository>(
  "UserRepository",
  { useClass: UserFirestoreRepository }
);

container.register("CreateUserUseCase", { useClass: CreateUserUseCase });