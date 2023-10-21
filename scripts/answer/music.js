class AnswerMusic extends Answer {
  constructor(answer, question, isAnswerOK, isAnswerGiven, numberQuestion) {
    super(answer, question, isAnswerOK, isAnswerGiven, numberQuestion);

    this.updateTimer = null;
  }

  generateTypeAnswer() {
    let elementTypeAnswer = document.createElement("div");
    elementTypeAnswer.classList.add("music-answer-question");

    elementTypeAnswer.appendChild(this.generateAudioTrack());
    elementTypeAnswer.appendChild(this.generatePlayPauseTrack());
    elementTypeAnswer.appendChild(this.generateTimeSlider());
    elementTypeAnswer.appendChild(this.generateVolumeSlider());

    return elementTypeAnswer;
  }

  generateAudioTrack() {
    let elementAudio = document.createElement("audio");
    elementAudio.classList.add("audio-track-answer");
    elementAudio.src = this.question.getMusicSrc();
    elementAudio.id = "audio-track-answer-" + this.numberQuestion;

    return elementAudio;
  }

  generatePlayPauseTrack() {
    let elementPlayPauseTrack = document.createElement("div");
    elementPlayPauseTrack.classList.add("play-pause-track-answer");
    elementPlayPauseTrack.id = "play-pause-track-answer-" + this.numberQuestion;

    let elementButton = document.createElement("i");
    elementButton.classList.add("fa", "fa-play-circle");

    elementPlayPauseTrack.appendChild(elementButton);

    return elementPlayPauseTrack;
  }

  generateTimeSlider() {
    let elementSlider = document.createElement("div");
    elementSlider.classList.add("slider-container-answer");
    elementSlider.id = "slider-time-answer-" + this.numberQuestion;

    let elementCurrentTime = document.createElement("div");
    elementCurrentTime.classList.add("current-time-answer");
    elementCurrentTime.id = "current-time-answer-" + this.numberQuestion;
    elementCurrentTime.innerHTML = "00:00";

    let elementInput = document.createElement("input");
    elementInput.classList.add("seek-slider-answer");
    elementInput.id = "seek-slider-answer-" + this.numberQuestion;
    elementInput.type = "range";
    elementInput.min = "1";
    elementInput.max = "100";
    elementInput.value = "0";

    let elementDuration = document.createElement("div");
    elementDuration.classList.add("total-duration-answer");
    elementDuration.id = "total-duration-answer-" + this.numberQuestion;
    elementDuration.innerHTML = "00:00";

    elementSlider.appendChild(elementCurrentTime);
    elementSlider.appendChild(elementInput);
    elementSlider.appendChild(elementDuration);

    return elementSlider;
  }

  generateVolumeSlider() {
    let elementSlider = document.createElement("div");
    elementSlider.classList.add("slider-container-answer");
    elementSlider.id = "slider-volume-answer-" + this.numberQuestion;

    let elementVolumeDown = document.createElement("i");
    elementVolumeDown.classList.add("fa", "fa-volume-down");

    let elementInput = document.createElement("input");
    elementInput.classList.add("volume-slider-answer");
    elementInput.id = "volume-slider-answer-" + this.numberQuestion;
    elementInput.type = "range";
    elementInput.min = "1";
    elementInput.max = "100";
    elementInput.value = "50";

    let elementVolumeUp = document.createElement("i");
    elementVolumeUp.classList.add("fa", "fa-volume-up");

    elementSlider.appendChild(elementVolumeDown);
    elementSlider.appendChild(elementInput);
    elementSlider.appendChild(elementVolumeUp);

    return elementSlider;
  }

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

  initListeners() {
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

  loadTrack() {
    this.currentTrack.load();

    this.updateTimer = setInterval(() => {
      this.seekUpdate();
    }, 1000);
  }

  playPauseTrack() {
    if (!this.currentTrack.classList.contains("playing")) {
      this.pauseAllTracks();
      this.playTrack();
      return;
    }
    this.pauseTrack();
  }

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

  playTrack() {
    this.currentTrack.play();
    this.currentTrack.classList.add("playing");

    this.playPauseBtn.innerHTML = '<i class="fa fa-pause-circle"></i>';
  }

  pauseTrack() {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle"></i>';
  }

  endTrack() {
    this.currentTrack.classList.remove("playing");
    this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle"></i>';
  }

  seekTo() {
    let seekto = this.currentTrack.duration * (this.seekSlider.value / 100);

    this.currentTrack.currentTime = seekto;
  }

  setVolume() {
    let audioTracks = document.getElementsByClassName("audio-track-answer");
    let sliderVolumes = document.getElementsByClassName("volume-slider-answer");

    for (let i = 0; i < audioTracks.length; i++) {
      let audio = audioTracks[i];
      let sliderVolume = sliderVolumes[i];

      sliderVolume.value = this.volumeSlider.value;
      audio.volume = this.volumeSlider.value / 100;
    }
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
