
export const createNotifyModalHtml = () => {

   const notifyBody: HTMLElement | null = document.getElementById("notify-me-modal") as HTMLDivElement;
   notifyBody.classList.toggle("visible");
   notifyBody.innerHTML = "";

   const notifyContainer = document.createElement("seciton");
   notifyContainer.classList.add ("notify-container");
   
   const notifyContent = document.createElement ("section");
   notifyContent.classList.add("notify-content")

   const closeBtnContainer = document.createElement("section");
   closeBtnContainer.classList.add("close-btn-container");

   const modalCloseIcon = document.createElement ("i");
   modalCloseIcon .id = "modal-close-icon";
   modalCloseIcon .classList.add("fa-solid", "fa-xmark");

   const modalHeading = document.createElement("h4");
   modalHeading.classList.add("modal-heading")
   modalHeading.innerHTML = "Notify me when the product is back in stock";

   const notifyEmail = document.createElement ("input");
   notifyEmail.classList.add ("modal-email");
   notifyEmail.placeholder = "Your email";
   notifyEmail.required = true; 

   const notifyMeBtn = document.createElement ("button");
   notifyMeBtn.innerHTML = "Notify me";
   notifyMeBtn.classList.add("notifyme-btn");

   closeBtnContainer.appendChild (modalCloseIcon);

   notifyContent.appendChild(closeBtnContainer);
   notifyContent.appendChild(modalHeading);
   notifyContent.appendChild(notifyEmail);
   notifyContent.appendChild(notifyMeBtn);

   notifyContainer.appendChild(notifyContent);

   notifyBody.appendChild(notifyContainer);

   modalCloseIcon.addEventListener("click", (e) => {
      e.preventDefault();
      
      notifyBody.classList.remove("visible");
   })

   notifyMeBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    const emailValue = notifyEmail.value;

    if (emailValue === "") {
      notifyEmail.classList.add("notify-error-message");
      notifyEmail.placeholder = "Please enter your email*";
    } else {
      notifyContent.innerHTML = "";

      const notifyMessage = document.createElement("h4");
      notifyMessage.innerHTML = "We'll notify you when the product is back in stock"
      notifyMessage.classList.add("notify-message");
  
      notifyContent.appendChild(closeBtnContainer);
      notifyContent.appendChild(notifyMessage);
  
      notifyContainer.appendChild(notifyContent);
  
      notifyBody.appendChild(notifyContainer);
    }
   });
}