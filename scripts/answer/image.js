class AnswerImage extends Answer {
  constructor(answer, question, isAnswerOK, isAnswerGiven, numberQuestion) {
    super(answer, question, isAnswerOK, isAnswerGiven, numberQuestion);
  }

  generateTypeAnswer() {
    let elementTypeAnswer = document.createElement("img");
    elementTypeAnswer.classList.add("image-answer-question");

    elementTypeAnswer.src = this.question.getImageSrc();

    return elementTypeAnswer;
  }
}
