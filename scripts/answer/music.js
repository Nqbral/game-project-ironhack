class AnswerMusic extends Answer {
  /**
   * Constructor AnswerMusic
   *
   * @param {string} answer answer
   * @param {Question} question question
   * @param {bool} isAnswerOK is the answer ok according to the answers of the question
   * @param {bool} isAnswerGiven does the user give an answer
   * @param {int} numberQuestion number of the question in the quizz
   * @param {string} volumeMusicPlayerQuizz volume of the music player of the quizz
   */
  constructor(
    answer,
    question,
    isAnswerOK,
    isAnswerGiven,
    numberQuestion,
    volumeMusicPlayerQuizz
  ) {
    super(answer, question, isAnswerOK, isAnswerGiven, numberQuestion);

    this.musicPlayer = new MusicPlayerAnswer(
      numberQuestion,
      volumeMusicPlayerQuizz
    );
  }

  /**
   * Init the html code to display the answer
   *
   * @returns Element
   */
  generateTypeAnswer() {
    let elementTypeAnswer = document.createElement("div");
    elementTypeAnswer.classList.add("music-answer-question");

    elementTypeAnswer.appendChild(this.generateAudioTrack());
    elementTypeAnswer.appendChild(this.generatePlayPauseTrack());
    elementTypeAnswer.appendChild(this.generateTimeSlider());
    elementTypeAnswer.appendChild(this.generateVolumeSlider());

    return elementTypeAnswer;
  }

  /**
   * Init the html code for the audio track
   *
   * @returns Element
   */
  generateAudioTrack() {
    let elementAudio = document.createElement("audio");
    elementAudio.classList.add("audio-track-answer");
    elementAudio.src = this.question.getMusicSrc();
    elementAudio.id = "audio-track-answer-" + this.numberQuestion;

    return elementAudio;
  }

  /**
   * Init the html code to display the play pause button
   *
   * @returns Element
   */
  generatePlayPauseTrack() {
    let elementPlayPauseTrack = document.createElement("div");
    elementPlayPauseTrack.classList.add("play-pause-track-answer");
    elementPlayPauseTrack.id = "play-pause-track-answer-" + this.numberQuestion;

    let elementButton = document.createElement("i");
    elementButton.classList.add("fa", "fa-play-circle");

    elementPlayPauseTrack.appendChild(elementButton);

    return elementPlayPauseTrack;
  }

  /**
   * Init the html code to display the time slider
   *
   * @returns Element
   */
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

  /**
   * Init the html code to display the volume slider
   *
   * @returns Element
   */
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
}
