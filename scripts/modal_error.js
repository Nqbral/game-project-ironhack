class ModalError {
  /**
   * Constructor ModalError
   *
   * @param {string} title title
   * @param {string} message message
   * @param {[string]} errors list of errors
   */
  constructor(title, message, errors) {
    this.title = title;
    this.message = message;
    this.errors = errors;
    this.modal = document.getElementById("modal-error");
    this.close = document.getElementById("close-modal");

    this.initTitle();
    this.initMessage();
    this.initErrors();
    this.initListeners();
    this.initModal();
  }

  /**
   * Init the title of the modal
   */
  initTitle() {
    let titleModal = document.getElementById("title-modal");
    titleModal.innerHTML = this.title;
  }

  /**
   * Init the message of the modal
   */
  initMessage() {
    let messageModal = document.getElementById("modal-message");
    messageModal.innerHTML = this.message;
  }

  /**
   * Init the errors list of the modal
   */
  initErrors() {
    let listErrorsModal = document.getElementById("list-errors-modal");
    listErrorsModal.innerHTML = "";

    for (let i = 0; i < this.errors.length; i++) {
      let elementList = document.createElement("li");
      elementList.innerHTML = this.errors[i];
      listErrorsModal.appendChild(elementList);
    }
  }

  /**
   * Init the listeners of the modal
   */
  initListeners() {
    this.close.addEventListener("click", () => {
      this.closeModal();
    });
  }

  /**
   * Display the modal
   */
  initModal() {
    this.modal.style.display = "flex";
  }

  /**
   * Close the modal
   */
  closeModal() {
    this.modal.style.display = "none";
    this.close.removeEventListener("click", () => {
      this.closeModal();
    });
  }
}
