const form = document.getElementById("login-form");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get form values
  const email = form.elements.email.value;
  const password = form.elements.password.value;
  console.log(email, password);

  let data = {
    email: email,
    password: password,
  };

  postData(data);
});
