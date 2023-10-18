const musicPlayer = new MusicPlayer();

window.onload = function () {
  const navigator = new Navigator();
  const leaderboard = new Leaderboard();
  let game = new Game(leaderboard, musicPlayer);

  const startQuizzButton = document.getElementById(
    "quizz-preparation-start-quizz"
  );
  const inputAnswer = document.getElementById("answer");
  const buttonQuizzPass = document.getElementById("button-quizz-pass");
  const buttonQuizzValidate = document.getElementById("button-quizz-validate");

  startQuizzButton.addEventListener("click", () => {
    game.setSettings();
    game.startGame();
  });
  buttonQuizzPass.addEventListener("click", () => {
    game.passQuestion();
  });

  buttonQuizzValidate.addEventListener("click", () => {
    game.validateQuestion();
  });

  inputAnswer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonQuizzValidate.click();
    }
  });
};
