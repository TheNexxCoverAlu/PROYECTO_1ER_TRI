
export interface User extends Omit<RegisterData, "confirmPassword"> {
  ejemplo: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  avatar: string;
}

export interface User extends Omit<RegisterData, "Password"> {
  id: number;
}

export interface LoginResponse {
  accessToken: string;
}

export interface UserProfile {
  nombre: string;
  email: string;
}

export interface UserPassword {
  newPassword: string;
}

export interface UserAvatar {
  avatar: string;
}
