export class User {

  id: string;
  nickname: string;
  email: string;
  password: string;

  constructor(nickname: string, email: string, password: string) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
  }

  getId() {
    return this.id;
  }

  getNickname() {
    return this.nickname;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  setNickname(nickname: string) {
    this.nickname = nickname;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

}


