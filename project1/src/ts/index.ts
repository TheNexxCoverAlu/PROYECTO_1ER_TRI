// import type { PropertiesService } from "./clases/properties.service.ts";
import { ProvincesService } from "./clases/provinces.service.ts";
import type { Province } from "./interfaces/property-interface.ts";
import type { Property } from "./interfaces/property-interface.ts";
import { ServicioAutorizacion } from "./clases/auth.service.ts";
import { PropertiesService } from "./clases/properties.service.ts";

let pagActual: number = 1;
let filtroActual: string = "";
let provinceId: number = 0;

const loginLink = document.getElementById("login-link") as HTMLAnchorElement;
const logoutLink = document.getElementById("logout-link") as HTMLAnchorElement;
const profileLink = document.getElementById("profile-link") as HTMLAnchorElement;
const newPropertyLink = document.getElementById("new-property-link") as HTMLAnchorElement;
const provinceSelect = document.getElementById("province-filter") as HTMLSelectElement;
const cardTemplate = document.getElementById("property-card-template") as HTMLTemplateElement;
const propertyListings = document.getElementById("property-listings") as HTMLElement;
const searchForm = document.getElementById("search-form") as HTMLFormElement;
const loadMoreBtn = document.getElementById("load-more-btn") as HTMLButtonElement;

const authService = new ServicioAutorizacion();
const provincesService = new ProvincesService();
const propertiesService = new PropertiesService();

if (authService.comprobarToken()) {
  loginLink.classList.add("hidden");
  logoutLink.classList.remove("hidden");
  profileLink.classList.remove("hidden");
  newPropertyLink.classList.remove("hidden");

  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.assign("login.html");
  });
} else {
  loginLink.classList.remove("hidden");
  logoutLink.classList.add("hidden");
  profileLink.classList.add("hidden");
  newPropertyLink.classList.add("hidden");
}

async function mostrarProvincias(): Promise<void> {
  const provinces = await provincesService.getProvinces();

  provinces.forEach((province: Province) => {
    const option = document.createElement("option");
    option.value = province.id.toString();
    option.textContent = province.name;
    provinceSelect.appendChild(option);
  });
}
mostrarProvincias().catch(console.error);

function createAndAppendCard(property: Property): void {
  const content = cardTemplate.content.cloneNode(true) as DocumentFragment;
  const cardRoot = content.firstElementChild as HTMLElement;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    currency: "EUR",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(property.price);
  const titleLink = cardRoot.querySelector(
    ".property-title"
  ) as HTMLAnchorElement;

  titleLink.textContent = property.title;
  titleLink.href = `property-detail.html?id=${property.id}`;

  const img = cardRoot.querySelector(".property-image") as HTMLImageElement;
  img.src = property.mainPhoto;
  const imgLink = img.closest("a") as HTMLAnchorElement;
  if (imgLink) imgLink.href = `property-detail.html?id=${property.id}`;

  const locationElement = cardRoot.querySelector(
    ".property-location"
  ) as HTMLElement;
  const provinceName =
    typeof property.town.province === "object"
      ? property.town.province.name
      : "";
  locationElement.textContent = `${property.address}, ${property.town.name}, ${provinceName}`;

  cardRoot.querySelector(".property-price")!.textContent = formattedPrice;
  cardRoot.querySelector(".property-sqmeters")!.textContent =
    `${property.sqmeters} sqm`;
  cardRoot.querySelector(".property-rooms")!.textContent =
    `${property.numRooms} beds`;
  cardRoot.querySelector(".property-baths")!.textContent =
    `${property.numBaths} baths`;

  const deleteBtn = cardRoot.querySelector(".btn-delete") as HTMLButtonElement;

  if (property.mine) {
    deleteBtn.addEventListener("click", async () => {
      if (confirm("¿Quieres borrar la propiedad?")) {
        try {
          await propertiesService.deleteProperty(property.id);
          cardRoot.remove();
        } catch (error) {
          console.error(error);
          alert("No se puede borar la propiedad");
        }
      }
    });
  } else {
    deleteBtn.remove();
  }
  propertyListings.appendChild(cardRoot);
}

async function cargarPropiedades(borrar: boolean = false): Promise<void> {
  const params = new URLSearchParams();
  params.append("page", pagActual.toString());

  if (filtroActual) {
    params.append("search", filtroActual);
  }

  if (provinceId !== 0) {
    params.append("province", provinceId.toString());
  }

  try {
    const response = await propertiesService.getProperties(params);

    if (borrar) {
      propertyListings.replaceChildren();
    }

    response.properties.forEach((prop: Property) => {
      createAndAppendCard(prop);
    });

    const loadMoreBtn = document.getElementById(
      "load-more-btn"
    ) as HTMLButtonElement;
    if (response.more) {
      loadMoreBtn.classList.remove("hidden");
    } else {
      loadMoreBtn.classList.add("hidden");
    }
  } catch (error) {
    console.error(error);
  }
}

searchForm.addEventListener("submit", e => {
  e.preventDefault();

  filtroActual = (document.getElementById("search-text") as HTMLInputElement)
    .value;
  provinceId = Number(provinceSelect.value);
  pagActual = 1;

  cargarPropiedades(true).catch(console.error);
});

loadMoreBtn.addEventListener("click", () => {
  pagActual++;
  cargarPropiedades(false).catch(console.error);
});

cargarPropiedades(true).catch(console.error);
