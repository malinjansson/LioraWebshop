import { CartItem } from "../models/Product";

const cartProductsSection = document.querySelector(".checkout-info") as HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem") || "[]") as CartItem[];

    if (cartItems.length === 0) {
        cartProductsSection.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        renderCartItems(cartItems);
    }
});

function renderCartItems(cartItems: CartItem[]) {
    cartProductsSection.innerHTML = ""; 

    cartItems.forEach((item) => {
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

        const quantity = document.createElement("p");
        quantity.textContent = `Quantity: ${item.quantity}`; 
        productInfo.appendChild(quantity);

        const price = document.createElement("p");
        price.textContent = `Price: $${(item.selectedSize.price * item.quantity).toFixed(2)}`; 
        productInfo.appendChild(price);

        productContainer.appendChild(productInfo);
        cartProductsSection.appendChild(productContainer);
    });

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.selectedSize.price * item.quantity,
        0
    );

    const totalPriceContainer = document.createElement("p");
    totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartProductsSection.appendChild(totalPriceContainer);
}

const checkoutForm = document.querySelector("form") as HTMLFormElement;
const checkoutSection = document.querySelector(".checkout") as HTMLElement;
const thankYouSection = document.getElementById("thank-you-section") as HTMLElement;
const goHomeButton = document.getElementById("go-home") as HTMLButtonElement;

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

function saveProgress() {
    const inputs = checkoutForm.querySelectorAll("input");
    inputs.forEach((input) => {
        localStorage.setItem(input.placeholder, input.value);
    });
}

function restoreProgress() {
    const inputs = checkoutForm.querySelectorAll("input");
    inputs.forEach((input) => {
        const savedValue = localStorage.getItem(input.placeholder);
        if (savedValue) {
            input.value = savedValue;
        }
    });
}

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });
}

checkoutForm.addEventListener("input", saveProgress);


function validateInput(input: HTMLInputElement): boolean {
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

    // Zip code validation
    if (input.placeholder === "Zip code" && isNaN(Number(input.value))) {
        alert("Zip code must be a number.");
        return false;
    }

    return true;
}

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
        }
    });
}

if (goHomeButton) {
    goHomeButton.addEventListener("click", () => {
        localStorage.removeItem("thank-you-page");
        window.location.href = "/index.html";
    });
}
