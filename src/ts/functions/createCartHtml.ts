import { CartItem, Product, SizeOption } from "../../models/Product";

let shoppingCartList: CartItem[] = [];

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

  createCartHtml();
};


function removeFromCart(product: Product) {
  shoppingCartList = shoppingCartList.filter(cartItem => cartItem.product.id !== product.id);
  createCartHtml();
}

export const updateProductQuantity = (product: Product, quantityChange: number) => {
  const item = shoppingCartList.find(cartItem => cartItem.product.id === product.id);

  if (item) {
    item.quantity += quantityChange;

    if (item.quantity <= 0) {
      removeFromCart(product);
    } else {
      createCartHtml();
    }
  }
};

export const createCartHtml = () => {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const shoppingBagCount = document.getElementById('shopping-bag-count');
  const shoppingBagCountNav = document.getElementById('nav-shopping-bag-count');
  const emptyCartMessage = document.getElementById('empty-cart-message');

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

    shoppingCartList.forEach(cartItem => {
      const li = document.createElement('li');
      const itemPrice = cartItem.selectedSize.price;
      const totalPrice = itemPrice * cartItem.quantity;

      const productContainer = document.createElement('div');
      productContainer.classList.add('cart-item-info');

      const img = document.createElement('img');
      img.src = cartItem.product.imageUrl;
      img.alt = cartItem.product.title;
      img.classList.add('cart-item-image');
      productContainer.appendChild(img);

      const title = document.createElement('span');
      title.textContent = cartItem.product.title;
      productContainer.appendChild(title);

      const size = document.createElement('span');
      size.textContent = `Size: ${cartItem.selectedSize.size}`;
      productContainer.appendChild(size);

      const plusButton = document.createElement('button');
      plusButton.textContent = '+';
      plusButton.onclick = () => updateProductQuantity(cartItem.product, 1);

      const minusButton = document.createElement('button');
      minusButton.textContent = '-';
      minusButton.onclick = () => updateProductQuantity(cartItem.product, -1);

      const quantityDisplay = document.createElement('span');
      quantityDisplay.textContent = `${cartItem.quantity}`;
      quantityDisplay.classList.add('cart-item-quantity');

      const productTotalPrice = document.createElement('span');
      productTotalPrice.textContent = `$${(itemPrice * cartItem.quantity).toFixed(2)}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = '🗑️';
      removeButton.onclick = () => removeFromCart(cartItem.product);

      productContainer.appendChild(minusButton);
      productContainer.appendChild(quantityDisplay);
      productContainer.appendChild(plusButton);
      productContainer.appendChild(productTotalPrice);
      productContainer.appendChild(removeButton);

      li.appendChild(productContainer);
      cartItems?.appendChild(li);

      total += totalPrice;
      itemCount += cartItem.quantity;
    });
  }

  if (cartTotal) {
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  if (shoppingBagCount && shoppingBagCountNav) {
    shoppingBagCount.textContent = `Shopping bag (${itemCount})`;
    shoppingBagCountNav.textContent = `${itemCount}`;
  }
};
