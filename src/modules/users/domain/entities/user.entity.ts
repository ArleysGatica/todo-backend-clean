export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public name: string,
    public createdAt: Date,
  ) {}

  validatePassword(password: string): boolean {
    return this.password === password;
  }
}
