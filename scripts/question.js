class Question {
  /**
   * Constructor Question
   *
   * @param {string} themeQuestion theme of the question
   * @param {array[string]} answers list of possible answers
   */
  constructor(themeQuestion, answers, numberQuestion) {
    this.themeQuestion = themeQuestion;
    this.answers = answers;
    this.numberQuestion = numberQuestion;
    this.imageQuestionSection = document.getElementById("image-question");
    this.emojisQuestionSection = document.getElementById("emojis-question");
    this.musicQuestionSection = document.getElementById("music-question");
    this.question = document.getElementById("question");
  }

  updateQuestion() {
    this.question.innerHTML =
      "Question " + this.numberQuestion + " : " + this.getQuestion();
  }

  /**
   * Check if the answer given by the user is OK
   *
   * @param {string} answerUser answer from the user
   *
   * @returns bool
   */
  checkResponse(answerUser) {
    let formattedAnswers = this.answers.map((answer) =>
      this.removeAccent(answer).toLowerCase()
    );

    return formattedAnswers.includes(
      this.removeAccent(answerUser.trim()).toLowerCase()
    );
  }

  /**
   * Remove accents from a string
   *
   * @param {string} str
   *
   * @returns string
   */
  removeAccent(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
