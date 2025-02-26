import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithApprove from '../components/PopupWithApprove.js';

const profileHeading = document.querySelector('.profile__heading');
const profileSubheading = document.querySelector('.profile__subheading');

const elements = '.elements';
const profileButtonEdit = document.querySelector('.profile__button-edit');
const addButtonEdit = document.querySelector('.profile__button-add');
const popupInputHeading = document.querySelector('.popup_type_edit').querySelector('.popup__input_text_heading');
const popupInputSubheading = document.querySelector('.popup_type_edit').querySelector('.popup__input_text_subheading');
const profileImage = document.querySelector('.profile__avatar');
const profileImageAvatar = document.querySelector('.profile__avatar-overlay');


const api = new Api({
  url:"https://mesto.nomoreparties.co/v1/",
  headers: {
    "content-type": "application/json",
    authorization: '35f0ed57-1593-40bb-bc35-702beba473b9'
  }
}) 

//функция открытия картинки
function handleImageClick(name, link) {
  popupImage.open(name, link);
}
//
function handleDelete(cardId, element) {
  popupApproveDeleteCard.open(cardId, element);
}

function handleLikeClick(cardId, element, isLiked){

  if(isLiked){
  api
    .addLike(cardId)
    .then((updatedCard) => {
      element.querySelector('.element__like-count').textContent = updatedCard.likes.length;
    })
    .catch((err)=>console.log(err));}
  else {
    api
    .removeLike(cardId)
    .then((updatedCard) => {
      element.querySelector('.element__like-count').textContent = updatedCard.likes.length;
    })
    .catch((err)=>console.log(err));
  }
}

//функция создания карточки
function createCard(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
  const card = new Card(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId);
  const newCard = card.generateCard();
  return newCard;
}


const list = new Section({
  items: [],
  renderer: (place) => {
      const cardElement = createCard(place, '.template', handleImageClick, handleDelete, handleLikeClick, user);     
      list.addItem(cardElement);
    },
  },
  elements);

Promise.all([api.getProfile('cohort-20/users/me'), api.getInitialCards('cohort-20/cards')])
  .then(([profileData, cards])=>{
    user.setUserInfo({ user: profileData.name, info: profileData.about, userId: profileData._id, avatar: profileData.avatar });
    list.renderItems(cards.map(item=>{
      return { name: item.name, link: item.link, likes: item.likes, ownerId: item.owner._id, cardId: item._id }
   }))
  })
  .catch(err=>console.log(err));

const user = new UserInfo({ user: profileHeading, info: profileSubheading, userId: null }, profileImage);

//ввод редактирования профиля
const handleProfileFormEditSubmit = ({ heading, subheading }, button) => {
  user.setUserInfo({ user: heading, info: subheading, avatar: profileImage.src });
/*   const loadElement = document.createElement('div');
  loadElement.classList.add('water');
  button.replaceWith(loadElement); */
  button.textContent = 'Сохранение...';
  api
    .addProfile({ name: heading, about: subheading }, 'cohort-20/users/me')
    .then(popupEdit.close())
    .catch((err)=>console.log(err))
    .finally(() => {
      loadElement.replaceWith(button);
      button.textContent = 'Сохранить';
    })

}

//фунция добавления карточки
const handleFormAddCard = ({ place, src }, button) => {
  button.textContent = 'Создание...';
  api
    .addCard({ name: place, link: src, likes: [] }, 'cohort-20/cards')
    .then(data => {
      const newCard = createCard({ name: place, link: src, likes: [], ownerId: data.owner._id, cardId: data._id }, '.template', handleImageClick, handleDelete, handleLikeClick, user);
  
      list.prependItem(newCard);
      popupAdd.close();
    })
    .catch((err)=>console.log(err))
    .finally(() => {
      button.textContent = 'Создать';
    })

  
}

function handleDeleteApprove(element, id) {
  api
    .removeCard(id)
    .catch((err)=>console.log(err));
  element.remove();
  popupApproveDeleteCard.close();
}



function handleSaveAvatar({ src }, button) {
  button.textContent = 'Сохранение...';
  api
    .addAvatar({avatar: src}, 'cohort-20/users/me/avatar')
    .then(data=>user.setUserInfo({ user: data.name, info: data.about, userId: data._id, avatar: src })
    )
    .then(popupAvatar.close())
    .catch((err)=>console.log(err))
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

//попапы
const popupEdit = new PopupWithForm('.popup_type_edit', handleProfileFormEditSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm('.popup_type_add', handleFormAddCard);
popupAdd.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_view-image');
popupImage.setEventListeners();
const popupApproveDeleteCard = new PopupWithApprove('.popup_type_delete', handleDeleteApprove);
popupApproveDeleteCard.setEventListeners();
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleSaveAvatar);
popupAvatar.setEventListeners();

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};
//валидаторы
const formValidatorEdit = new FormValidator(validationConfig, '.popup_type_edit');
const formValidatorAdd = new FormValidator(validationConfig, '.popup_type_add');
const formValidatorAvatarSrc = new FormValidator(validationConfig, '.popup_type_avatar');

//валидация форм
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatarSrc.enableValidation();


//открыть попап редактирования профиля
function handleProfileButtonEditClick() {
  formValidatorEdit.resetValidation();
  popupEdit.open();
  const currentUser = user.getUserInfo();
  popupInputHeading.value = currentUser.user;
  popupInputSubheading.value = currentUser.info;
}
//открыть попап редактирования профайла
profileButtonEdit.addEventListener('click', handleProfileButtonEditClick);

//открыть попап добавления места
addButtonEdit.addEventListener('click', () => {
  formValidatorAdd.resetValidation();
  popupAdd.open();
  }
);
//открыть попап изменение аватара
profileImageAvatar.addEventListener('click', () => {
  formValidatorAvatarSrc.resetValidation();
  popupAvatar.open();
});

