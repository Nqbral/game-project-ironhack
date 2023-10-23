class MusicPlayerQuizz extends MusicPlayer {
  /**
   * MusicPlayerQuizz constructor
   */
  constructor() {
    super();
    this.isPlaying = false;

    this.initGetterElements();
    this.initEventListeners();
    this.initVolume();
  }

  /**
   * Init the getter elements for music player quizz
   */
  initGetterElements() {
    this.playPauseBtn = document.getElementById("playpause-track");
    this.seekSlider = document.getElementById("seek-slider");
    this.volumeSlider = document.getElementById("volume-slider");
    this.currentTime = document.getElementById("current-time");
    this.totalDuration = document.getElementById("total-duration");
    this.currentTrack = document.getElementById("audio-track");
  }

  /**
   * Init the volume of the track
   */
  initVolume() {
    this.currentTrack.volume = "0.5";
  }

  /**
   * Load the track and play it
   *
   * @param {string} src music src
   */
  loadTrack(src) {
    this.resetValues();
    this.isPlaying = false;

    this.currentTrack.src = src;
    this.currentTrack.load();
    this.playPauseTrack();

    this.updateTimer = setInterval(() => {
      this.seekUpdate();
    }, 1000);
  }

  /**
   * Play or pause the track
   *
   * @returns
   */
  playPauseTrack() {
    if (!this.isPlaying) {
      this.playTrack();
      return;
    }
    this.pauseTrack();
  }

  /**
   * Play track
   */
  playTrack() {
    this.currentTrack.play();
    this.isPlaying = true;

    this.playPauseBtn.innerHTML = '<i class="fa fa-pause-circle"></i>';
  }

  /**
   * Pause track
   */
  pauseTrack() {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle"></i>';
  }

  /**
   * End track
   */
  endTrack() {
    this.isPlaying = false;
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle"></i>';
  }
}
