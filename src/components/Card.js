export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardUserId = data.ownerId;
    this._cardId = data.cardId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    //выбор темплейта
    const cardElement =
      this._cardUserId === this._userId.getUserInfo().userId
        ? document
            .querySelector(`${this._cardSelector}_delete_present`)
            .content.cloneNode(true)
        : document
            .querySelector(`${this._cardSelector}_delete_empty`)
            .content.cloneNode(true);
    this._cardImage = cardElement.querySelector('.element__photo');
    this._cardElementSelector = cardElement.querySelector('.element');
    return cardElement;
  }
  //like
  _handleLikeIcon(event) {
    event.target.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__like')
      .addEventListener('click', (event) => {
        this._handleLikeIcon(event);
        const isLiked = event.target.classList.contains('element__like_active');
        this._handleLikeClick(this._cardId, this._cardElementSelector, isLiked);
      });

    //delслушатель для своих карточек
    if (this._cardUserId === this._userId.getUserInfo().userId) {
      this._element
        .querySelector('.element__delete')
        .addEventListener('click', () =>
          this._handleDeleteClick(this._cardId, this._cardElementSelector)
        );
    }

    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    this._element.querySelector('.element__heading').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name} (фото)`;
    this._element.querySelector('.element__like-count').textContent =
      this._likes.length;
    this._setLikes();
    return this._element;
  }

  _setLikes() {
    const a = this._likes.map((item) => item._id);
    const b = this._userId.getUserInfo().userId;
    if (
      a.some(function (x) {
        return x === b;
      })
    ) {
      this._element
        .querySelector('.element__like')
        .classList.add('element__like_active');
    }
  }
}
