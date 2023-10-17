class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._token = localStorage.getItem("token"); //????
  }

  //вспомогательный метод
  _handleResponse(res) {
    if (res.ok) {
      console.log('res:', res);
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      // headers: this._headers
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
        // authorization:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIwZTgxZmNmMTBjMDI3OGNhNzY1MzYiLCJpYXQiOjE2OTY2NTY0ODEsImV4cCI6MTY5NzI2MTI4MX0.BsS76MQHpojcn650KIx-KQ3V5tKCcTvn2R0TI8v46uk",
      },
    }).then(this._handleResponse);
  }

  //отправляет запрос на добавление карточки на сервер
  setCard(newCardName, newCardLink) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
      }),
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      // headers: this._headers
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }

  //принимает имя и статус и отправляет его на сервер
  setUserId(newUserName, newUserStatus) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({
        name: newUserName,
        about: newUserStatus,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }

  //принимает ссылку на новый аватар и отправляет его на сервер
  setAvatar(newAvatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then(this._handleResponse);
  }
}

const token = localStorage.getItem("token");

//экземпляр класса Api с моими параметрами и токеном
const api = new Api({
  // url: "https://mesto.nomoreparties.co/v1/cohort-70",
  url: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
