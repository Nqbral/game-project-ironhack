window.onload = function () {
  let navigator = new Navigator();
  let leaderboard = new Leaderboard();
  let settings = new Settings();
  let musicPlayerQuizz = new MusicPlayerQuizz();
  let game = new Game(leaderboard, musicPlayerQuizz, settings);
};
