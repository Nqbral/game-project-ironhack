class Score {
  /**
   * Constructor Score
   *
   * @param {Player} player player
   */
  constructor(player) {
    this.player = player;
    this.score = 0;
  }

  /**
   * Init the html code to display score in leaderboard
   *
   * @returns Element
   */
  initHtmlScore() {
    let element = document.createElement("li");

    element.innerHTML = `${this.player.name} : ${this.score}/10`;

    return element;
  }
}
