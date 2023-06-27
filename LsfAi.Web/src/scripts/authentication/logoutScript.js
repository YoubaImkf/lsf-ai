const logoutButton = document.getElementById("logout-button");

const logout = () => {
    sessionStorage.clear();
    window.location.href = "http://localhost:3000/login";
};

logoutButton.addEventListener("click", logout);
