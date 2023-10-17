class Question {
  /**
   *
   * @param {*} themeQuestion
   * @param {*} responses
   */
  constructor(themeQuestion, responses) {
    this.themeQuestion = themeQuestion;
    this.responses = responses;
  }

  /**
   * Check if the response given by the user is OK
   *
   * @param {string} responseUser response from the user
   *
   * @returns bool
   */
  checkResponse(responseUser) {
    let lowerCaseResponses = this.responses.map((response) =>
      this.removeAccent(response).toLowerCase()
    );

    return lowerCaseResponses.includes(
      this.removeAccent(responseUser).toLowerCase()
    );
  }

  /**
   * Remove accents from a string
   *
   * @param {string} str
   *
   * @returns string
   */
  removeAccent(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
