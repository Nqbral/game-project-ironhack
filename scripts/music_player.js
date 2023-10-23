class MusicPlayer {
  /**
   * Constructor music player
   */
  constructor() {
    this.updateTimer = null;
  }

  /**
   * Reset values of the music player
   */
  resetValues() {
    clearInterval(this.updateTimer);
    this.currentTime.textContent = "00:00";
    this.totalDuration.textContent = "00:00";
    this.seekSlider.value = 0;
  }

  /**
   * Init the event listeners for music player
   */
  initEventListeners() {
    this.playPauseBtn.addEventListener("click", () => {
      this.playPauseTrack();
    });

    this.seekSlider.addEventListener("change", () => {
      this.seekTo();
    });

    this.volumeSlider.addEventListener("change", () => {
      this.setVolume();
    });

    this.currentTrack.addEventListener("ended", () => {
      this.endTrack();
    });
  }

  /**
   * Set the timer according to the seek slider
   */
  seekTo() {
    let seekto = this.currentTrack.duration * (this.seekSlider.value / 100);

    this.currentTrack.currentTime = seekto;
  }

  /** Set the volume according to the volume slider */
  setVolume() {
    this.currentTrack.volume = this.volumeSlider.value / 100;
  }

  /**
   * Update the duration and current time
   */
  seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(this.currentTrack.duration)) {
      seekPosition =
        this.currentTrack.currentTime * (100 / this.currentTrack.duration);
      this.seekSlider.value = seekPosition;

      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(this.currentTrack.currentTime / 60);
      let currentSeconds = Math.floor(
        this.currentTrack.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(this.currentTrack.duration / 60);
      let durationSeconds = Math.floor(
        this.currentTrack.duration - durationMinutes * 60
      );

      // Add a zero to the single digit time values
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }

      // Display the updated duration
      this.currentTime.textContent = currentMinutes + ":" + currentSeconds;
      this.totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
}
