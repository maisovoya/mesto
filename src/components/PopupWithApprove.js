import Popup from './Popup.js';

export default class PopupWithApprove extends Popup {
  constructor(popupSelector, handleFormSubmit) { 
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(id, element) {
    super.open();
    this._id = id;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._element, this._id);
      }
    );
  }

}