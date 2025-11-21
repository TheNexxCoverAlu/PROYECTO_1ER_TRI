import { ProvincesService } from "./provinces.service.js";
import { PropertiesService } from "./properties.service.js";

const provincesServices = new ProvincesService();
const propertiesServices = new PropertiesService();

const provincesSelect = document.getElementById("province");
const townsSelect = document.getElementById("town");
const mainPhotoInput = document.getElementById("mainPhoto");
const imagePreview = document.getElementById("image-preview");
const formulario = document.getElementById("property-form");

async function anadirProvincias() {
  const provincias = await provincesServices.getProvinces();
  provincias.forEach(element => {
    let option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.name;
    provincesSelect.appendChild(option);
  });
}
anadirProvincias();

async function anadirCiudades(id) {
  townsSelect.textContent = "";
  const ciudades = await provincesServices.getTown(id);

  ciudades.forEach(element => {
    let option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.name;
    townsSelect.appendChild(option);
  });
}

provincesSelect.addEventListener("change", () => {
  const valor = provincesSelect.value;
  anadirCiudades(valor);
});

mainPhotoInput.addEventListener("change", () => {
  const file = mainPhotoInput.files[0];
  imagePreview.src = "";
  imagePreview.classList.add("hidden");

  if (file) {
    if (!file.type.startsWith("image")) {
      mainPhotoInput.setCustomValidity("File must be an image");
    } else if (file.size > 200000) {
      mainPhotoInput.setCustomValidity(
        "You can't add an image larger than 200KB"
      );
    } else {
      mainPhotoInput.setCustomValidity("");

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        imagePreview.src = reader.result;
        imagePreview.classList.remove("hidden");
      });
    }
    mainPhotoInput.reportValidity();
  }
});

const province = document.getElementById("province");
const town = document.getElementById("town");
const direccion = document.getElementById("address");
const title = document.getElementById("title");
const description = document.getElementById("description");
const sqmeters = document.getElementById("sqmeters");
const numRooms = document.getElementById("numRooms");
const numBaths = document.getElementById("numBaths");
const price = document.getElementById("price");

formulario.addEventListener("submit", async event => {
  event.preventDefault();

  try {
    const newProperty = {
      address: direccion.value,
      title: title.value,
      description: description.value,
      sqmeters: Number(sqmeters.value),
      numRooms: Number(numRooms.value),
      numBaths: Number(numBaths.value),
      price: Number(price.value),
      mainPhoto: imagePreview.src,
      townId: Number(town.value),
    };

    await propertiesServices.insertProperty(newProperty);
    location.assign("index.html");
  } catch (error) {
    console.error("Error al guardar la propiedad:", error);
  }
});

/*
"properties": [
    {
      "id": 15,
      "address": "Address",
      "title": "Titulo",
      "description": "Desc",
      "sqmeters": 2,
      "numRooms": 2,
      "numBaths": 2,
      "price": 2,
      "mainPhoto": "http://localhost:3000/img/properties/1762708836945.jpg",
      "createdAt": "2025-11-09T17:20:36.947Z",
      "status": "selling",
      "town": {
        "id": 1030036,
        "name": "Agres",
        "longitude": -0.51595543,
        "latitude": 38.78000404,
        "province": {
          "id": 3,
          "name": "Alacant/Alicante"
        }
      }
    }

*/
