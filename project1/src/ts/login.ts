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

        const emailInput = formulario.email as unknown as HTMLInputElement; // O usando getElementById
        const passwordInput = formulario.password as unknown as HTMLInputElement;

        const loginData: LoginData = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        try {
            // Intentamos loguearnos
            await autorizacion.login(loginData);
            
            // Si llega aquí, es que todo fue bien (status 200). Redirigimos [cite: 117]
            location.assign("index.html");

        } catch (error) {
            // Si falla (contraseña mal), el catch captura el error 
            console.error(error);
            alert("Error: Email o contraseña incorrectos"); // Mostrar error al usuario [cite: 118]
        }
    });
}