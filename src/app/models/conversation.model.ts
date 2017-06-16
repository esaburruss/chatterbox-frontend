import { User } from './user.model';
import { Message } from './message.model';
export class Conversation {
  public messages: Message[];
  constructor(public user: User) {
  }
  addMessage(message: Message) {
    this.messages.push(message);
  }
}
