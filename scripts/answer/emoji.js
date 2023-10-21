class AnswerEmoji extends Answer {
  constructor(answer, question, isAnswerOK, isAnswerGiven, numberQuestion) {
    super(answer, question, isAnswerOK, isAnswerGiven, numberQuestion);
  }

  generateTypeAnswer() {
    let elementTypeAnswer = document.createElement("div");
    elementTypeAnswer.classList.add("emoji-answer-question");

    elementTypeAnswer.innerHTML = this.question.emojis;

    return elementTypeAnswer;
  }
}
