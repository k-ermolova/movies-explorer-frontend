class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.statusText}`);
  }

  register(name, email, password) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}signin`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    }).then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._url}users/me`, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  addMovie(data) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.id,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._url}movies/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }
}

export default new MainApi({
  baseUrl: 'https://movies-explorer-ermolova.nomoredomains.club/api/',
});
