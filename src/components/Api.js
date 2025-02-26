const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("ОшибкаFehler");
};

export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //профиль
  getProfile(link) {
    return fetch(`${this._url}${link}`, {
      headers: this._headers
    }).then(onError);
  }

  //карточки
  getInitialCards(link) {
    return fetch(`${this._url}${link}`, {
      headers: this._headers
    }).then(onError);
  }

  //добавить данные профиля на сервер
  addProfile(data, link) {
    return fetch(`${this._url}${link}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onError);
  }
  //добавление новой карточки
  addCard(data, link) {
    return fetch(`${this._url}${link}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onError);
  }

  removeCard(id) {
    return fetch(`${this._url}cohort-20/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError);
  }

  addLike(id) {
    return fetch(`${this._url}cohort-20/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(onError);
  }

  removeLike(id) {
    return fetch(`${this._url}cohort-20/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError);
  }

  addAvatar(data, link) {
    return fetch(`${this._url}${link}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onError);
  }
}
