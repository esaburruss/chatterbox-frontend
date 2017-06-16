export class User {
  username: string;
  id: number;
  gender: string;
  firstName: string;
  lastName: string;

  constructor(username: string, id: number, gender: number, firstName: string, lastName: string){
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    if(gender == 1)
      this.gender = "Male";
    else
      this.gender = "Female";
  }
}
