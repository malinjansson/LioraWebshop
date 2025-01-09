import { CartItem, Product, SizeOption } from "../../models/Product";
import { getFromLs, saveToLs } from "./localStorage";

export let shoppingCartList: CartItem[] = getFromLs();

const cartProductsSection = document.querySelector(".checkout-info") as HTMLElement;
const checkoutForm = document.querySelector("form") as HTMLFormElement;
const checkoutSection = document.querySelector(".checkout") as HTMLElement;
const thankYouSection = document.getElementById("thank-you-section") as HTMLElement;
const goHomeButton = document.getElementById("go-home") as HTMLButtonElement;

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
            renderCartItems();
        }
    }
};

export const removeFromCart = (product: Product, selectedSize: SizeOption) => {
    shoppingCartList = shoppingCartList.filter(
        (cartItem) =>
            !(cartItem.product.id === product.id && cartItem.selectedSize.size === selectedSize.size)
    );

    saveToLs(shoppingCartList);
    renderCartItems();
};

export const renderCartItems = () => {
    cartProductsSection.innerHTML = ""; 

    let totalPrice = 0;

    if (shoppingCartList.length === 0) {
        // Display empty cart message
        const emptyMessage = document.createElement("h3");
        emptyMessage.textContent = "Your cart is empty.";
        emptyMessage.classList.add("cart-empty-message");
        cartProductsSection.appendChild(emptyMessage);
        return;
    }

    shoppingCartList.forEach((item) => {
        const productContainer = document.createElement("section");
        productContainer.classList.add("checkout-product");

        const productImage = document.createElement("img");
        productImage.src = item.product.imageUrl;
        productImage.alt = item.product.title;
        productImage.classList.add("checkout-product-image");
        productContainer.appendChild(productImage);

        const productInfo = document.createElement("div");
        productInfo.classList.add("checkout-product-info");

        const title = document.createElement("h3");
        title.textContent = item.product.title;
        productInfo.appendChild(title);

        const size = document.createElement("p");
        size.textContent = `Size: ${item.selectedSize.size}`;
        productInfo.appendChild(size);

        // Quantity Controls
        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("quantity-button");
        minusButton.addEventListener("click", () => {
            updateProductQuantity(item.product, item.selectedSize, -1);
        });

        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = item.quantity.toString();
        quantityDisplay.classList.add("quantity-display");

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("quantity-button");
        plusButton.addEventListener("click", () => {
            updateProductQuantity(item.product, item.selectedSize, 1);
        });

        quantityContainer.appendChild(minusButton);
        quantityContainer.appendChild(quantityDisplay);
        quantityContainer.appendChild(plusButton);
        productInfo.appendChild(quantityContainer);

        const price = document.createElement("p");
        price.textContent = `$${(item.selectedSize.price * item.quantity).toFixed(2)}`;
        price.classList.add("item-price");
        productInfo.appendChild(price);

        productContainer.appendChild(productInfo);

        const removeButton = document.createElement("button");
        removeButton.textContent = "x";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => {
            removeFromCart(item.product, item.selectedSize);
        });
        productContainer.appendChild(removeButton);

        cartProductsSection.appendChild(productContainer);

        totalPrice += item.selectedSize.price * item.quantity;
    });

    const totalPriceContainer = document.createElement("p");
    totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
    totalPriceContainer.classList.add("total-price");
    cartProductsSection.appendChild(totalPriceContainer);
};

document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();
});

// ThankYou Section Logic
if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (shoppingCartList.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
            return;
        }

        localStorage.removeItem("cartItem");
        shoppingCartList = [];
        renderCartItems();
        if (checkoutSection) checkoutSection.style.display = "none";
        if (thankYouSection) thankYouSection.style.display = "block";
        localStorage.setItem("thank-you-page", "true");
    });
}

if (goHomeButton) {
    goHomeButton.addEventListener("click", () => {
        localStorage.removeItem("thank-you-page");
        window.location.href = "/index.html";
    });
}
