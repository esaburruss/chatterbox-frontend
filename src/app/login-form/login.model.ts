export class Login {
  id: string;
  username: string;
  password: string;
  //csrfmiddlewaretoken: string;
  cookie: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }
}
