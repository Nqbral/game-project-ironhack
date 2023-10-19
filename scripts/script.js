let musicPlayer = new MusicPlayer();

window.onload = function () {
  let navigator = new Navigator();
  let leaderboard = new Leaderboard();
  let settings = new Settings();
  let game = new Game(leaderboard, musicPlayer, settings);
};
