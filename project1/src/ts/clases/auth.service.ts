import type {
  LoginResponse,
  LoginData,
  RegisterData,
  User,
} from "../interfaces/user-interface.ts";
import { Http } from "../http.class.ts";
import { SERVER } from "../constants.ts";

export class ServicioAutorizacion {
  #http: Http;

  constructor() {
    this.#http = new Http();
  }

  async Login(data: LoginData): Promise<void> {
    const respuesta = await this.#http.post<LoginResponse, LoginData>(
      SERVER + "/auth/login",
      data
    );

    localStorage.setItem("token", respuesta.accessToken);
  }

  async Register(data: RegisterData): Promise<User> {
    const response = await this.#http.post<User, RegisterData>(
      SERVER + "/auth/register",
      data
    );
    return response;
  }

  comprobarToken(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
}
