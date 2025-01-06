import { CartItem, Product, SizeOption } from "../../models/Product";
import { getFromLs, saveToLs } from "./localStorage";

export let shoppingCartList: CartItem[];

export const addToCart = (product: Product, selectedSize: SizeOption) => {
  const item = shoppingCartList.find(
    (cartItem) => cartItem.product.id === product.id && cartItem.selectedSize.size === selectedSize.size
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

function removeFromCart(product: Product, selectedSize: SizeOption) {
  const itemIndex = shoppingCartList.findIndex(cartItem => 
    cartItem.product.id === product.id && cartItem.selectedSize.size === selectedSize.size
  );
  
  shoppingCartList.splice(itemIndex, 1);
  saveToLs(shoppingCartList); 
  createCartHtml();
}

export const updateProductQuantity = (product: Product, selectedSize: SizeOption, quantityChange: number) => {
  const item = shoppingCartList.find(cartItem => cartItem.product.id === product.id && cartItem.selectedSize.size === selectedSize.size);

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
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const shoppingBagCount = document.getElementById('shopping-bag-count');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const shoppingBagCountNav = document.getElementById('nav-shopping-bag-count');

  if (cartItems) {
    cartItems.innerHTML = '';
  }

  let total = 0;
  let itemCount = 0;

  if (shoppingCartList.length === 0) {
    if (emptyCartMessage) {
      emptyCartMessage.style.display = 'block';
    }
  } else {
    if (emptyCartMessage) {
      emptyCartMessage.style.display = 'none';
    }

    for (let i = 0; i < shoppingCartList.length; i++){
      const cartItem = shoppingCartList[i];

      const li = document.createElement('li');
      const itemPrice = cartItem.selectedSize.price;
      const totalPrice = itemPrice * cartItem.quantity;

      const shoppingBagContainer = document.createElement('div');
      shoppingBagContainer.classList.add('cart-item-info');

      const img = document.createElement('img');
      img.src = cartItem.product.imageUrl;
      img.alt = cartItem.product.title;
      img.classList.add('cart-item-image');

      const title = document.createElement('span');
      title.innerHTML = cartItem.product.title;

      const size = document.createElement('span');
      size.innerHTML = `Size: ${cartItem.selectedSize.size}`;

      const plusBtn = document.createElement('button');
      plusBtn.innerHTML = '+';
      plusBtn.addEventListener("click", () => {
        updateProductQuantity(cartItem.product, cartItem.selectedSize, 1);
      });

      const minusBtn = document.createElement('button');
      minusBtn.innerHTML = '-';
      minusBtn.addEventListener("click", () => {
        updateProductQuantity(cartItem.product, cartItem.selectedSize, -1);
      });

      const quantityDisplay = document.createElement('span');
      quantityDisplay.innerHTML = `${cartItem.quantity}`;
      quantityDisplay.classList.add('cart-item-quantity');

      const productTotalPrice = document.createElement('span');
      productTotalPrice.innerHTML = `$${(itemPrice * cartItem.quantity).toFixed(2)}`;

      const removeItemBtn = document.createElement('button');
      removeItemBtn.innerHTML = '🗑️';
      removeItemBtn.addEventListener("click", () => {
        
        removeFromCart(cartItem.product, cartItem.selectedSize);

      });

      shoppingBagContainer.appendChild(img);
      shoppingBagContainer.appendChild(title);
      shoppingBagContainer.appendChild(size);

      shoppingBagContainer.appendChild(minusBtn);
      shoppingBagContainer.appendChild(quantityDisplay);
      shoppingBagContainer.appendChild(plusBtn);
      shoppingBagContainer.appendChild(productTotalPrice);
      shoppingBagContainer.appendChild(removeItemBtn);

      li.appendChild(shoppingBagContainer);
      cartItems?.appendChild(li);

      total += totalPrice;
      itemCount += cartItem.quantity;
    };
  }

  if (cartTotal) {
    cartTotal.innerHTML = `$${total.toFixed(2)}`;
  }

  if (shoppingBagCount && shoppingBagCountNav) {
    shoppingBagCount.textContent = `Shopping bag (${itemCount})`; 
    shoppingBagCountNav.textContent = `${itemCount}`; 
  }
};

window.addEventListener('DOMContentLoaded', () => {
  shoppingCartList = getFromLs();
  createCartHtml();
});