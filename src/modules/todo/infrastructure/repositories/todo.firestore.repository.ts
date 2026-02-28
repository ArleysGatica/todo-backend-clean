import { db } from '../../../../config/firebase.config';
import { Todo, TodoStatus } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository.interface';

export class TodoFirestoreRepository implements TodoRepository {
  private collection = db.collection('todos');

  async save(todo: Todo): Promise<void> {
    await this.collection.doc(todo.id).set({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      description: todo.description,
    });
  }

  async findAll(): Promise<Todo[]> {
    const snapshot = await this.collection.get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Todo(
        data.id,
        data.title,
        data.status as TodoStatus,
        new Date(data.createdAt),
        data.description,
      );
    });
  }
}
