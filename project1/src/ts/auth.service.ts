import type{LoginResponse, LoginData} from "./../interfaces/IloginData";
import{Http} from "./http.class";
import{SERVER} from "./constants";

export class ServicioAutorizacion {
    #http : Http;

    constructor() {
        this.#http = new Http();
    }

    async login( data : LoginData ) : Promise<void> {
        const respuesta = 
            await this.#http.post<LoginResponse, LoginData>(SERVER+"/auth/login", data);
        
        localStorage.setItem("token", respuesta.token);
    }

    estaLogueado() : boolean {
        if(localStorage.getItem("token")) {
            return true;
        }
        else {
            return false;
        }
    }

}