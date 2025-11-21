import type { LoginData } from "./IloginData";

export interface RegisterData extends LoginData {
  username: string;
  confirmPassword: string;
  avatar: string;
}
