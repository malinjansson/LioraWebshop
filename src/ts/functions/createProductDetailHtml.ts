import { Product } from "../../models/Product";
import { addToCart } from "./createCartHtml";
import { createNotifyModalHtml } from "./createNotifyMeHtml";
 
 
export const ProductDetails = (product: Product) => {
 
 
  const productDetailContainer: HTMLElement | null = document.getElementById("product-detail-page") as HTMLDivElement;
  const productPageListContainer: HTMLElement | null = document.getElementById("productpage-list") as HTMLDivElement;
  const posterHeading: HTMLElement | null = document.getElementById("product-page") as HTMLDivElement;
 
  const newArrivalsSection: HTMLElement | null = document.getElementById("new-arrivals") as HTMLDivElement;
  const homepageProducts: HTMLElement | null = document.getElementById("homepage-products") as HTMLDivElement;
  const headerImage = document.querySelector(".header-image") as HTMLDivElement | null;
  const cartContainerTransparent = document.querySelector(".cart-container-transparent");
 
 
  if (posterHeading){
    posterHeading.style.display = "none";
  }
 
  if (productPageListContainer){
    productPageListContainer.style.display = "none";
  }
 
  if (productDetailContainer){
    productDetailContainer.style.display = "flex";
  }
 
  if (newArrivalsSection){
    newArrivalsSection.style.display = "none";
  }
 
  if (homepageProducts){
    homepageProducts.style.display = "none";
  }
 
  if (headerImage)
  {
    headerImage.style.display = "none";
  }
 
  if (productDetailContainer){
    productDetailContainer.style.display = "flex";
  }
 
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
 
const productSizeContainer = document.createElement ("section");
productSizeContainer.classList.add("product-size-container");
const productSizeBtn = document.createElement ("button");
productSizeBtn.classList.add("product-size-btn");
productSizeBtn.innerHTML =  `${product.sizes[0].size}`;
const productSizeList = document.createElement ("div");
productSizeList.classList.add("product-size-list");
 
for (let i = 0; i <product.sizes.length; i++) {
  const size = product.sizes[i];
  const productSizeOption = document.createElement("div");
  productSizeOption.classList.add("product-size-option");
 
  const productSize = document.createElement ("p")
  productSize.classList.add("product-size");
  productSize.innerHTML = `${size.size}`;
 
  const sizePrice = document.createElement ("p");
  sizePrice.classList.add("size-price");
  sizePrice.innerHTML = `$${size.price.toFixed(2)}`;
 
  productSizeOption.appendChild(productSize)
  productSizeOption.appendChild(sizePrice);
 
  productSizeOption.addEventListener("click", () => {
    productSizeBtn.innerHTML = `${size.size}`;
    choosenPrice.innerHTML = `$${size.price.toFixed(2)}`;
    productSizeList.classList.remove("visible");
  });
  productSizeList.appendChild(productSizeOption);
};
 
productSizeBtn.addEventListener("click", () => {
  productSizeList.classList.toggle("visible");
})
 
const addToBagContainer = document.createElement("section");
addToBagContainer.classList.add ("add-to-bag-container");
const addToBagBtn = document.createElement("button");
addToBagBtn.classList.add("add-to-bag");

const notifyMeContainer = document.createElement("section");
notifyMeContainer.classList.add("notify-me-container");
const notifyMeBtn = document.createElement("button"); 
notifyMeBtn.classList.add("notify-me");
 
addToBagContainer.addEventListener("click", () => {
  const selectedSizeText = productSizeBtn.innerHTML;
  const selectedSize = product.sizes.find((size) => size.size === selectedSizeText);
  
  if (selectedSize) {
    addToCart(product, selectedSize);
    cartContainerTransparent?.classList.toggle("visible");
    
  } 
});

notifyMeContainer.addEventListener("click", () => {
    createNotifyModalHtml();
});

const productStatus: HTMLElement | null = document.getElementById("product-status") as HTMLDivElement;
if (product.inStock) {
  productStatus.innerHTML = "In stock";
  productStatus.classList.add("product-in-stock");
  addToBagBtn.innerHTML= "Add to bag";
  addToBagContainer.appendChild(addToBagBtn);
  notifyMeContainer.style.display = "none";
}
else {
  productStatus.innerHTML = "Out of stock";
  productStatus.classList.add("product-out-of-stock");
  notifyMeBtn.innerHTML= "Notify me"
  notifyMeContainer.appendChild(notifyMeBtn);
  addToBagContainer.style.display = "none";
};

const headingDescription = document.createElement ("h4");
headingDescription.classList.add("product-description-heading")
headingDescription.innerHTML = "Description";
 
const productDescription = document.createElement ("p");
productDescription.innerHTML = product.description;
productDescription.classList.add("product-description");

 
productSizeContainer.appendChild(productSizeBtn);
productSizeContainer.appendChild(productSizeList);
 
infoContainer.appendChild(productTitle);
infoContainer.appendChild(choosenPrice);
infoContainer.appendChild(selectSize);
infoContainer.appendChild(productSizeContainer);
infoContainer.appendChild(productStatus);
infoContainer.appendChild(addToBagContainer);
infoContainer.appendChild(notifyMeContainer);
infoContainer.appendChild(headingDescription);
infoContainer.appendChild(productDescription);
 
productDetailContainer.appendChild(productImageContainer);
productDetailContainer.appendChild(infoContainer);
};