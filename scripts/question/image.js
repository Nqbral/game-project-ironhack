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
    this.imageQuestionContent.src = `../../assets/images/${this.themeQuestion}/${this.imgSrc}`;
    this.updateQuestion();
    this.imageQuestionSection.style.display = "block";
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
