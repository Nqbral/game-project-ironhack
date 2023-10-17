window.onload = function () {
  const navigator = new Navigator();
  const leaderboard = new Leaderboard();
  let game;

  const startQuizzButton = document.getElementById(
    "quizz-preparation-start-quizz"
  );

  startQuizzButton.addEventListener("click", () => {
    game = new Game(leaderboard);
    game.startGame();
  });
};
