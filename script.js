// Parte do cadastro e login
const toSignup = document.getElementById("toSignup");
const toLogin = document.getElementById("toLogin");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");

toSignup.addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "flex";
});

toLogin.addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "flex";
});

loginForm.style.display = "flex";
signupForm.style.display = "none";

// dwad
