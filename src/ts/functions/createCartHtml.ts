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
  const itemIndex = shoppingCartList.findIndex(
    (cartItem) =>
      cartItem.product.id === product.id &&
      cartItem.selectedSize.size === selectedSize.size
  );

  shoppingCartList.splice(itemIndex, 1);
  saveToLs(shoppingCartList);
  createCartHtml();
};

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
  const cartSubtotal: HTMLElement | null = document.getElementById(
    "cart-subtotal"
  ) as HTMLSpanElement;
  const cartCloseIcon: HTMLElement | null = document.getElementById(
    "cart-close-icon"
  ) as HTMLDivElement;
  const cartIcon = document.getElementById("cart-icon");
  const cartContainerTransparent = document.querySelector(
    ".cart-container-transparent"
  );
  const cartCheckout: HTMLElement | null = document.getElementById(
    "cart-checkout"
  ) as HTMLDivElement;
  cartCheckout.innerHTML = "checkout";

  cartCloseIcon?.addEventListener("click", () => {
    cartContainerTransparent?.classList.remove("visible");
  });

  cartIcon?.addEventListener("click", () => {
    cartContainerTransparent?.classList.toggle("visible");
  });

  let total = 0;
  let itemCount = 0;

  if (shoppingCartList.length === 0) {
    if (cartProducts) {
      cartProducts.innerHTML = "";
      const cartEmptyMessage = document.createElement("h3");
      cartEmptyMessage.innerHTML = "Your bag is empty";
      cartProducts.appendChild(cartEmptyMessage);
      cartEmptyMessage.classList.add("cart-empty-message");
    }
    if (shoppingBagCount) shoppingBagCount.innerHTML = "";
    if (shoppingBagCountNav) shoppingBagCountNav.innerHTML = "";
    if (cartTotal) cartTotal.innerHTML = "";
    if (cartSubtotal) cartSubtotal.innerHTML = "";

    if (cartCheckout) {
      cartCheckout.innerHTML = "Continue shopping";
      cartCheckout.setAttribute("href", "/pages/productpage.html");
    }
    return;
  } else {
    if (cartCheckout) {
      cartCheckout.setAttribute("href", "/pages/checkout.html");
    }
  }

  if (cartProducts) cartProducts.innerHTML = "";

  for (let i = 0; i < shoppingCartList.length; i++) {
    const cartItem = shoppingCartList[i];
    const itemPrice = cartItem.selectedSize.price;
    const totalPrice = itemPrice * cartItem.quantity;
    const cartProductContainer = document.createElement("section");
    cartProductContainer.classList.add("cart-product-container");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("cart-item-image-container");
    const img = document.createElement("img");
    img.src = cartItem.product.imageUrl;
    img.alt = cartItem.product.title;
    img.classList.add("cart-item-image");
    imgContainer.appendChild(img);
    cartProductContainer?.appendChild(imgContainer);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("cart-item-info-container");
    const title = document.createElement("h4");
    title.innerHTML = cartItem.product.title;
    const size = document.createElement("p");
    size.innerHTML = `Size: ${cartItem.selectedSize.size}`;
    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");
    const price = document.createElement("p");
    price.innerHTML = `$${totalPrice.toFixed(2)}`;
    infoContainer.appendChild(title);
    infoContainer.appendChild(size);
    priceContainer.appendChild(price);
    cartProductContainer?.appendChild(infoContainer);
    cartProducts?.appendChild(cartProductContainer);

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("cart-action-info-container");
    const iconContainer = document.createElement("div");
    actionContainer.classList.add("cart-action-info-container");
    iconContainer.classList.add("icon-container");
    const plusBtn = document.createElement("div");
    plusBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    plusBtn.addEventListener("click", () => {
      updateProductQuantity(cartItem.product, cartItem.selectedSize, 1);
    });

    const minusBtn = document.createElement("div");
    minusBtn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    minusBtn.addEventListener("click", () => {
      updateProductQuantity(cartItem.product, cartItem.selectedSize, -1);
    });

    const removeBtn = document.createElement("div");
    removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    removeBtn.addEventListener("click", () => {
      removeFromCart(cartItem.product, cartItem.selectedSize);
    });

    cartSubtotal.innerHTML = "Subtotal";
    const quantity = document.createElement("span");
    quantity.innerHTML = cartItem.quantity.toString();

    actionContainer.appendChild(priceContainer);
    iconContainer?.appendChild(minusBtn);
    iconContainer?.appendChild(quantity);
    iconContainer?.appendChild(plusBtn);
    iconContainer?.appendChild(removeBtn);
    infoContainer?.appendChild(actionContainer);
    actionContainer.appendChild(iconContainer);

    total += totalPrice;
    itemCount += cartItem.quantity;
  }

  if (cartTotal) cartTotal.innerHTML = `$${total.toFixed(2)}`;
  if (shoppingBagCount)
    shoppingBagCount.innerHTML = `Shopping bag (${itemCount})`;
  if (shoppingBagCountNav) shoppingBagCountNav.innerHTML = `${itemCount}`;
};

window.addEventListener("DOMContentLoaded", () => {
  shoppingCartList = getFromLs();
  createCartHtml();
});
