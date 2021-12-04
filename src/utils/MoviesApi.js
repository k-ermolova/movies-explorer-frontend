import {MOVIES_API_URL} from './constants';

class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _onError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._url, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(this._onError);
  }
}

export default new MoviesApi({
  baseUrl: MOVIES_API_URL,
});
