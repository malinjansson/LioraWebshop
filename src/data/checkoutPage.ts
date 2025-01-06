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

checkoutForm.addEventListener("input", saveProgress);

// Validate Inputs

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
