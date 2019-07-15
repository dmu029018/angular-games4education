export class Game {

  id: string;
  name: string;

  constructor() {}

  private generateId() {
    const timestamp = (new Date().getTime() / 1000).toString(16);
    this.id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
      (Math.random() * 16).toString(16)
    ).toLowerCase();
  }

}
