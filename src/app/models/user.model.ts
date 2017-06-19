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
    if(obj.gender == 1)
      this.gender = "Male";
    else
      this.gender = "Female";
    this.conversation = obj.conversation;
  }
}
