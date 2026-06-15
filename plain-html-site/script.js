const themeButton = document.querySelector("#theme-toggle");
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark");
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const message = document.querySelector("#form-message");
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const body = form.elements.message.value.trim();

  if (!name || !email || !body) {
    message.textContent = "Please fill out your name, email, and message.";
    message.style.color = "#b91c1c";
    return;
  }

  message.textContent =
    "This plain JavaScript demo validates the form, but it does not send messages.";
  message.style.color = "#047857";
  form.reset();
});
