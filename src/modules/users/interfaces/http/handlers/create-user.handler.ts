import { container } from "tsyringe";
import { CreateUserController } from "../../../infrastructure/controllers/create-user.controller";
import { expressAdapter } from "../../../../shared/infrastructure/http/express.adapter";

export const createUserHandler = expressAdapter(
  container.resolve(CreateUserController)
);