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
  name: string;
  email: string;
}

export interface UserPassword {
  password: string;
}

export interface UserAvatar {
  avatar: string;
}
