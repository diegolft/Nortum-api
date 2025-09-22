export class CreateUserDto {
  email: string;
  name: string;
  username: string;
  password: string;

  constructor(data: { email: string; name: string; username: string; password: string }) {
    this.email = data.email;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
  }
}
