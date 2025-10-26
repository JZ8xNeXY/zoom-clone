export class User{
  id!:string;
  email!:string;
  password!:string;
  constructor(data:User){
    Object.assign(this,data);
  }
}

