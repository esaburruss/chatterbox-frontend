import { Conversation } from './conversation.model';
export class User {
  username: string;
  id: number;
  gender: string;
  firstName: string;
  lastName: string;
  conversation: Conversation;

  constructor(obj?: any){
    this.username = obj.username;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.id = obj.id;
    this.setGender(obj.gender);
    if(obj.conversation) {
      this.conversation = obj.conversation;
    } else {
      this.conversation = new Conversation();
    }
  }
  setGender(g: number): void {
    if(g == 1)
      this.gender = "Male";
    else if(g == 0)
      this.gender = "Female";
    else
      this.gender = undefined;
  }
}
