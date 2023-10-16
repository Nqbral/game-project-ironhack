class Score {
  constructor(player, score) {
    this.player = player;
    this.score = score;
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
