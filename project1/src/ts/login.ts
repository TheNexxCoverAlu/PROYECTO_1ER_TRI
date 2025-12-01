import { ServicioAutorizacion } from "./auth.service";
import type { LoginData } from "./../interfaces/IloginData";

const autorizacion = new ServicioAutorizacion();
const formulario = document.getElementById("login-form") as HTMLFormElement;

if(autorizacion.estaLogueado()) {
    location.assign("index.html");
}
else {
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const emailInput = formulario.email as unknown as HTMLInputElement;
        const passwordInput = formulario.password as unknown as HTMLInputElement;

        const loginData: LoginData = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        try {
            await autorizacion.login(loginData);
            
            location.assign("index.html");

        } catch (error) {
            console.error(error);
            alert("Error: Email o contraseña incorrectos");
        }
    });
}