class Game {
  /**
   * Constructor Game
   *
   * @param {Leaderboard} leaderboard leaderboard
   * @param {MusicPlayer} musicPlayer music player
   */
  constructor(leaderboard, musicPlayer) {
    this.leaderboard = leaderboard;
    this.musicPlayer = musicPlayer;
    this.questions = [];
    this.answers = [];
    this.indexQuestion = 0;
    this.questionInProgress = null;

    this.sectionQuizzPrep = document.getElementById("quizz-preparation");
    this.sectionQuizzGame = document.getElementById("quizz-game");
    this.sectionQuizzEnd = document.getElementById("quizz-end");
    this.answerInput = document.getElementById("answer");
  }

  /**
   * Start the game
   */
  async startGame() {
    this.indexQuestion = 0;
    this.questions = [];
    this.answers = [];

    await this.initQuestions().then(() => {
      this.questionInProgress = this.questions[this.indexQuestion];
      this.questionInProgress.displayQuestion();
      this.showGame();
    });
  }

  /**
   * Set settings got from quizz preparation section
   */
  setSettings() {
    //TODO : utiliser la section preparation
    this.player = new Player();
    this.settings = new Settings();
    this.score = new Score(this.player);
  }

  /**
   * Load all the question from the json file according to the theme selected
   *
   * @returns array
   */
  async loadJsonQuestions() {
    return await fetch(
      "../data/" + this.settings.themeQuestions + ".json"
    ).then((response) => response.json());
  }

  /**
   * Init the questions that will be displayed for the questions
   */
  async initQuestions() {
    let jsonQuestions = await this.loadJsonQuestions();

    this.questions = this.shuffleQuestions(
      this.filterQuestions(jsonQuestions)
    ).slice(0, 5);
  }

  /**
   * Filter the questions according to the type of questions according to the settings
   * Init an array with object Question (children class only)
   *
   * @param {array} questions questions got from json file
   *
   * @returns array
   */
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
          case "emojis":
            return new QuestionEmoji(
              question.emojis,
              this.settings.themeQuestions,
              question.answers
            );
          case "music":
            return new QuestionMusic(
              question.src,
              this.settings.themeQuestions,
              question.answers,
              this.musicPlayer
            );
          default:
            console.log(`Question type ${question.type} not handled.`);
            return null;
        }
      });
  }

  /**
   * Shuffle all the questions selected
   *
   * @param {array} questions questions filtered
   *
   * @returns array
   */
  shuffleQuestions(questions) {
    for (let i = questions.length - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let intermediate = questions[i];
      questions[i] = questions[j];
      questions[j] = intermediate;
    }

    return questions;
  }

  /**
   * Display the quizz game section
   */
  showGame() {
    this.sectionQuizzPrep.style.display = "none";
    this.sectionQuizzGame.style.display = "block";
  }

  /**
   * Validate the question and update the score if ok and display then next question
   */
  validateQuestion() {
    if (this.questionInProgress.checkResponse(this.answerInput.value)) {
      this.score.score++;
    }

    this.answers.push(this.answerInput.value);
    this.nextQuestion();
  }

  /**
   * Pass the question and display the next section
   */
  passQuestion() {
    this.answers.push("");
    this.nextQuestion();
  }

  /**
   * Display the next question or end the game if it's over
   */
  nextQuestion() {
    if (this.musicPlayer.isPlaying) {
      this.musicPlayer.pauseTrack();
      this.musicPlayer.resetValues();
    }

    this.indexQuestion++;
    this.answerInput.value = "";

    if (this.indexQuestion >= this.questions.length) {
      this.endGame();
      return;
    }

    this.questionInProgress = this.questions[this.indexQuestion];
    this.questionInProgress.displayQuestion();
  }

  /**
   * End the game : show the end section, add score and update leaderboard
   */
  endGame() {
    this.leaderboard.addScore(this.score);
    this.leaderboard.renderLeaderboard();
    this.renderEndQuizzSection();

    this.sectionQuizzGame.style.display = "none";
    this.sectionQuizzEnd.style.display = "block";
  }

  /**
   * Update the HTML end quizz section to display the score and answers
   */
  renderEndQuizzSection() {
    let paragraphScore = document.getElementById("paragraph-score");

    paragraphScore.innerHTML = `${this.score.score} réponses validées pour ${this.questions.length} questions !`;

    //TODO display answers avec erreur ou validé etc...
  }
}
