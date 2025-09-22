export class CreateUserDto {
  email: string;
  fullName: string;
  username: string;
  password: string;

  constructor(data: { email: string; fullName: string; username: string; password: string }) {
    this.email = data.email;
    this.fullName = data.fullName;
    this.username = data.username;
    this.password = data.password;
  }
}
