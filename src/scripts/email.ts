export {};
import emailjs from "@emailjs/browser";

window.onload = () => {
  emailjs.init("7MzvNmdzIcgWarKne");
  const sendButton = document.querySelector('input[type="button"]');
  sendButton?.addEventListener("click", sendEmail);
};

const sendEmail = (): void => {
  const form = document.getElementById("email-form") as HTMLFormElement | null;
  const sendButton = document.querySelector(
    'input[type="button"]'
  ) as HTMLInputElement | null;
  const formContainer = document.querySelector(
    ".contact-form__right-wrap"
  ) as HTMLElement | null;

  if (sendButton && form && formContainer) {
    const originalButtonText = sendButton.value;
    sendButton.value = sendButton.getAttribute("data-wait") || "Please wait...";

    emailjs.sendForm("service_5wd6svt", "template_fa309b7", form).then(
      () => {
        console.log("SUCCESS!");
        form.style.display = "none";
        sendButton.value = originalButtonText;

        const prevMessages = formContainer.querySelectorAll(".message");
        prevMessages.forEach((msg) => msg.remove());

        const successMessage = document.createElement("div");
        successMessage.className = "message";
        successMessage.textContent =
          "Thank you! Your submission has been received!";
        formContainer.appendChild(successMessage);
      },
      (error) => {
        console.log("FAILED...", error);
        sendButton.value = originalButtonText;

        const prevMessages = formContainer.querySelectorAll(".message");
        prevMessages.forEach((msg) => msg.remove());

        const errorMessage = document.createElement("div");
        errorMessage.className = "message";
        errorMessage.textContent =
          "Oops! Something went wrong while submitting the form.";
        formContainer.appendChild(errorMessage);
      }
    );
  }
};