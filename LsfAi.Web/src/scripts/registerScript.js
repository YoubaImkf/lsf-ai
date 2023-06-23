const form = document.getElementById("registration-form");
const emailError = document.getElementById("email-error");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

function postData(data) {
  fetch("http://localhost:8282/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Successful registration");
        // redirige vers page...
        window.location.href = "http://localhost:3000/camera";
      } else {
        throw new Error("Registration failed");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred during registration");
    });
}

function validateForm() {
  // Reset error messages and input styles
  emailError.textContent = "";
  usernameError.textContent = "";
  passwordError.textContent = "";
  form.elements.email.classList.remove("error-input");
  form.elements.username.classList.remove("error-input");
  form.elements.password.classList.remove("error-input");;

  // Get form values
  const email = form.elements.email.value;
  const username = form.elements.username.value;
  const password = form.elements.password.value;

  // Check if email, username, and password are filled
  if (!email) {
    emailError.textContent = "Email is required";
    form.elements.email.classList.add("error-input");
    return false;
  }
  if (!username) {
    usernameError.textContent = "Username is required";
    form.elements.username.classList.add("error-input");
    return false;
  }
  if (!password) {
    passwordError.textContent = "Password is required";
    form.elements.password.classList.add("error-input");
    return false;
  }

  // Check password length
  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long";
    form.elements.password.classList.add("error-input");
    return false;
  }

  return true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get form values
  const email = form.elements.email.value;
  const username = form.elements.username.value;
  const password = form.elements.password.value;

  // Validate form inputs
  if (!validateForm()) {
    return;
  }

  let data = {
    email: email,
    username: username,
    password: password,
  };

  postData(data);
});
