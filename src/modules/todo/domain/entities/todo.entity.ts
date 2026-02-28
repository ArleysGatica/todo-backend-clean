export type TodoStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'CANCELLED'
  | 'ON_HOLD'
  | 'CREATED';

export class Todo {
  constructor(
    public id: string,
    public title: string,
    public completed: TodoStatus,
    public createdAt: Date,
    public description: string,
  ) {}
}
