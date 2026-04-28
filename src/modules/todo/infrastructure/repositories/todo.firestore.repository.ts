import admin from 'firebase-admin';
import { db } from '../../../../config/firebase.config';
import { Todo, TodoStatus } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository.interface';

export class TodoFirestoreRepository implements TodoRepository {
  private collection = db.collection('todos');

  private docToTodo(doc: admin.firestore.DocumentSnapshot): Todo | null {
    const data = doc.data();
    if (!data) return null;
    return new Todo(
      data.id,
      data.title,
      (data.completed ?? data.status) as TodoStatus,
      new Date(data.createdAt),
      data.description ?? '',
    );
  }

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
    return snapshot.docs
      .map((doc) => this.docToTodo(doc as admin.firestore.DocumentSnapshot))
      .filter((t): t is Todo => t !== null);
  }

  async findById(id: string): Promise<Todo | null> {
    const doc = await this.collection.doc(id).get();
    return this.docToTodo(doc);
  }

  async update(todo: Todo): Promise<void> {
    await this.collection.doc(todo.id).update({
      title: todo.title,
      completed: todo.completed,
      description: todo.description,
    });
  }
}
