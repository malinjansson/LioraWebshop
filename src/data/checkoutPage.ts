import { CartItem } from "../models/Product";

const cartProductsSection = document.querySelector(".checkout-info") as HTMLElement;
const checkoutForm = document.querySelector("form") as HTMLFormElement;
const checkoutSection = document.querySelector(".checkout") as HTMLElement;
const thankYouSection = document.getElementById("thank-you-section") as HTMLElement;
const goHomeButton = document.getElementById("go-home") as HTMLButtonElement;

const updateProductQuantity = (
    product: CartItem["product"],
    selectedSize: CartItem["selectedSize"],
    quantityChange: number
) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem") || "[]") as CartItem[];

    const itemIndex = cartItems.findIndex(
        (cartItem) =>
            cartItem.product.id === product.id &&
            cartItem.selectedSize.size === selectedSize.size
    );

    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += quantityChange;

        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }

        localStorage.setItem("cartItem", JSON.stringify(cartItems));
        renderCartItems(cartItems);
    }
};

// Remove item from cat
const removeFromCart = (
    product: CartItem["product"],
    selectedSize: CartItem["selectedSize"]
) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem") || "[]") as CartItem[];

    const updatedCartItems = cartItems.filter(
        (cartItem) =>
            !(cartItem.product.id === product.id && cartItem.selectedSize.size === selectedSize.size)
    );

    localStorage.setItem("cartItem", JSON.stringify(updatedCartItems));
    renderCartItems(updatedCartItems);
};

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem") || "[]") as CartItem[];

    if (cartItems.length === 0) {
        cartProductsSection.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        renderCartItems(cartItems);
    }
});

export const renderCartItems = (cartItems: CartItem[]) => {
    cartProductsSection.innerHTML = ""; 
    localStorage.removeItem("thank-you-page");

    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const productContainer = document.createElement("section");
        productContainer.classList.add("checkout-product");

        // Product Image
        const productImage = document.createElement("img");
        productImage.src = item.product.imageUrl;
        productImage.alt = item.product.title;
        productImage.classList.add("checkout-product-image");
        productContainer.appendChild(productImage);

        // Product Info
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
    }

    const totalPriceContainer = document.createElement("p");
    totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
    totalPriceContainer.classList.add("total-price");
    cartProductsSection.appendChild(totalPriceContainer);
};

document.addEventListener("DOMContentLoaded", () => {
    const isThankYouPage = localStorage.getItem("thank-you-page");

    if (isThankYouPage === "true") {
        if (checkoutSection) checkoutSection.style.display = "none";
        if (thankYouSection) thankYouSection.style.display = "block";
    } else {
        if (checkoutSection) checkoutSection.style.display = "block";
        if (thankYouSection) thankYouSection.style.display = "none";

        restoreProgress();
    }
});

export const saveProgress = () => {
    if (checkoutForm) {
        const inputs = checkoutForm.querySelectorAll("input");
        inputs.forEach((input) => {
            localStorage.setItem(input.placeholder, input.value);
        });
    }
};

export const restoreProgress = () => {
    if (checkoutForm) {
        const inputs = checkoutForm.querySelectorAll("input");

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const savedValue = localStorage.getItem(input.placeholder);
            if (savedValue) {
                input.value = savedValue;
            }
        }
    }
};

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const inputs = checkoutForm.querySelectorAll("input");
        let isFormValid = true;

        inputs.forEach((input) => {
            if (!validateInput(input as HTMLInputElement)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            localStorage.clear();
            checkoutForm.reset();
            if (checkoutSection) checkoutSection.style.display = "none";
            if (thankYouSection) thankYouSection.style.display = "block";

            localStorage.setItem("thank-you-page", "true");
            localStorage.removeItem("cartItem");
        }
    });

    checkoutForm.addEventListener("input", saveProgress);
}

export const validateInput = (input: HTMLInputElement): boolean => {
    if (input.type === "text" && input.value.trim() === "") {
        alert(`${input.placeholder} is required.`);
        return false;
    }

    if (input.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            alert("Please enter a valid email address.");
            return false;
        }
    }

    if (input.placeholder === "Zip code" && isNaN(Number(input.value))) {
        alert("Zip code must be a number.");
        return false;
    }

    return true;
};

if (goHomeButton) {
    goHomeButton.addEventListener("click", () => {
        localStorage.removeItem("thank-you-page");
        window.location.href = "/index.html";
    });
}
