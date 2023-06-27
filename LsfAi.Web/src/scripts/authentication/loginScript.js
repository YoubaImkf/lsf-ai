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
        return response.json(); // Parse the response as JSON
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      // Access the user properties (role and username)
      const { role, id, username, email } = data;
      // Store the user properties in the session storage
      sessionStorage.setItem('user', JSON.stringify(data));

      window.location.href = "http://localhost:3000/dictionary";
    })
    .catch((error) => {
      emailError.textContent = "Your email or password is incorrect";
      passwordError.textContent = "Your email or password is incorrect";
      form.elements.email.classList.add("error-input");
      form.elements.password.classList.add("error-input");
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

  if (!validateForm()) {
    return;
  }


  let data = {
    email: email,
    password: password,
  };

  postData(data);
});
