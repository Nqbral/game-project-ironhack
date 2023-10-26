class QuestionImage extends Question {
  /**
   * Constructor QuestionImage
   *
   * @param {string} imageSrc image source
   * @param {string} themeQuestion theme of the question
   * @param {array[string]} answers list of possible answers
   */
  constructor(imageSrc, themeQuestion, answers, numberQuestion) {
    super(themeQuestion, answers, numberQuestion);

    this.imgSrc = imageSrc;
    this.imageQuestionContent = document.getElementById(
      "image-question-content"
    );
  }

  /**
   * Display the image section
   */
  displayQuestion() {
    this.emojisQuestionSection.style.display = "none";
    this.musicQuestionSection.style.display = "none";
    this.imageQuestionContent.src = this.getImageSrc();
    this.updateQuestion();
    this.imageQuestionSection.style.display = "flex";
  }

  /**
   * Get the image source
   *
   * @returns string
   */
  getImageSrc() {
    return `./assets/images/${this.themeQuestion}/${this.imgSrc}`;
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
      case "movies":
        return "De quel film provient cette image ?";
      default:
        return "De quelle série provient cette image ?";
    }
  }
}
