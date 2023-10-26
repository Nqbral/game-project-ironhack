class Answer {
  /**
   * Constructor Answer
   *
   * @param {string} answer answer
   * @param {Question} question question
   * @param {bool} isAnswerOK is the answer ok according to the answers of the question
   * @param {bool} isAnswerGiven does the user give an answer
   * @param {int} numberQuestion number of the question in the quizz
   */
  constructor(answer, question, isAnswerOK, isAnswerGiven, numberQuestion) {
    this.answer = answer;
    this.question = question;
    this.isAnswerOK = isAnswerOK;
    this.isAnswerGiven = isAnswerGiven;
    this.numberQuestion = numberQuestion;
  }

  /**
   * Init the html code to display the answer
   *
   * @returns Element
   */
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

  /**
   * Init the html code to display the question of the answer
   *
   * @returns Element
   */
  generateQuestion() {
    let elementQuestion = document.createElement("p");
    let question = this.question.getQuestion();

    elementQuestion.innerHTML = `Question ${this.numberQuestion} : ${question}`;

    return elementQuestion;
  }

  /**
   * Init the html code to display the answer given by the user
   *
   * @returns Element
   */
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

  /**
   * Init the html code to display the good answers of the question
   *
   * @returns Element
   */
  genereateGoodAnswers() {
    let elementGoodAnswers = document.createElement("p");
    let answersFormatted = this.question.answers.join(" OU ");

    elementGoodAnswers.innerHTML = `<span class="light-grey">Réponse(s) acceptée(s)</span> : ${answersFormatted}`;

    return elementGoodAnswers;
  }
}
