const form = document.getElementById("account-form");

const passwordError = document.getElementById("password-error");

// Get user from session storage
const user = JSON.parse(sessionStorage.getItem('user'));

console.log(user);

// Get the input
const usernameInput = document.querySelector('#usernameAccount');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Get the button
const updateButton = document.querySelector('#modify-account-button');

// Get messages status
const confirmationMessage = document.querySelector('#confirmation-message');
const errorMessage = document.querySelector('#error-message');

// Put the username in the input
usernameInput.value = user.username;

// Put the email in the input
emailInput.value = user.email;


function clearMessages() {
  confirmationMessage.textContent = "";
  confirmationMessage.classList.remove("success-message");
  errorMessage.textContent = "";
  errorMessage.classList.remove("error-message");
}

async function modifyUser(data) {
  try {
    const response = await fetch('http://localhost:8282/users/' + data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const updatedUser = await response.json();
      console.log('User updated:', updatedUser);
      confirmationMessage.textContent = 'Information du compte modifié';
      confirmationMessage.classList.add('success-message');
      setTimeout(clearMessages, 2000);
    } else {
      console.error('Failed to update user:', response.status);
    }
  } catch (error) {
    console.error('Failed to update user:', error);
  }
}

async function validateForm() {
  // Reset error messages and input styles
  passwordError.textContent = "";

  form.elements.password.classList.remove("error-input");

  // Get form values
  const password = form.elements.password.value;

  // Check if password are filled
  if (!password) {
    passwordError.textContent = "Mot de passe requis";
    form.elements.password.classList.add("error-input");
    return false;
  }

  // Check if password is at least 8 characters long
  if(password.length < 8){
    passwordError.textContent = "Le mot de passe doit contenir au moins 8 caractères";
    form.elements.password.classList.add("error-input");
    return false;
  }

  //check password complexity
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    passwordError.textContent =
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial";
    form.elements.password.classList.add("error-input");
    return false;
  }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if(await validateForm()){
      // Get form values
      const email = user.email;
      const password = form.elements.password.value;
      const id = user.id;

      let data = {
        id : id,
        email : email,
        password : password
      };

      console.log("data" + JSON.stringify(data));
  
      modifyUser(data);
    }
  });





