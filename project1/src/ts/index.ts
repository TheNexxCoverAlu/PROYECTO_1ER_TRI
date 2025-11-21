import type { PropertiesService } from "./properties.service.ts";

const propertiesService = new PropertiesService();
const propertyListings = document.getElementById("property-listings");
const cardTemplate = document.getElementById("proped-template");

function createAndAppendCard(propertyData) {
  const cardClone = cardTemplate.content.cloneNode(true).firstElementChild;

  const formattedPrice = Intl.NumberFormat("en-US", {
    currency: "EUR",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(propertyData.price);

  cardClone.querySelector(".property-title").append(propertyData.title);
  cardClone
    .querySelector(".property-location")
    .append(
      `${propertyData.address}, ${propertyData.town.name}, ${propertyData.town.province.name}`
    );
  cardClone.querySelector(".property-price").append(formattedPrice);
  cardClone
    .querySelector(".property-sqmeters")
    .append(`${propertyData.sqmeters} sqm`);
  cardClone
    .querySelector(".property-rooms")
    .append(`${propertyData.numRooms} beds`);
  cardClone
    .querySelector(".property-baths")
    .append(`${propertyData.numBaths} baths`);
  cardClone.querySelector(".property-image").src = propertyData.mainPhoto;

  cardClone.querySelector(".btn-delete").addEventListener("click", async () => {
    try {
      await propertiesService.deleteProperty(propertyData.id);
      cardClone.remove();
    } catch (error) {
      console.error("Error al borrar la propiedad:", error);
      alert("No se pudo borrar la propiedad. Inténtalo de nuevo.");
    }
  });

  propertyListings.append(cardClone);
}

async function mostrarProperties() {
  try {
    const properties = await propertiesService.getProperties();
    properties.forEach(property => {
      createAndAppendCard(property);
    });
  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
  }
}
mostrarProperties();
