export class LoginDto {
  username: string;
  password: string;

  constructor(data: { username: string; password: string }) {
    this.username = data.username;
    this.password = data.password;
  }
}
