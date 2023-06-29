class HeaderComponent {
  render(exerciseData) {
    return `
    <link rel="stylesheet" href="../../../styles/ExerciseCardComponent.css">

    <section class="exercise-list__set">
    <h2 class="exercise-list__set__heading">"${exerciseData.description}"</h2>
    <div class="exercise-list__set__card">
      <h3 class="exercise-list__set__card__heading">"${exerciseData.description}"</h3>
      <span class="exercise-list__set__card__level">"${exerciseData.level}"</span>
    </div>
  </section>
    `;
  }
}

export default HeaderComponent;
