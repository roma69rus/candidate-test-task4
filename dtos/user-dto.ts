import { User } from "../models/user-model";

export class UserDto {
  id!: string;

  constructor(model: User){
    this.id = model.id
  }
}