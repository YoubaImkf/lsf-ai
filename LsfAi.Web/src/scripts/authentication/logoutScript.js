const logoutButton = document.getElementById("logout-button");

const logout = () => {
    sessionStorage.clear();
};

logoutButton.addEventListener("click", logout);
