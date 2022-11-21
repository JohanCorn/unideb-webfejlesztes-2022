import {User} from "./user.interface";

export interface RegistrationResponse {
  user: User;
  access_token: string;
}
