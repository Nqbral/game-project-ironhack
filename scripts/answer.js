class Answer {
  constructor(answer, question, isAnswerOK, isAnswerGiven, numberQuestion) {
    this.answer = answer;
    this.question = question;
    this.isAnswerOK = isAnswerOK;
    this.isAnswerGiven = isAnswerGiven;
    this.numberQuestion = numberQuestion;
  }

  generateHtmlAnswer() {
    let elementList = document.createElement("li");

    elementList.appendChild(this.generateTypeAnswer());

    let elementAnswerContent = document.createElement("div");
    elementAnswerContent.classList.add("answer-content");

    elementAnswerContent.appendChild(this.generateQuestion());
    elementAnswerContent.appendChild(this.generateAnswerGiven());
    elementAnswerContent.appendChild(this.genereateGoodAnswers());

    elementList.appendChild(elementAnswerContent);

    return elementList;
  }

  generateQuestion() {
    let elementQuestion = document.createElement("p");
    let question = this.question.getQuestion();

    elementQuestion.innerHTML = `Question ${this.numberQuestion} : ${question}`;

    return elementQuestion;
  }

  generateAnswerGiven() {
    let elementAnswerGiven = document.createElement("p");
    let spanClass = "wrong-answer";

    if (!this.isAnswerGiven) {
      elementAnswerGiven.innerHTML = `<span class="light-grey">Réponse donnée : <span class="${spanClass}">Pas de réponse</span>`;
      return elementAnswerGiven;
    }

    if (this.isAnswerOK) {
      spanClass = "good-answer";
    }

    elementAnswerGiven.innerHTML = `<span class="light-grey">Réponse donnée :</span> <span class="${spanClass}">${this.answer}</span>`;
    return elementAnswerGiven;
  }

  genereateGoodAnswers() {
    let elementGoodAnswers = document.createElement("p");
    let answersFormatted = this.question.answers.join(" OU ");

    elementGoodAnswers.innerHTML = `<span class="light-grey">Réponse(s) acceptée(s)</span> : ${answersFormatted}`;

    return elementGoodAnswers;
  }
}
