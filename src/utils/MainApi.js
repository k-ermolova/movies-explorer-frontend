class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _onError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        'content-type': 'application/json',
      }
    }).then(this._onError);
  }

  updateUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._onError);
  }

  addMovie(data) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.id,
      }),
    }).then(this._onError);
  }

  deleteMovie(id) {
    return fetch(`${this._url}movies/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    }).then(this._onError);
  }
}

export default new MainApi({
  baseUrl: 'https://movies-explorer-ermolova.nomoredomains.club/api/',
});
