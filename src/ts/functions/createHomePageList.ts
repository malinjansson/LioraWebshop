import { homePageList } from '../../data/homePageList';
import { addToCart } from './createCartHtml';

let homepageProducts = document.getElementById("homepage-products");

export const createHomePageList = () => {
  for (let i = 0; i < homePageList.length; i++) {
    const productCard = document.createElement("div");
    productCard.classList.add("homepage-product-card");

    // Skapa och lägg till bild
    const image = document.createElement("img");
    image.src = homePageList[i].imageUrl;
    image.alt = homePageList[i].title;
    image.classList.add("homepage-product-image");
     // Lägg till klickhändelse på bilden
     image.addEventListener("click", () => {
      addToCart(homePageList[i]); // Lägg till produkten i kundvagnen
    });
    
    productCard.appendChild(image);

    image.classList.add("first-four-images"); // För de fyra första bilderna
  
    if (i < 4) {
      image.classList.add("first-four-images"); // För de fyra första bilderna
    } else if (i >= 4 && i < 8) {
      image.classList.add("next-four-images"); // För de fyra bilderna efter
    }

    // Skapa en container för titel och pris
    const titlePriceContainer = document.createElement("div");
    titlePriceContainer.classList.add("homepage-title-price-container");

    // Skapa och lägg till titel
    const title = document.createElement("h3");
    title.textContent = homePageList[i].title;
    title.classList.add("homepage-product-title");
    titlePriceContainer.appendChild(title);

    // Skapa och lägg till pris
    const price = document.createElement("p");
    price.textContent = `Price from $${homePageList[i].sizes[0].price.toFixed(2)}`;
    price.classList.add("homepage-product-price");
    titlePriceContainer.appendChild(price);

    // Lägg till titlePriceContainer till productCard
    productCard.appendChild(titlePriceContainer);

    // Lägg till productCard till homepageProducts
    homepageProducts?.appendChild(productCard);
  }
};

 
