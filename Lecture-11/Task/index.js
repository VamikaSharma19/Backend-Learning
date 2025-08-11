const signupBtn = document.querySelector(".Signup");
const form = document.querySelector("form");

signupBtn.addEventListener("click", () => {
  form.classList.toggle("hide");
});