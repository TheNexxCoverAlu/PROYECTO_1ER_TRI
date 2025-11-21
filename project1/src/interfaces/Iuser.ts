import type { RegisterData } from "./IregisterData";

export interface User extends Omit<RegisterData, "confirmPassword"> {
  ejemplo: string;
}
