import "./styles/index.css";
import { drawCard } from "./scripts/card.js";
import { closeModal, openModal, eventModal } from "./scripts/modal.js";
import setEventListeners from "./scripts/validate.js";
import {
  getUsersData,
  sendEditProfile,
  addNewCard,
  updateAvatar,
} from "./scripts/serverData.js";

const editPopup = document.querySelector(".popup_type_edit");
const NewCardPopup = document.querySelector(".popup_type_new-card");
editPopup.classList.add("popup_is-animated");
NewCardPopup.classList.add("popup_is-animated");

const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const avatarImage = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");

avatarImage.addEventListener("click", () => {
  openModal(avatarPopup);
});

const popupClose = avatarPopup.querySelector(".popup__close");
popupClose.addEventListener("click", () => {
  closeModal(avatarPopup);
});

const avatarForm = avatarPopup.querySelector(".popup__form");

avatarForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const saveButton = avatarPopup.querySelector(".popup__button");

  saveButton.textContent = "Сохранение...";

  try {
    const avatarUrl = avatarForm.avatar.value;
    const updatedUserData = await updateAvatar(avatarUrl);

    avatarImage.style.backgroundImage = `url(${updatedUserData.avatar})`;
    closeModal(avatarPopup);
  } catch (error) {
    console.error("Ошибка при обновлении аватара:", error);
  } finally {
    saveButton.textContent = "Сохранить";
  }
});

export let currentUserId;

getUsersData()
  .then((result) => {
    profileImage.style.backgroundImage = `url(${result.avatar})`;
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    currentUserId = result._id;
    drawCard();
  })
  .catch((error) => {
    console.error("Ошибка при получении данных пользователя:", error);
  });

const popupInputIypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const popupInputIypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = document.querySelector(".popup__input_type_url");

drawCard(); // отрисовка карточек

// Редактирование профиля
const EditProfileButton = document.querySelector(".profile__edit-button");
EditProfileButton.addEventListener("click", () => {
  setEventListeners(editPopup, editPopup.querySelector(".popup__form")); // Валидация
  fillingProfileEditing(); // Начальное заполнение input'ов при появление поля редактирования профиля
  eventModal(editPopup, handleProfileFormSubmit); // открытие и отслеживание действий
});

const AddNewPlaceButton = document.querySelector(".profile__add-button");
AddNewPlaceButton.addEventListener("click", () => {
  popupInputIypeCardName.value = "";
  popupInputTypeUrl.value = "";
  NewCardPopup.querySelector(".popup__button").disabled = true;

  setEventListeners(NewCardPopup, NewCardPopup.querySelector(".popup__form"));
  eventModal(NewCardPopup, handleCardsFormSubmit);
});

function fillingProfileEditing() {
  popupInputIypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
}

async function handleProfileFormSubmit(event) {
  event.preventDefault();
  const saveButton = editPopup.querySelector(".popup__button");

  saveButton.textContent = "Сохранение...";

  try {
    const data = await sendEditProfile(
      popupInputIypeName.value,
      popupInputTypeDescription.value
    );

    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;

    closeModal(editPopup);
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
  } finally {
    saveButton.textContent = "Сохранить";
  }
}

async function handleCardsFormSubmit(event) {
  event.preventDefault();
  const saveButton = NewCardPopup.querySelector(".popup__button");

  saveButton.textContent = "Сохранение...";

  try {
    const newCardData = await addNewCard(
      popupInputIypeCardName.value,
      popupInputTypeUrl.value
    );

    drawCard(newCardData);
    closeModal(NewCardPopup);
  } catch (error) {
    console.error("Ошибка при добавлении новой карточки:", error);
  } finally {
    saveButton.textContent = "Создать";
  }
}