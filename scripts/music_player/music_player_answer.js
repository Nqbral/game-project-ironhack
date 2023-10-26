class MusicPlayerAnswer extends MusicPlayer {
  /**
   * Constructor MusicPlayerAnswer
   *
   * @param {int} numberQuestion number of the question
   * @param {string} volumeMusicPlayerQuizz
   */
  constructor(numberQuestion, volumeMusicPlayerQuizz) {
    super();
    this.numberQuestion = numberQuestion;
    this.volumeMusicPlayerQuizz = volumeMusicPlayerQuizz;
  }

  /**
   * Init the getter elements for music player of the answer
   */
  initGetterElements() {
    this.currentTrack = document.getElementById(
      "audio-track-answer-" + this.numberQuestion
    );
    this.playPauseBtn = document.getElementById(
      "play-pause-track-answer-" + this.numberQuestion
    );
    this.seekSlider = document.getElementById(
      "seek-slider-answer-" + this.numberQuestion
    );
    this.volumeSlider = document.getElementById(
      "volume-slider-answer-" + this.numberQuestion
    );
    this.currentTime = document.getElementById(
      "current-time-answer-" + this.numberQuestion
    );
    this.totalDuration = document.getElementById(
      "total-duration-answer-" + this.numberQuestion
    );
  }

  /**
   * Init the volume of the track
   */
  initVolume() {
    this.currentTrack.volume = this.volumeMusicPlayerQuizz;
    this.volumeSlider.value = this.volumeMusicPlayerQuizz * 100;
  }

  /**
   * Load the track
   */
  loadTrack() {
    this.currentTrack.load();
    this.resetValues();

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
    if (!this.currentTrack.classList.contains("playing")) {
      this.pauseAllTracks();
      this.playTrack();
      return;
    }
    this.pauseTrack();
  }

  /**
   * Pause all tracks in the answers list
   */
  pauseAllTracks() {
    let audioTracks = document.getElementsByClassName("audio-track-answer");
    let playingButtons = document.getElementsByClassName(
      "play-pause-track-answer"
    );

    for (let i = 0; i < audioTracks.length; i++) {
      let audioTrack = audioTracks[i];
      let playingButton = playingButtons[i];

      if (audioTrack.classList.contains("playing")) {
        audioTrack.classList.remove("playing");
        audioTrack.pause();
        playingButton.innerHTML = '<i class="fa fa-play-circle"></i>';
      }
    }
  }

  /**
   * Play track of the answer
   */
  playTrack() {
    this.currentTrack.play();
    this.currentTrack.classList.add("playing");

    this.playPauseBtn.innerHTML = '<i class="fa fa-pause-circle"></i>';
  }

  /**
   * Pause track of the answer
   */
  pauseTrack() {
    this.currentTrack.pause();
    this.currentTrack.classList.remove("playing");
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle"></i>';
  }

  /**
   * End track of the answer
   */
  endTrack() {
    this.currentTrack.classList.remove("playing");
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle"></i>';
  }
}
