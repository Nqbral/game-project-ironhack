class MusicPlayer {
  constructor() {
    this.isPlaying = false;
    this.updateTimer = null;

    this.playPauseBtn = document.getElementById("playpause-track");
    this.seekSlider = document.getElementById("seek-slider");
    this.volumeSlider = document.getElementById("volume-slider");
    this.currentTime = document.getElementById("current-time");
    this.totalDuration = document.getElementById("total-duration");
    this.currentTrack = document.getElementById("audio-track");
    this.currentTrack.volume = "0.5";
  }

  loadTrack(src) {
    this.resetValues();

    this.currentTrack.src = src;
    this.currentTrack.load();
    this.playpauseTrack();

    this.currentTrack.addEventListener("ended", () => {
      this.endTrack();
    });

    this.updateTimer = setInterval(() => {
      this.seekUpdate();
    }, 1000);
  }

  resetValues() {
    clearInterval(this.updateTimer);
    this.currentTime.textContent = "00:00";
    this.totalDuration.textContent = "00:00";
    this.seekSlider.value = 0;
    this.isPlaying = false;
  }

  playpauseTrack() {
    if (!this.isPlaying) {
      this.playTrack();
      return;
    }
    this.pauseTrack();
  }

  playTrack() {
    this.currentTrack.play();
    this.isPlaying = true;

    this.playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }

  pauseTrack() {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }

  endTrack() {
    this.isPlaying = false;
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }

  seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    let seekto = this.currentTrack.duration * (this.seekSlider.value / 100);

    // Set the current track position to the calculated seek position
    this.currentTrack.currentTime = seekto;
  }

  setVolume() {
    this.currentTrack.volume = this.volumeSlider.value / 100;
  }

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
