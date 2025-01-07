import { CartItem, Product, SizeOption } from "../../models/Product";
import { getFromLs, saveToLs } from "./localStorage";

export let shoppingCartList: CartItem[];

export const addToCart = (product: Product, selectedSize: SizeOption) => {
  const item = shoppingCartList.find(
    (cartItem) =>
      cartItem.product.id === product.id &&
      cartItem.selectedSize.size === selectedSize.size
  );

  if (item) {
    item.quantity++;
  } else {
    const newItem = new CartItem(product, 1, selectedSize);
    shoppingCartList.push(newItem);
  }

  saveToLs(shoppingCartList);
  createCartHtml();
};

export const removeFromCart = (product: Product, selectedSize: SizeOption) => {
  const itemIndex = shoppingCartList.findIndex(cartItem => 
    cartItem.product.id === product.id && cartItem.selectedSize.size === selectedSize.size
  );

  shoppingCartList.splice(itemIndex, 1);
  saveToLs(shoppingCartList);
  createCartHtml();
}

export const updateProductQuantity = (
  product: Product,
  selectedSize: SizeOption,
  quantityChange: number
) => {
  const item = shoppingCartList.find(
    (cartItem) =>
      cartItem.product.id === product.id &&
      cartItem.selectedSize.size === selectedSize.size
  );

  if (item) {
    item.quantity += quantityChange;

    if (item.quantity <= 0) {
      removeFromCart(product, selectedSize);
    } else {
      saveToLs(shoppingCartList);
      createCartHtml();
    }
  }
};

export const createCartHtml = () => {
  const shoppingBagCount = document.getElementById("shopping-bag-count");
  const cartProducts = document.getElementById("cart-products");
  const shoppingBagCountNav = document.getElementById("nav-shopping-bag-count");
  const cartTotal = document.getElementById("cart-totalprice");
  const cartSubtotal : HTMLElement | null = document.getElementById("cart-subtotal") as HTMLSpanElement;

  let total = 0;
  let itemCount = 0;

  // Hantera tom korg
  if (shoppingCartList.length === 0) {
    if (cartProducts) cartProducts.innerHTML = "Shopping bag is empty";
    if (shoppingBagCount) shoppingBagCount.innerHTML = "";
    if (shoppingBagCountNav) shoppingBagCountNav.innerHTML = "";
    if (cartTotal) cartTotal.innerHTML = "";
    return;
  }

  // Rensa tidigare innehåll
  if (cartProducts) cartProducts.innerHTML = "";

  // Loop genom varor i korgen
  for (let i = 0; i < shoppingCartList.length; i++) {
    const cartItem = shoppingCartList[i];
    const itemPrice = cartItem.selectedSize.price;
    const totalPrice = itemPrice * cartItem.quantity;

    // Bild
    const cartProductContainer = document.createElement("section");
    cartProductContainer.classList.add("cart-product-container")
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("cart-item-image-container");
    const img = document.createElement("img");
    img.src = cartItem.product.imageUrl;
    img.alt = cartItem.product.title;
    img.classList.add("cart-item-image");
    imgContainer.appendChild(img);
    cartProductContainer?.appendChild(imgContainer);

    // Info
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("cart-item-info-container");
    const title = document.createElement("p");
    title.innerHTML = cartItem.product.title;
    const size = document.createElement("p");
    size.innerHTML = `Size: ${cartItem.selectedSize.size}`;
    const price = document.createElement("p");
    price.innerHTML = `$${totalPrice.toFixed(2)}`;
    infoContainer.appendChild(title);
    infoContainer.appendChild(size);
    infoContainer.appendChild(price);
    cartProductContainer?.appendChild(infoContainer);
    cartProducts?.appendChild(cartProductContainer)

    // Knappar
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("cart-action-info-container");
    const plusBtn = document.createElement("button");
    plusBtn.innerHTML = "+";
    plusBtn.addEventListener("click", () => {
      updateProductQuantity(cartItem.product, cartItem.selectedSize, 1);
    });

    const minusBtn = document.createElement("button");
    minusBtn.innerHTML = "-";
    minusBtn.addEventListener("click", () => {
      updateProductQuantity(cartItem.product, cartItem.selectedSize, -1);
    });

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "🗑️";
    removeBtn.addEventListener("click", () => {
      removeFromCart(cartItem.product, cartItem.selectedSize);
    });


    cartSubtotal.innerHTML= "Subtotal"
    const quantity = document.createElement("span");
    quantity.innerHTML = cartItem.quantity.toString();

    actionContainer?.appendChild(minusBtn);
    actionContainer?.appendChild(quantity);
    actionContainer?.appendChild(plusBtn);
    actionContainer?.appendChild(removeBtn);
    infoContainer?.appendChild(actionContainer);

    total += totalPrice;
    itemCount += cartItem.quantity;
  }

  // Uppdatera totals
  if (cartTotal) cartTotal.innerHTML = `$${total.toFixed(2)}`;
  if (shoppingBagCount) shoppingBagCount.innerHTML = `Shopping bag (${itemCount})`;
  if (shoppingBagCountNav) shoppingBagCountNav.innerHTML = `${itemCount}`;
};


window.addEventListener("DOMContentLoaded", () => {
  shoppingCartList = getFromLs();
  createCartHtml();
});
