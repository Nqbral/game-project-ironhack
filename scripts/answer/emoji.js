class AnswerEmoji extends Answer {
  /**
   * Constructor AnswerEmoji
   *
   * @param {string} answer answer
   * @param {Question} question question
   * @param {bool} isAnswerOK is the answer ok according to the answers of the question
   * @param {bool} isAnswerGiven does the user give an answer
   * @param {int} numberQuestion number of the question in the quizz
   */
  constructor(answer, question, isAnswerOK, isAnswerGiven, numberQuestion) {
    super(answer, question, isAnswerOK, isAnswerGiven, numberQuestion);
  }

  /**
   * Init the html code to display the answer
   *
   * @returns Element
   */
  generateTypeAnswer() {
    let elementTypeAnswer = document.createElement("div");
    elementTypeAnswer.classList.add("emoji-answer-question");

    elementTypeAnswer.innerHTML = this.question.emojis;

    return elementTypeAnswer;
  }
}
