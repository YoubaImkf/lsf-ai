let progressData;
// Get user from session storage
const user = JSON.parse(sessionStorage.getItem('user'));

//Get the user's informations
let userName = user.username;
let userID = user.id;

//query selectors

let userNameContent = document.querySelector('.username');
let levelContent = document.querySelector("#level-content");
let levelUser = document.querySelector(".level-value");
userNameContent.textContent = userName;
let circleProgUser = document.querySelector(".level-progress");
document.querySelector("#reproductionExo").addEventListener('click', function () {
    location.href = 'exercise/reproduction'
}, false);



window.onload = () => {
    getProgress();
}
const getProgress = async () => {
    const response = await fetch("http://localhost:8282/progressions/user" + userID + "/average");
    progressData = await response.json();

    //calcul for progression bar
    let percentage = ((200 - progressData.remainingPoints) / 2);
    circleProgUser.style.background = `conic-gradient(#FF6928 ${percentage * 3.6}deg, #FFFF 0deg)`;


    let nextLevel = progressData.userLevel + 1;
    levelContent.textContent = "+" + Number(progressData.remainingPoints) + " jusqu'au Niv " + nextLevel;
    levelUser.textContent = "Niv " + progressData.userLevel;



    let levelPaires = document.querySelector(".exercise-cards__card #level-value-paires");
    let levelReproduction = document.querySelector(".exercise-cards__card #level-value-reproduction");
    let exoProgression = progressData.exerciseProgressions;

    exoProgression.forEach((exo) => {

        if (exo) {
            let exoProgPercentage = exo.progressionLevelPerc;
            console.log(exoProgPercentage + exo.exerciceDescription);

            let circle = document.querySelector(".exercise-cards__card .level-progress");
            circle.style.background = `conic-gradient(#FF6928 ${exoProgPercentage * 3.6}deg, #FFFF 0deg)`;

            if (exo.exerciceDescription = "Paires signe-définition") {
                levelPaires.textContent = "Niv " + exo.exerciseLevel;
            }
            if (exo.exerciceDescription = "Reproduction de signe") {
                levelReproduction.textContent = "Niv " + exo.exerciseLevel;
            }

        }
    });

}

