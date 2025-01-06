import { homePageList } from '../../data/homePageList';
import { ProductDetails } from './createProductDetailHtml';
 
let homepageProducts = document.getElementById("homepage-products");
 
export const createHomePageList = () => {
 
  const productDetailContainer: HTMLElement | null = document.getElementById("product-detail-page") as HTMLDivElement;
  productDetailContainer.style.display = "none";
 
  for (let i = 0; i < homePageList.length; i++) {
    const productCard = document.createElement("div");
    productCard.classList.add("homepage-product-card");
 
    const image = document.createElement("img");
    image.src = homePageList[i].imageUrl;
    image.alt = homePageList[i].title;
    image.classList.add("homepage-product-image");
  
    
    productCard.appendChild(image);
 
    image.classList.add("first-four-images"); 
  
    if (i < 4) {
      image.classList.add("first-four-images"); 
    } else if (i >= 4 && i < 8) {
      image.classList.add("next-four-images"); 
    }

    const titlePriceContainer = document.createElement("div");
    titlePriceContainer.classList.add("homepage-title-price-container");

    const title = document.createElement("h3");
    title.textContent = homePageList[i].title;
    title.classList.add("homepage-product-title");
    titlePriceContainer.appendChild(title);
 

    const price = document.createElement("p");
    price.textContent = `Price from $${homePageList[i].sizes[0].price.toFixed(2)}`;
    price.classList.add("homepage-product-price");
    titlePriceContainer.appendChild(price);
 
  
    productCard.appendChild(titlePriceContainer);

    productCard.addEventListener("click", () => {
     ProductDetails(homePageList[i]);
       });

    homepageProducts?.appendChild(productCard);
  }
};