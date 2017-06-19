import { User } from './user.model';
import { Message } from './message.model';
export class Conversation {
  public messages: Message[];
  constructor(messages?: Message[]) {
    if(messages) {
      this.messages = messages;
    } else {
      this.messages = [];
    }
  }
  addMessage(message: Message) {
    this.messages.push(message);
  }
}
