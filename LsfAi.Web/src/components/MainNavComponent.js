class MainNavComponent {
  render() {
    let accountLink;
    if(sessionStorage.getItem('user') == null) {
      accountLink = "/login";
    } else {
      accountLink = "/account";
    }
    
    return `
    <nav class="main-nav">
      <a class="desktop-only" href="/">
        <div class="main-nav__bloc">
          <img class="main-nav__bloc__icon" src="../../../assets/favicon48x48.svg"
            alt="Accueil" />
        </div>
      </a>
      <a href="/">
        <div class="main-nav__bloc">
          <img id="nav-home-icon" class="main-nav__bloc__icon mobile-only" src="../../../assets/menu-icons/home-icon.svg"
            alt="Accueil" />
          <span>Accueil</span>
        </div>
      </a>
      <a href="/exercise">
        <div class="main-nav__bloc">
          <img id="nav-exercise-icon" class="main-nav__bloc__icon mobile-only" src="../../../assets/menu-icons/exercise-icon.svg"
            alt="Liste des exercices" />
          <span>Exercices</span>
        </div>
      </a>
      <a href="/dictionary">
        <div class="main-nav__bloc">
          <img id="nav-dictionary-icon" class="main-nav__bloc__icon mobile-only"
            src="../../../assets/menu-icons/dictionary-icon.svg" alt="Dictionnaire de signes" />
          <span>Dictionnaire</span>
        </div>
      </a>
      <a href="${accountLink}">
        <div class="main-nav__bloc">
          <img id="nav-h=account-icon" class="main-nav__bloc__icon mobile-only" src="../../../assets/menu-icons/account-icon.svg"
            alt="Mon Compte" />
          <span>Compte</span>
        </div>
      </a>
    </nav>
    `;
  }
}

export default MainNavComponent;
