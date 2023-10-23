class AnswerImage extends Answer {
  /**
   * Constructor AnswerImage
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
    let elementTypeAnswer = document.createElement("img");
    elementTypeAnswer.classList.add("image-answer-question");

    elementTypeAnswer.src = this.question.getImageSrc();

    return elementTypeAnswer;
  }
}
