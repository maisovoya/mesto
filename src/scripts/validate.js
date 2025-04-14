export default function setEventListeners(popup, popupForm) {
    const inputList = Array.from(popupForm.querySelectorAll(".popup__input"));
    const popupButton = popup.querySelector(".popup__button");
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(inputElement, popupForm);
        toggleButtonState(inputList, popupButton);
      });
    });
  }
  
  function toggleButtonState(inputList, popupButton) {
    if (hasInvalidInput(inputList)) {
      popupButton.disabled = true;
    } else {
      popupButton.disabled = false;
    }
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function checkInputValidity(popupInputTypeName, popupForm) {
    if (!popupInputTypeName.validity.valid) {
      showError(
        popupInputTypeName,
        popupInputTypeName.validationMessage,
        popupForm
      );
    } else {
      hideError(popupInputTypeName, popupForm);
    }
  }
  
  function showError(input, errorMessage, popupForm) {
    const popupInputError = popupForm.querySelector(`.${input.id}_error`);
    input.classList.add("popup__input_type_error");
    popupInputError.textContent = errorMessage;
    popupInputError.classList.add("popup__input_error");
  }
  
  function hideError(input, popupForm) {
    const popupInputError = popupForm.querySelector(`.${input.id}_error`);
    input.classList.remove("popup__input_type_error");
    popupInputError.classList.remove("popup__input_error");
    popupInputError.textContent = "";
  }