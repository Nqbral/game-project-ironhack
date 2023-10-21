class Game {
  /**
   * Constructor Game
   *
   * @param {Leaderboard} leaderboard leaderboard
   * @param {MusicPlayer} musicPlayer music player
   * @param {Settings} settings settings
   */
  constructor(leaderboard, musicPlayer, settings) {
    this.leaderboard = leaderboard;
    this.musicPlayer = musicPlayer;
    this.settings = settings;
    this.questions = [];
    this.answers = [];
    this.indexQuestion = 0;
    this.questionInProgress = null;

    this.sectionQuizzPrep = document.getElementById("quizz-preparation");
    this.sectionQuizzGame = document.getElementById("quizz-game");
    this.sectionQuizzEnd = document.getElementById("quizz-end");
    this.startQuizzButton = document.getElementById(
      "quizz-preparation-start-quizz"
    );
    this.playerNameInput = document.getElementById("player-name-input");
    this.answerInput = document.getElementById("answer");
    this.buttonQuizzPass = document.getElementById("button-quizz-pass");
    this.buttonQuizzValidate = document.getElementById("button-quizz-validate");

    this.initListeners();
  }

  /**
   * Init the listeners
   */
  initListeners() {
    document.getElementById("start-menu").addEventListener("click", () => {
      this.settings.resetSettings();
    });

    this.startQuizzButton.addEventListener("click", () => {
      this.startGame();
    });

    this.buttonQuizzPass.addEventListener("click", () => {
      this.passQuestion();
    });

    this.buttonQuizzValidate.addEventListener("click", () => {
      this.validateQuestion();
    });

    this.playerNameInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.startGame();
      }
    });

    this.answerInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.validateQuestion();
      }
    });
  }

  /**
   * Start the game
   */
  async startGame() {
    if (this.checkValiditySettings().length > 0) {
      new ModalError(
        "Erreur lors de la saisie",
        "Vous n'avez pas saisi correctement le formulaire de préparation du quizz :",
        this.checkValiditySettings()
      );
      return;
    }

    this.player = new Player(this.playerNameInput.value);
    this.score = new Score(this.player);
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
   * Check the validity of errors
   */
  checkValiditySettings() {
    let listErrors = [];

    if (this.settings.themeQuestions === "") {
      listErrors.push("Veuillez sélectionner un thème.");
    }

    if (this.settings.typeQuestions.length === 0) {
      listErrors.push("Veuillez sélectionner au moins un type de questions.");
    }

    if (this.playerNameInput.value.length === 0) {
      listErrors.push("Veuillez saisir un nom de joueur.");
    }

    return listErrors;
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
    this.sectionQuizzGame.style.display = "flex";
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
    this.settings.resetSettings();
    this.playerNameInput.value = "";
    this.leaderboard.addScore(this.score);
    this.leaderboard.renderLeaderboard();
    this.renderEndQuizzSection();

    this.sectionQuizzGame.style.display = "none";
    this.sectionQuizzEnd.style.display = "flex";
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
