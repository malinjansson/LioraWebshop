import { productPageList } from "../../data/productPageList";
import { Product } from "../../models/Product";
import { ProductDetails } from "./createProductDetailHtml";


export const createproductPageList = () => {
  const productPageListContainer: HTMLElement | null = document.getElementById("productpage-list") as HTMLDivElement;
  const productDetailContainer: HTMLElement | null = document.getElementById("product-detail-page") as HTMLDivElement;
  const posterHeading: HTMLElement | null = document.getElementById("product-page") as HTMLDivElement;
  posterHeading.style.display = "block";
  productDetailContainer.style.display = "none"; 

  productPageListContainer.innerHTML = "";

  for (let i = 0; i < productPageList.length; i++) {
    const product: Product = productPageList[i];

    const productContainer = document.createElement("section");
    productContainer.classList.add("productContainer");

    const image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.title;
    image.classList.add("product-image");
    productContainer.appendChild(image);

    const title = document.createElement("h3");
    title.innerHTML = product.title;
    title.classList.add("product-title");
    productContainer.appendChild(title);

    const price = document.createElement("p");
    price.innerHTML = `Prices from $${product.sizes[0].price.toFixed(2)}`;
    price.classList.add("product-price");
    productContainer.appendChild(price);

    productContainer.addEventListener("click", () => {
      ProductDetails(product);
    });

    productPageListContainer.appendChild(productContainer);
  }
};