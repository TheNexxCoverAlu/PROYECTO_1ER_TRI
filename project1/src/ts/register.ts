import type { RegisterData } from "./interfaces/user-interface.ts";
import { ServicioAutorizacion } from "./clases/auth.service.ts";

const authService = new ServicioAutorizacion();
const formulario = document.getElementById("register-form") as HTMLFormElement;
const nombre = document.getElementById("name") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password1 = document.getElementById("password") as HTMLInputElement;
const password2 = document.getElementById(
  "password-confirm"
) as HTMLInputElement;
const avatar = document.getElementById("avatar") as HTMLInputElement;
const avatarPreview = document.getElementById(
  "avatar-preview"
) as HTMLImageElement;

avatar.addEventListener("change", () => {
  if (avatar.files && avatar.files.length > 0) {
    const file = avatar.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      avatarPreview.src = reader.result as string;
      avatarPreview.classList.remove("hidden");
    });

    reader.readAsDataURL(file);
  }
});

function comprobarPasswords() {
  if (password1.value !== password2.value) {
    password2.setCustomValidity("Las contraseñas no coinciden");
  } else {
    password2.setCustomValidity("");
  }
}

const passwords: HTMLInputElement[] = [password1, password2];
for (let i = 0; i < passwords.length; i++) {
  passwords[i].addEventListener("input", comprobarPasswords);
}

formulario.addEventListener("submit", async e => {
  e.preventDefault();

  const newUser: RegisterData = {
    name: nombre.value,
    email: email.value,
    password: password1.value,
    avatar: avatarPreview.src,
  };

  try {
    await authService.Register(newUser);
    location.assign("login.html");
  } catch (error) {
    console.error(error);
    alert("Error registering user");
  }
});
