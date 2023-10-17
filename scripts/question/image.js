class QuestionImage extends Question {
  /**
   * Constructor QuestionImage
   *
   * @param {string} imageSrc image source
   * @param {string} themeQuestion theme of the question
   * @param {array[string]} answers list of possible answers
   */
  constructor(imageSrc, themeQuestion, answers) {
    super(themeQuestion, answers);
  }

  /**
   * Init the html code to display the question content
   *
   * @returns Element
   */
  initHtmlQuestionContent() {
    let element = document.createElement("img");

    element.src = this.imgSrc;

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
        return "De quel anime provient cette image ?";
      case "movie":
        return "De quel film provient cette image ?";
      default:
        return "De quelle série provient cette image ?";
    }
  }
}
