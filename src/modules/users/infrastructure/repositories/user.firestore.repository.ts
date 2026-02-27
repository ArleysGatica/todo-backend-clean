import { db } from '../../../../config/firebase.config';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';

export class UserFirestoreRepository implements UserRepository {
  private collection = db.collection('users');

  async save(user: User): Promise<void> {
    await this.collection.doc(user.id).set({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt.toISOString(),
    });
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    return new User(data.id, data.email, data.name, data.password, new Date(data.createdAt));
  }
}
