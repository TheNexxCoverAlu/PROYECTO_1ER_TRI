import { MapService } from "./clases/map.service";
import { PropertiesService } from "./clases/properties.service";
import { ServicioAutorizacion } from "./clases/auth.service";

const titleElement = document.getElementById("property-title") as HTMLElement;
const addressElement = document.getElementById("property-address") as HTMLElement;
const imageElement = document.getElementById("property-image") as HTMLImageElement;
const descriptionElement = document.getElementById("property-description") as HTMLElement;
const priceElement = document.getElementById("property-price") as HTMLElement;
const sqmetersElement = document.getElementById("property-sqmeters") as HTMLElement;
const roomsElement = document.getElementById("property-rooms") as HTMLElement;
const bathsElement = document.getElementById("property-baths") as HTMLElement;
const sellerPhoto = document.getElementById("seller-photo") as HTMLImageElement;
const sellerName = document.getElementById("seller-name") as HTMLAnchorElement;
const sellerEmail = document.getElementById("seller-email") as HTMLElement;
const mortgageForm = document.getElementById("mortgage-calculator") as HTMLFormElement;
const mortgageResult = document.getElementById("mortgage-result") as HTMLDivElement;
const monthlyPaymentElement = document.getElementById("monthly-payment") as HTMLElement;
const calcPriceInput = mortgageForm.querySelector("#property-price") as HTMLInputElement; 
const downPaymentInput = document.getElementById("down-payment") as HTMLInputElement;
const loanTermInput = document.getElementById("loan-term") as HTMLInputElement;
const interestRateInput = document.getElementById("interest-rate") as HTMLInputElement;
const loginLink = document.getElementById("login-link") as HTMLAnchorElement;
const logoutLink = document.getElementById("logout-link") as HTMLAnchorElement;
const profileLink = document.getElementById("profile-link") as HTMLAnchorElement;
const newPropertyLink = document.getElementById("new-property-link") as HTMLAnchorElement;

const propertiesService = new PropertiesService();
const authService = new ServicioAutorizacion();

if(authService.comprobarToken()) {
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

async function cargarDetalle() {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));

  if (!id || isNaN(id)) {
    location.assign("index.html");
    return;
  }

  try {
    const property = await propertiesService.getPropertyById(id);

    titleElement.textContent = property.title || "Sin título";
    descriptionElement.textContent = property.description || "Sin descripción";
    imageElement.src = property.mainPhoto || "img/placeholder.jpg";

    const price = property.price || 0;
    const formattedPrice = new Intl.NumberFormat("en-US", {
      currency: "EUR", style: "currency", maximumFractionDigits: 0
    }).format(price);
    priceElement.textContent = formattedPrice;

    const townName = property.town?.name || "Ubicación desconocida";
    let provinceName = "";
    if (property.town && typeof property.town.province === 'object') {
        provinceName = property.town.province.name;
    }
    addressElement.textContent = `${property.address}, ${townName}, ${provinceName}`;

    sqmetersElement.textContent = (property.sqmeters || 0).toString();
    roomsElement.textContent = (property.numRooms || 0).toString();
    bathsElement.textContent = (property.numBaths || 0).toString();

    if (property.seller) {
        sellerName.textContent = property.seller.name || "Unknown"; 
        sellerEmail.textContent = property.seller.email || ""; 
        sellerPhoto.src = property.seller.avatar || "img/default-avatar.png";
        
        sellerName.href = `profile.html?id=${property.seller.id}`;
        const photoLink = sellerPhoto.closest("a") as HTMLAnchorElement;
        if(photoLink) photoLink.href = `profile.html?id=${property.seller.id}`;
    }

    calcPriceInput.value = price.toString();

    if (property.town && property.town.latitude && property.town.longitude) {
        const coords = {
          latitude : property.town.latitude,
          longitude: property.town.longitude
        };
        const map = new MapService(coords, "map");
        map.createMarker(coords);
    } 

  } catch (error) {
    console.error(error);
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    alert("No se pudo cargar la casa. Error: " + mensaje);
    location.assign("index.html");
  }
}

mortgageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const P = Number(calcPriceInput.value) - Number(downPaymentInput.value);
  const years = Number(loanTermInput.value);
  const annualInterest = Number(interestRateInput.value);
  
  const r = (annualInterest / 100) / 12;
  const n = years * 12;

  if (r === 0) { 
    const simplePayment = P / n;
    monthlyPaymentElement.textContent = simplePayment.toFixed(2) + " €";
  } else {
    const numerator = r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    const M = P * (numerator / denominator);
    
    monthlyPaymentElement.textContent = new Intl.NumberFormat("es-ES", {
        style: "currency", currency: "EUR"
    }).format(M);
  }

  mortgageResult.classList.remove("hidden");
});

cargarDetalle().catch(console.error);