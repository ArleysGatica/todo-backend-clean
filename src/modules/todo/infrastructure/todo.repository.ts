import {db} from "./firebase";
import {Todo} from "../domain/todo.entity";

export class TodoRepository {
  private collection = db.collection("todos");

  /**
   * Save a todo to the database
   * @param todo - The todo to save
   * @return void
   */
  async save(todo: Todo): Promise<void> {
    await this.collection.doc(todo.id).set({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    });
  }

  async findByUser(userId: string) {
    const snapshot = await this.collection.where("userId", "==", userId).get();

    return snapshot.docs.map((doc) => doc.data());
  }
}
