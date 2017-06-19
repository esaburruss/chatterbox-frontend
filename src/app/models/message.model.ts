export class Message {
  constructor(
    public from: number,
    public message: string,
    public time: number) {
  }
  getTime() {
    return new Date(this.time).toISOString().slice(11, 19);
  }
}
