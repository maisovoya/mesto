function openModal(popup) {
  popup.classList.add("popup_is-opened");

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });

  const popupClose = popup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    closeModal(popup);
  });
  document.addEventListener("keydown", closeByEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

function eventModal(popup, handle) {
  const popupClose = popup.querySelector(".popup__close");
  const popupForm = popup.querySelector(".popup__form");

  openModal(popup);

  popupClose.addEventListener("click", () => {
    closeModal(popup);
  });

  popupForm.addEventListener("submit", handle);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export { openModal, closeModal, eventModal };