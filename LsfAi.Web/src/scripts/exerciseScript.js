import ExerciseCardComponent from '../components/ExerciseCardComponent.js';

let exercisesData;

window.onload = () => {
  feedDataToHtml();
}

const feedDataToHtml = async () => {
  //getting all exercises data
  await getAllExercises();

  for (let exerciseData of exercisesData) {
    const exerciseCard = new ExerciseCardComponent();

    const exerciseList = document.querySelector('.exercise-list');
    
    exerciseList.innerHTML = exerciseCard.render(exerciseData)

    dictionaryContent.appendChild(exerciseCardDiv);
  }
}

const getAllExercises = async () => {
  const response = await fetch("http://localhost:8282/exercises");
  exercisesData = await response.json();
}