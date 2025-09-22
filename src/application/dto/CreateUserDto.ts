export class CreateUserDto {
  email: string;
  name: string;
  password: string;

  constructor(data: { email: string; name: string; password: string }) {
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
  }
}
