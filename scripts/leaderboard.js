class Leaderboard {
  /**
   * Constructor Leaderboard
   */
  constructor() {
    this.scores = [];

    this.renderLeaderboard();
  }

  /**
   * Add score to the leaderboard
   *
   * @param {Score} score
   */
  addScore(score) {
    this.scores.push(score);
  }

  /**
   * Init the html code to display in the leaderboard
   *
   * @returns Element
   */
  initHtmlLeaderboard() {
    let element;

    if (this.scores.length === 0) {
      element = document.createElement("p");
      element.innerHTML = "Pas de quizz de réalisé !";

      return element;
    }

    element = document.createElement("ol");

    for (let i = 0; i < this.scores.length; i++) {
      let score = this.scores[i];

      element.appendChild(score.initHtmlScore());
    }

    return element;
  }

  /**
   * Render the leaderboard in HTML
   */
  renderLeaderboard() {
    const leaderboardDiv = document.getElementById("leaderboard-scores");
    leaderboardDiv.innerHTML = "";

    leaderboardDiv.appendChild(this.initHtmlLeaderboard());
  }
}
