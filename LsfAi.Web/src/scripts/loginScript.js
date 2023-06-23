const form = document.getElementById("login-form");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

function postData(data) {
  fetch("http://localhost:8282/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Successful login");
        // redirige vers page...
        window.location.href = "http://localhost:3000/camera";
      } else {
        throw new Error("Login failed");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred during login attempt");
    });
}

function validateForm() {
  // Reset error messages and input styles
  emailError.textContent = "";
  passwordError.textContent = "";
  form.elements.email.classList.remove("error-input");
  form.elements.password.classList.remove("error-input");

  // Get form values
  const email = form.elements.email.value;
  const password = form.elements.password.value;

  // Check if email and password are filled
  if (!email) {
    emailError.textContent = "Email is required";
    form.elements.email.classList.add("error-input");
    return false;
  }
  if (!password) {
    passwordError.textContent = "Password is required";
    form.elements.password.classList.add("error-input");
    return false;
  }

  return true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get form values
  const email = form.elements.email.value;
  const password = form.elements.password.value;
  console.log(email, password);

  if (!validateForm()) {
    return;
  }


  let data = {
    email: email,
    password: password,
  };

  postData(data);
});
