const getData = () => {
  fetch("http://localhost:8282/users/register", {
    method: "GET",
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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get form values
  const email = form.elements.email.value;
  const username = form.elements.username.value;
  const password = form.elements.password.value;

  let data = {
    email: email,
    username: username,
    password: password,
  };

  postData(data);
});

const getJSONData = async () => {
  const response = await fetch("http://localhost:3000");
  const jsonData = await response.json();
  console.log(jsonData);
}
