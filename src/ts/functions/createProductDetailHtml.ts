import { Product } from "../../models/Product";


export const ProductDetails = (product: Product) => {
  const productPageListContainer: HTMLElement | null = document.getElementById("productpage-list") as HTMLDivElement;
  const productDetailContainer: HTMLElement | null = document.getElementById("product-detail-page") as HTMLDivElement;
  const posterHeading: HTMLElement | null = document.getElementById("product-page") as HTMLDivElement;
  posterHeading.style.display = "none";
  productPageListContainer.style.display = "none"; // Hide product listing
  productDetailContainer.style.display = "flex"; // Show product detail

const productImageContainer = document.createElement ("section");
productImageContainer.classList.add("product-image-container");

// image container 
const image = document.createElement("img");
image.src = product.imageUrl;
image.alt = product.title;
image.classList.add("product-image-dp");
productImageContainer.appendChild(image);

const infoContainer = document.createElement ("section");
infoContainer.classList.add("info-contatiner")

// product title 
const productTitle = document.createElement("h3");
productTitle.innerHTML = product.title;
productTitle.classList.add("product-title");
infoContainer.appendChild(productTitle);

// product price
const choosenPrice = document.createElement("p");
choosenPrice.innerHTML = `$${product.sizes[0].price.toFixed(2)}`;
choosenPrice.classList.add("product-price");
infoContainer.appendChild(choosenPrice);

//size heading 
const selectSize = document.createElement ("p");
selectSize.innerHTML = "Select size";
selectSize.classList.add("select-size");
infoContainer.appendChild(selectSize);

// product status 
const productStatus: HTMLElement | null = document.getElementById("product-status") as HTMLDivElement;
if (product.inStock) {
  productStatus.innerHTML = "In stock";
}
else {
  productStatus.innerHTML = "Out of stock";
}
infoContainer.appendChild(productStatus);


//add to bag 
const addToBagContainer = document.createElement("section");
addToBagContainer.classList.add ("add-to-bag-container");
const addToBagBtn: HTMLElement | null = document.getElementById("add-to-bag") as HTMLButtonElement;
addToBagBtn.innerHTML = "Add to Bag";
addToBagContainer.appendChild(addToBagBtn);
infoContainer.appendChild(addToBagContainer);

// heading - description
const headingDescription = document.createElement ("h4");
headingDescription.innerHTML = "Description";
infoContainer.appendChild(headingDescription);

// description 
const productDescription = document.createElement ("p");
productDescription.innerHTML = product.description;
productDescription.classList.add("product-description");
infoContainer.appendChild(productDescription);

productDetailContainer.appendChild(productImageContainer);
productDetailContainer.appendChild(infoContainer); 
};