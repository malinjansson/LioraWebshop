import { productPageList } from "../../data/productPageList";

const productPageListContainer = document.getElementById("productpage-list");

export const createproductPageList= () => {
  for (let i = 0; i <productPageList.length; i++) {

    const productContainer = document.createElement("section");
    productContainer.classList.add("productContainer");


    const image = document.createElement("img");
    image.src = productPageList[i].imageUrl; 
    image.alt = productPageList[i].title; 
    image.classList.add("product-image"); 
    productContainer.appendChild(image);

    const title = document.createElement("h3");
    title.textContent = productPageList[i].title; 
    title.classList.add("product-title"); 
    productContainer.appendChild(title);


    const price = document.createElement("p");
    price.textContent = `Prices from $${productPageList[i].sizes[0].price.toFixed(2)}`; 
    price.classList.add("product-price"); 
    productContainer.appendChild(price);

    productPageListContainer?.appendChild(productContainer);
  }
};