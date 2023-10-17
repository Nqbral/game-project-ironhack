class QuestionEmoji extends Question {
  /**
   * Constructor QuestionEmoji
   *
   * @param {string} imageSrc image source
   * @param {string} themeQuestion theme of the question
   * @param {array[string]} answers list of possible answers
   */
  constructor(emojis, themeQuestion, answers) {
    super(themeQuestion, answers);

    this.emojis = emojis;
  }

  /**
   * Init the html code to display the question content
   *
   * @returns Element
   */
  initHtmlQuestionContent() {
    let element = document.createElement("p");

    element.innerHTML = this.emojis;

    return element;
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
