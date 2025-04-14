import { currentUserId } from "../index.js";
import { closeModal, openModal, eventModal } from "./modal.js";
import { getCards, deleteCard, likeCard, unlikeCard } from "./serverData.js";

const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");

const popupTypeImage = document.querySelector(".popup_type_image");
popupTypeImage.classList.add("popup_is-animated");

function drawCard(newCardData = null) {
  placesList.innerHTML = "";
  getCards()
    .then((cards) => {
      cards.forEach((cardData) => {
        placesList.append(createCard(cardData));
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function createCard({ name, link, likes, owner, _id }) {
  const cardEl = cardTemplate.content.cloneNode(true);
  const cardImage = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  const cardLikeButton = cardEl.querySelector(".card__like-button");
  const cardLikeCount = cardEl.querySelector(".card__like-count");
  const cardDeleteButton = cardEl.querySelector(".card__delete-button");

  cardImage.alt = name;
  cardImage.src = link;
  cardTitle.textContent = name;
  cardLikeCount.textContent = likes.length;

  const isLiked = likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик клика для открытия попапа с изображением
  cardImage.addEventListener("click", () => {
    const popupImage = document.querySelector(".popup_type_image"); // Выбор попапа с изображением
    const popupImageSrc = popupImage.querySelector(".popup__image"); // Элемент для отображения изображения
    const popupImageCaption = popupImage.querySelector(".popup__caption"); // Элемент для подписи

    popupImageSrc.src = link; // Устанавливаем источник изображения
    popupImageCaption.textContent = name; // Устанавливаем подпись
    openModal(popupImage); // Открываем попап
  });

  cardLikeButton.addEventListener("click", () => {
    if (isLiked) {
      unlikeCard(_id)
        .then((updatedCard) => {
          cardLikeButton.classList.remove("card__like-button_is-active");
          cardLikeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error("Ошибка при снятии лайка:", err);
        });
    } else {
      likeCard(_id)
        .then((updatedCard) => {
          cardLikeButton.classList.add("card__like-button_is-active");
          cardLikeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error("Ошибка при постановке лайка:", err);
        });
    }
  });

  if (owner._id !== currentUserId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(_id)
        .then(() => {
          drawCard();
        })
        .catch((err) => {
          console.error("Ошибка при удалении карточки:", err);
        });
    });
  }

  return cardEl;
}

export { drawCard };