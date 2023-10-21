class ModalError {
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

  initTitle() {
    let titleModal = document.getElementById("title-modal");
    titleModal.innerHTML = this.title;
  }

  initMessage() {
    let messageModal = document.getElementById("modal-message");
    messageModal.innerHTML = this.message;
  }

  initErrors() {
    let listErrorsModal = document.getElementById("list-errors-modal");
    listErrorsModal.innerHTML = "";

    for (let i = 0; i < this.errors.length; i++) {
      let elementList = document.createElement("li");
      elementList.innerHTML = this.errors[i];
      listErrorsModal.appendChild(elementList);
    }
  }

  initListeners() {
    this.close.addEventListener("click", () => {
      this.closeModal();
    });
  }

  initModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
    this.close.removeEventListener("click", () => {
      this.closeModal();
    });
  }
}
