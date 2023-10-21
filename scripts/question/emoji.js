class QuestionEmoji extends Question {
  /**
   * Constructor QuestionEmoji
   *
   * @param {string} emojis emojis
   * @param {string} themeQuestion theme of the question
   * @param {array[string]} answers list of possible answers
   */
  constructor(emojis, themeQuestion, answers, numberQuestion) {
    super(themeQuestion, answers, numberQuestion);

    this.emojis = emojis;
    this.emojisQuestionContent = document.getElementById(
      "emojis-question-content"
    );
  }

  /**
   * Display the image section
   */
  displayQuestion() {
    this.imageQuestionSection.style.display = "none";
    this.musicQuestionSection.style.display = "none";
    this.emojisQuestionContent.innerHTML = this.emojis;
    this.updateQuestion();
    this.emojisQuestionSection.style.display = "flex";
  }

  /**
   * String for the question
   *
   * @returns string
   */
  getQuestion() {
    switch (this.themeQuestion) {
      case "anime":
        return "Cette suite d'emojis vous font penser à quel anime ?";
      case "movie":
        return "Cette suite d'emojis vous font penser à quel film ?";
      default:
        return "Cette suite d'emojis vous font penser à quelle série ?";
    }
  }
}
