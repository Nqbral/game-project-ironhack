class Question {
  /**
   * Constructor Question
   *
   * @param {string} themeQuestion theme of the question
   * @param {array[string]} answers list of possible answers
   */
  constructor(themeQuestion, answers) {
    this.themeQuestion = themeQuestion;
    this.answers = answers;
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
      this.removeAccent(answerUser).toLowerCase()
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

  /**
   * Render the question in HTML
   */
  renderQuestion() {
    let elementContentQuestion = document.getElementById("content-question");
    let elementQuestion = document.getElementById("question");
    elementContentQuestion.innerHTML = "";
    elementQuestion.innerHTML = this.getQuestion();

    elementContentQuestion.appendChild(this.initHtmlQuestionContent());
  }
}
