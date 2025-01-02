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
    }


});

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        checkoutForm.reset();

        if (checkoutSection) checkoutSection.style.display = "none";
        if (thankYouSection) thankYouSection.style.display = "block";

        localStorage.setItem("thank-you-page", "true");
    } ); 

}

if (goHomeButton) {
    goHomeButton.addEventListener("click", () => {
        window.location.href = "/index.html";
    });
}