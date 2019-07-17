import * as moment from 'moment';

export class User {

  id: string;
  nickname: string;
  email: string;
  password: string;
  admin = false;
  signUpDate: string;

  constructor(nickname: string, email: string, password: string, id?: string) {
    this.signUpDate = moment().format();
    if (!id) {
      this.generateId();
    }
    this.nickname = nickname;
    this.email = email;
    this.password = password;
  }

  generateId() {
    this.id = ((this.signUpDate as any) * (Math.random() + 1)) + '';
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

  getSignUpDate() {
    return this.signUpDate;
  }

  getPassword() {
    return this.password;
  }

  isAdmin() {
    return this.admin || false;
  }

  setId(id: string) {
    this.id = id;
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

  setSignUpDate(signUpDate: string) {
    this.signUpDate = signUpDate;
  }

  setAdmin(admin: boolean) {
    this.admin = admin;
  }
}


