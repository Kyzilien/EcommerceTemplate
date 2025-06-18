
// Contact
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "Thanks! Your message has been sent.";
    feedback.style.color = "green";

    form.reset();
  });
});