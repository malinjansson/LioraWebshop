import { homePageList } from '../../data/homePageList';


let homePageListContainer = document.getElementById("homepage-list");

export const createHomePageList= () => {
  for (let i = 0; i < homePageList.length; i++) {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");


    let image = document.createElement("img");
    image.src = homePageList[i].imageUrl; 
    image.alt = homePageList[i].title; 
    image.classList.add("product-image"); 
    productCard.appendChild(image);


    let title = document.createElement("h3");
    title.textContent = homePageList[i].title; 
    title.classList.add("product-title"); 
    productCard.appendChild(title);


    let price = document.createElement("p");
    price.textContent = `$${homePageList[i].sizes[0].price.toFixed(2)}`; 
    price.classList.add("product-price"); 
    productCard.appendChild(price);

    homePageListContainer?.appendChild(productCard);
  }
};

createHomePageList();
console.log(homePageList);

