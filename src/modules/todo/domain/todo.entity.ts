export type TodoStatus = "PENDING" | "COMPLETED" | "IN_PROGRESS" | "CANCELLED" | "ON_HOLD";

export class Todo {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public status: TodoStatus,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  complete() {
    this.status = "COMPLETED";
    this.updatedAt = new Date();
  }

  cancel() {
    this.status = "CANCELLED";
    this.updatedAt = new Date();
  }

  onHold() {
    this.status = "ON_HOLD";
    this.updatedAt = new Date();
  }

  inProgress() {
    this.status = "IN_PROGRESS";
    this.updatedAt = new Date();
  }

  pending() {
    this.status = "PENDING";
    this.updatedAt = new Date();
  }
}