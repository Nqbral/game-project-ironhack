class Navigator {
  /**
   * Constructor Navigator
   */
  constructor() {
    this.routes = [
      // Routes menu
      new Route("start-menu", "quizz-preparation", "game-menu"),
      new Route("leaderboard-menu", "leaderboard", "game-menu"),
      new Route("rules-menu", "rules", "game-menu"),
      new Route("about-menu", "about", "game-menu"),
      // Routes leaderboard
      new Route("leaderboard-back-to-menu", "game-menu", "leaderboard"),
      // Routes rules
      new Route("rules-back-to-menu", "game-menu", "rules"),
      // Routes rules
      new Route("about-back-to-menu", "game-menu", "about"),
      // Routes quizz preparation
      new Route(
        "quizz-preparation-back-to-menu",
        "game-menu",
        "quizz-preparation"
      ),
      // Routes end quizz
      new Route("quizz-end-restart", "quizz-preparation", "quizz-end"),
      new Route("quizz-end-show-leaderboard", "leaderboard", "quizz-end"),
      new Route("quizz-end-back-to-menu", "game-menu", "quizz-end"),
    ];

    this.initListeners();
  }

  /**
   * Display the section
   *
   * @param {string} sectionToDisplay id section to display
   */
  displaySection(sectionToDisplay) {
    let element = document.getElementById(sectionToDisplay);

    element.style.display = "flex";
  }

  /**
   * Hide the section
   *
   * @param {string} sectionToHide id section to hide
   */
  hideSection(sectionToHide) {
    let element = document.getElementById(sectionToHide);

    element.style.display = "none";
  }

  /**
   * Add listeners to all buttons using the routes to hide/display sections
   */
  initListeners() {
    for (let i = 0; i < this.routes.length; i++) {
      let route = this.routes[i];
      let buttonElement = document.getElementById(route.idButton);

      buttonElement.addEventListener("click", () => {
        this.hideSection(route.sectionToHide);
        this.displaySection(route.sectionToDisplay);
      });
    }
  }
}

class Route {
  /**
   * Constructor route
   *
   * @param {string} idButton id button triggered
   * @param {string} sectionToDisplay id section to display
   * @param {string} sectionToHide id section to hide
   */
  constructor(idButton, sectionToDisplay, sectionToHide) {
    this.idButton = idButton;
    this.sectionToDisplay = sectionToDisplay;
    this.sectionToHide = sectionToHide;
  }
}
