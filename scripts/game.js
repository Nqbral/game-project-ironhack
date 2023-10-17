class Game {
  constructor(leaderboard) {
    this.player = new Player();
    this.settings = new Settings();
    this.score = new Score();
    this.leaderboard = leaderboard;
    this.questions = [];
    this.indexQuestion = 0;
    this.questionInProgress = null;
  }

  async loadJsonQuestions() {
    return await fetch(
      "../data/" + this.settings.themeQuestions + ".json"
    ).then((response) => response.json());
  }

  async initQuestions() {
    let jsonQuestions = await this.loadJsonQuestions();

    this.questions = this.shuffleQuestions(
      this.filterQuestions(jsonQuestions)
    ).slice(0, 10);
  }

  filterQuestions(questions) {
    return questions
      .filter((question) => {
        return this.settings.typeQuestions.includes(question.type);
      })
      .map((question) => {
        switch (question.type) {
          case "image":
            return new QuestionImage(
              question.src,
              this.settings.themeQuestions,
              question.answers
            );
          default:
            return null;
        }
      });
  }

  shuffleQuestions(questions) {
    for (let i = questions.length - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let intermediate = questions[i];
      questions[i] = questions[j];
      questions[j] = intermediate;
    }

    return questions;
  }

  showGame() {
    let sectionQuizzPrep = document.getElementById("quizz-preparation");
    let sectionQuizzGame = document.getElementById("quizz-game");

    sectionQuizzPrep.style.display = "none";
    sectionQuizzGame.style.display = "block";
  }

  async startGame() {
    await this.initQuestions().then(() => {
      this.questionInProgress = this.questions[this.indexQuestion];
      this.questionInProgress.renderQuestion();
      this.showGame();
    });
  }
}
