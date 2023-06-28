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


// Put the username in the input
usernameInput.value = user.username;

// Put the email in the input
emailInput.value = user.email;

// Modify the input css to seems like a disabled input

// updateButton.addEventListener("click",enableInput(emailInput));

// Modify user in the database

// const modifyUser = async (user) => {
//     const response = await fetch(`http://localhost:8282/users/${user.id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//     }).then((response) => {
//         console.log(response);
//         if(response.ok) {
//             const responseData = response.json();
//             console.log('User modified : ', responseData);
//         }else {
//             throw new Error('Failed to modify user');
//         }
//     })
//     .catch((error) => {
//         console.error('Error modifying user:', error);
//     });
// };

const modifyUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:8282/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        console.log('User modified:', responseData);
      } else {
        throw new Error('Failed to modify user');
      }
    } catch (error) {
      console.error('Error modifying user:', error);
    }
  };

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





