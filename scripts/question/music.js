class QuestionMusic extends Question {
  /**
   * Constructor QuestionMusic
   *
   * @param {string} musicSrc image source
   * @param {string} themeQuestion theme of the question
   * @param {array[string]} answers list of possible answers
   * @param {MusicPlayer} musicPlayer
   */
  constructor(musicSrc, themeQuestion, answers, musicPlayer) {
    super(themeQuestion, answers);

    this.musicSrc = musicSrc;
    this.musicPlayer = musicPlayer;
  }

  displayQuestion() {
    this.emojisQuestionSection.style.display = "none";
    this.imageQuestionSection.style.display = "none";
    this.musicPlayer.loadTrack(
      `../../assets/sounds/${this.themeQuestion}/${this.musicSrc}`
    );
    this.updateQuestion();
    this.musicQuestionSection.style.display = "block";
  }

  /**
   * String for the question
   *
   * @returns string
   */
  getQuestion() {
    switch (this.themeQuestion) {
      case "anime":
        return "De quel anime provient cette musique ?";
      case "movie":
        return "De quel film provient cette musique ?";
      default:
        return "De quelle série provient cette musique ?";
    }
  }
}
