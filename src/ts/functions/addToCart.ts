import { CartItem, Product } from "../../models/Product";

// En array för att lagra kundvagnen
let shoppingCartList: CartItem[] = [];

// Funktion för att lägga till en produkt i kundvagnen
export const addToCart = (product: Product) => {
  // Hitta om produkten redan finns i kundvagnen
  const item = shoppingCartList.find(cartItem => cartItem.product.id === product.id);

  if (item) {
    // Om produkten finns i kundvagnen, öka kvantiteten
    item.quantity++;
  } else {
    // Om produkten inte finns, skapa en ny CartItem och lägg till den i kundvagnen
    const newItem = new CartItem(product, 1);
    shoppingCartList.push(newItem);
  }

  updateCart(); // Uppdatera kundvagnen
}

// Funktion för att ta bort en produkt från kundvagnen
function removeFromCart(product: Product) {
  shoppingCartList = shoppingCartList.filter(cartItem => cartItem.product.id !== product.id);
  updateCart();
}

// Funktion för att uppdatera kvantiteten för en specifik produkt
export const updateProductQuantity = (product: Product, quantityChange: number) => {
  const item = shoppingCartList.find(cartItem => cartItem.product.id === product.id);
  
  if (item) {
    // Ändra kvantiteten baserat på quantityChange
    item.quantity += quantityChange;
    
    // Om kvantiteten blir 0 eller negativ, ta bort produkten från kundvagnen
    if (item.quantity <= 0) {
      removeFromCart(product);
    } else {
      updateCart(); // Uppdatera kundvagnen
    }
  }
}
export const updateCart = () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const shoppingBagCount = document.getElementById('shopping-bag-count'); // Referens till shopping bag count element
    const shoppingBagCountNav = document.getElementById('nav-shopping-bag-count'); // Referens till shopping bag count element
    const emptyCartMessage = document.getElementById('empty-cart-message'); // Referens till meddelandet om tom kundvagn
    
    if (cartItems) {
      cartItems.innerHTML = ''; // Rensa nuvarande innehåll i listan
    }
    
    let total = 0;
    let itemCount = 0; // För att hålla reda på antalet produkter
  
    // Kontrollera om kundvagnen är tom
    if (shoppingCartList.length === 0) {
      // Visa meddelandet om kundvagnen är tom
      if (emptyCartMessage) {
        emptyCartMessage.style.display = 'block';
      }
    } else {
      // Dölj meddelandet om kundvagnen inte är tom
      if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
      }
  
      shoppingCartList.forEach(cartItem => {
        const li = document.createElement('li');
        const itemPrice = cartItem.product.sizes[0].price; // Hämtar priset för produkten
        const totalPrice = itemPrice * cartItem.quantity; // Beräknar totalpris för den här produkten
  
        // Skapa en div för produktens bild, titel, storlek och pris
        const productContainer = document.createElement('div');
        productContainer.classList.add('cart-item-info');
  
        // Lägg till produktbild
        const img = document.createElement('img');
        img.src = cartItem.product.imageUrl; // Hämtar produktens bild
        img.alt = cartItem.product.title;
        img.classList.add('cart-item-image');
        productContainer.appendChild(img);
  
        // Lägg till produktens titel
        const title = document.createElement('span');
        title.textContent = cartItem.product.title;
        productContainer.appendChild(title);
  
        // Lägg till produktens storlek
        const size = document.createElement('span');
        size.textContent = `Size: ${cartItem.product.sizes[0].size}`; // Hämtar storleken från första storleksalternativet
        productContainer.appendChild(size);
  
        // Skapa plusknapp
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateProductQuantity(cartItem.product, 1); // Använd vår nya funktion för att uppdatera kvantitet
  
        // Skapa minusknapp
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => updateProductQuantity(cartItem.product, -1); // Använd vår nya funktion för att uppdatera kvantitet
  
        // Skapa ett element för att visa kvantiteten mellan plus- och minusknappen
        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = `${cartItem.quantity}`; // Visa aktuell kvantitet
        quantityDisplay.classList.add('cart-item-quantity'); // Lägg till en klass för att kunna styla det om det behövs
  
        // Skapa ett element för att visa totalpris för den här produkten (enhetligt pris * kvantitet)
        const productTotalPrice = document.createElement('span');
        productTotalPrice.textContent = `$${(itemPrice * cartItem.quantity).toFixed(2)}`; // Uppdatera totalpris dynamiskt
  
        // Skapa soptunneikon för att ta bort hela produkten
        const removeButton = document.createElement('button');
        removeButton.textContent = '🗑️'; // Soptunneikon
        removeButton.onclick = () => removeFromCart(cartItem.product);
  
        // Lägg till knapparna och kvantitetsvisningen
        productContainer.appendChild(minusButton);
        productContainer.appendChild(quantityDisplay); // Lägg till kvantitetsvisningen här
        productContainer.appendChild(plusButton);
        productContainer.appendChild(productTotalPrice); // Lägg till totalpris för produkten
        productContainer.appendChild(removeButton);
  
        // Lägg till produktinformationen och knappar till listan
        li.appendChild(productContainer);
        cartItems?.appendChild(li);
  
        // Lägg till produktens totalpris till den totala summan
        total += totalPrice;
  
        // Lägg till antalet produkter
        itemCount += cartItem.quantity;
      });
    }
  
    // Uppdatera totalpriset i UI
    if (cartTotal) {
      cartTotal.textContent = `$${total.toFixed(2)}`; // Format med två decimaler
    }
  
    // Uppdatera antalet produkter i kundvagnen
    if (shoppingBagCount && shoppingBagCountNav) {
      shoppingBagCount.textContent = `Shopping bag (${itemCount})`; // Uppdatera med det totala antalet produkter
      shoppingBagCountNav.textContent = `${itemCount}`; // Uppdatera med det totala antalet produkter
    }
  }
  