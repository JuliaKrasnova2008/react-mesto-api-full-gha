class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(response) {
    //принимает ответ от сервера
    if (response.ok) {
      return response.json(); //парсинг, переводим json в форма понятный для js
    }
    return Promise.reject(`Произошла ошибка: ${response.status}`); //отлавливаем ошибку
  }
  //функция, которая отправляет запрос на сервер
  _request(url, options) {
    //ассинхронный запрос на сервер
    return fetch(url, options).then(this._handleResponse);
  }

  register(body) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  login(body) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  checkToken(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
});
