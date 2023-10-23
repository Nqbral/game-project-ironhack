class Settings {
  /**
   * Constructor Settings
   */
  constructor() {
    this.themeQuestions = "";
    this.typeQuestions = [];
    this.themeList = document.getElementById("theme-selector");
    this.questionTypeList = document.getElementById("question-types-selector");

    this.resetSettings();
    this.initListEventListeners();
  }

  /**
   * Init the event listeners for all the element of the lists (theme, question type)
   */
  initListEventListeners() {
    let childrenThemeList = this.themeList.children;
    let childrenQuestionTypeList = this.questionTypeList.children;
    let child;

    for (let i = 0; i < childrenThemeList.length; i++) {
      child = childrenThemeList[i];

      child.addEventListener("click", (event) => {
        this.selectTheme(event.target);
      });
    }

    for (let i = 0; i < childrenQuestionTypeList.length; i++) {
      child = childrenQuestionTypeList[i];

      child.addEventListener("click", (event) => {
        this.selectTypeQuestion(event.target);
      });
    }
  }

  /**
   * Select theme
   *
   * @param {Element} element
   */
  selectTheme(element) {
    this.themeQuestions = "";
    let valueAttributeElement = element.getAttribute("value");

    element.classList.toggle("selected");

    if (!element.classList.contains("selected")) {
      return;
    }

    this.themeQuestions = valueAttributeElement;
    let childrenThemeList = this.themeList.children;

    for (let i = 0; i < childrenThemeList.length; i++) {
      let child = childrenThemeList[i];
      if (child.getAttribute("value") !== valueAttributeElement) {
        child.classList.remove("selected");
      }
    }
  }

  /**
   * Select type question
   *
   * @param {Element} element
   */
  selectTypeQuestion(element) {
    element.classList.toggle("selected");
    let valueAttributeElement = element.getAttribute("value");

    if (element.classList.contains("selected")) {
      this.typeQuestions.push(valueAttributeElement);
      return;
    }

    let index = this.typeQuestions.indexOf(valueAttributeElement);
    if (index !== -1) {
      this.typeQuestions.splice(index, 1);
    }
  }

  /**
   * Reset settings
   */
  resetSettings() {
    this.resetThemeSettings();
    this.resetQuestionTypesSettings();
  }

  /**
   * Reset theme settings
   */
  resetThemeSettings() {
    this.themeQuestions = "anime";
    let childrenThemeList = this.themeList.children;

    for (let i = 0; i < childrenThemeList.length; i++) {
      let child = childrenThemeList[i];
      child.classList.remove("selected");

      if (child.getAttribute("value") === this.themeQuestions) {
        child.classList.add("selected");
      }
    }
  }

  /**
   * Reset question type settings
   */
  resetQuestionTypesSettings() {
    this.typeQuestions = ["image", "emojis", "music"];
    let childrenQuestionTypeList = this.questionTypeList.children;

    for (let i = 0; i < childrenQuestionTypeList.length; i++) {
      let child = childrenQuestionTypeList[i];
      child.classList.remove("selected");

      if (this.typeQuestions.includes(child.getAttribute("value"))) {
        child.classList.add("selected");
      }
    }
  }
}
