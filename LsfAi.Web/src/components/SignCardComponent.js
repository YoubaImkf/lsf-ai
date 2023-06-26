class SignCardComponent {
  render(signData) {
    return `
    <div class="sign-card">
      <img class="sign-card__image" src="${signData.media_uri}" alt="${signData.definition}" title="${signData.definition}">
      <h3 class="sign-card__definition">"${signData.definition}"</h3>
      <div class="letter-popup hide">
        <div class="flex-container">
          <span class="letter-popup__close">&times;</span>
          <img class="letter-popup__image" src="${signData.media_uri}" alt="${signData.definition}">
          <h3 class="letter-popup__definition">"${signData.definition}"</h3>
          <a href="">S'entraîner</a>
        </div>
      </div>
    </div>
    `;
  }
}

export default SignCardComponent;
