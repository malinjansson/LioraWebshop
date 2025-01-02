import { Product } from "../../models/Product";
import { addToCart } from "./addToCart";


export const ProductDetails = (product: Product) => {
  const productPageListContainer: HTMLElement | null = document.getElementById("productpage-list") as HTMLDivElement;
  const productDetailContainer: HTMLElement | null = document.getElementById("product-detail-page") as HTMLDivElement;
  const posterHeading: HTMLElement | null = document.getElementById("product-page") as HTMLDivElement;
  posterHeading.style.display = "none";
  productPageListContainer.style.display = "none"; // Hide product listing
  productDetailContainer.style.display = "flex"; // Show product detail

const productImageContainer = document.createElement ("section");
productImageContainer.classList.add("product-image-container");

const image = document.createElement("img");
image.src = product.imageUrl;
image.alt = product.title;
image.classList.add("product-image-dp");
productImageContainer.appendChild(image);

const infoContainer = document.createElement ("section");
infoContainer.classList.add("info-contatiner")

const productTitle = document.createElement("h3");
productTitle.innerHTML = product.title;
productTitle.classList.add("product-title");

const choosenPrice = document.createElement("p");
choosenPrice.innerHTML = `$${product.sizes[0].price.toFixed(2)}`;
choosenPrice.classList.add("product-price");

const selectSize = document.createElement ("p");
selectSize.innerHTML = "Select size";
selectSize.classList.add("select-size");

const productStatus: HTMLElement | null = document.getElementById("product-status") as HTMLDivElement;
if (product.inStock) {
  productStatus.innerHTML = "In stock";
}
else {
  productStatus.innerHTML = "Out of stock";
};

const addToBagContainer = document.createElement("section");
addToBagContainer.classList.add ("add-to-bag-container");
const addToBagBtn: HTMLElement | null = document.getElementById("add-to-bag") as HTMLButtonElement;
addToBagBtn.innerHTML = "Add to Bag";
addToBagContainer.appendChild(addToBagBtn);

addToBagContainer.addEventListener("click", () => {
  addToCart(product); 
});

// heading - description
const headingDescription = document.createElement ("h4");
headingDescription.classList.add("product-description-heading")
headingDescription.innerHTML = "Description";

// description 
const productDescription = document.createElement ("p");
productDescription.innerHTML = product.description;
productDescription.classList.add("product-description");

infoContainer.appendChild(productTitle);
infoContainer.appendChild(choosenPrice);
infoContainer.appendChild(selectSize);
infoContainer.appendChild(productStatus);
infoContainer.appendChild(addToBagContainer);
infoContainer.appendChild(headingDescription);
infoContainer.appendChild(productDescription);

productDetailContainer.appendChild(productImageContainer);
productDetailContainer.appendChild(infoContainer); 
};