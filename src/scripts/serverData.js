const apiUrl = "https://nomoreparties.co/v1/apf-cohort-202";
const token = "e19a2425-92bc-4aed-9290-450de7b4c487";

function getUsersData() {
    return fetch(`${apiUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
  }
  
  function getCards() {
    return fetch(`${apiUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  
  function sendEditProfile(name, about) {
    return fetch(`${apiUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }
  
  function addNewCard(name, link) {
    return fetch(`${apiUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }
  
  function deleteCard(cardId) {
    return fetch(`${apiUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }
  
  function likeCard(cardId) {
    return fetch(`${apiUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: token,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }
  
  function unlikeCard(cardId) {
    return fetch(`${apiUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }
  
  function updateAvatar(avatarUrl) {
    return fetch(`${apiUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }
  
  export {
    getUsersData,
    getCards,
    sendEditProfile,
    addNewCard,
    deleteCard,
    likeCard,
    unlikeCard,
    updateAvatar,
  };