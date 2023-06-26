class HeaderComponent {
    render(titleText) {
      return `
        <header class="header">
          <ul>
            <li>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1L1 12M1.00001 1L12 12"
                  stroke="#5E5E5E"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </li>
            <li><span class="title">${titleText}</span></li>
            <li><span class="next_button">Suivant</span></li>
          </ul>
          <a href="/reproduction">S'entraîner</a>

        </header>
      `;
    }
  }
  
  export default HeaderComponent;
  