const form = document.getElementById("account-form");

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
      errorMessage.textContent = 'Une erreur est survenue lors de la modification';
      errorMessage.classList.add('error-message');
      setTimeout(clearMessages, 2000);
    }
  } catch (error) {
    console.error('Failed to update user:', error);
  }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
      // Get form values
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const id = user.id;

      let data = {
        id : id,
        email : email,
        password : password
      };

      console.log("data" + JSON.stringify(data));
  
      modifyUser(data);
  });





