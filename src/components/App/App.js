import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import {useState, useEffect} from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import {useFormWithValidation} from '../../utils/Validation';
import {useCheckboxFilter} from '../../utils/MoviesFilter';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

function App() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('jwt')));
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const handleOpening = () => {
    setIsMenuOpened(true);
  }

  const handleClosing = () => {
    setIsMenuOpened(false);
  }

  const handleLogin = (userData) => {
    const {email, password} = userData;
    return mainApi
      .authorize(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck(data.token);
        }
      })
      .catch(err => {
        if (err.status === 401) {
          handleErrorMessage('Введен неверный логин или пароль.');
        } else if (err.status === 400) {
          handleErrorMessage('Проверьте формат введённых данных.');
        } else {
          handleErrorMessage('Что-то пошло не так...');
        }
      });
  }

  const handleRegister = (userData) => {
    const {name, email, password} = userData;
    return mainApi
      .register(name, email, password)
      .then(() => handleLogin({email, password}))
      .catch(err => {
        if (err.status === 409) {
          handleErrorMessage('Пользователь с указанным email уже существует.')
        } else if (err.status === 400) {
          handleErrorMessage('Проверьте формат введённых данных.');
        } else {
          handleErrorMessage('Что-то пошло не так...');
        }
      });
  }

  const handleLogOut = () => {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    history.push('/');
  }

  const tokenCheck = (jwt) => {
    mainApi
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push('/movies');
        }
      })
      .catch(err => console.log(`Ошибка ${err.status}: ${err.statusText}`));
  }

  const handleUpdateUserInfo = (name, email) => {
    setLoading(true);
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => setCurrentUser(userData))
      .catch(err => {
        if (err.status === 409) {
          handleErrorMessage('Пользователь с указанным email уже существует.')
        } else if (err.status === 400) {
          handleErrorMessage('Проверьте формат введённых данных.');
        } else {
          handleErrorMessage('Что-то пошло не так...');
        }
      })
      .finally(() => setLoading(false));
  }

  const handleMovieAdding = (movie) => {
    movie.owner = currentUser._id;
    mainApi.addMovie(movie)
      .then(movieData => setSavedCards([movieData, ...savedCards]))
      .catch(err => console.log(`Ошибка ${err.status}: ${err.statusText}`));
  }

  const handleMovieDeletion = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedCards(() => savedCards.filter((i) => i._id !== movie._id));
      })
      .catch(err => console.log(`Ошибка ${err.status}: ${err.statusText}`));
  }

  const handleErrorMessage = (err) => {
    setErrorMessage(err);
    setTimeout(() => setErrorMessage(''), 4000);
  }

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies(), mainApi.getSavedMovies()])
        .then(([userData, movies, savedMovies]) => {
          setCurrentUser(userData);
          setCards(movies);
          setSavedCards([...savedMovies.filter((movie) => movie.owner === userData._id)].reverse());
        })
        .catch(err => console.log(`Ошибка ${err.status}: ${err.statusText}`))
        .finally(() => setLoading(false));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {useRouteMatch(['/movies', '/saved-movies', '/profile']) ? (
        <Header loggedIn={loggedIn} onMenu={handleOpening} isMenuOpened={isMenuOpened} onClose={handleClosing}/>) : ''}
      <Switch>
        <Route exact path='/'>
          <Header loggedIn={loggedIn} onMenu={handleOpening} isMenuOpened={isMenuOpened} onClose={handleClosing}/>
          <Main/>
          <Footer/>
        </Route>
        <Route exact path='/signup'>
          <Register onRegister={handleRegister} validation={useFormWithValidation} message={errorMessage}/>
        </Route>
        <Route exact path='/signin'>
          <Login onLogin={handleLogin} validation={useFormWithValidation} message={errorMessage}/>
        </Route>
        <ProtectedRoute path='/movies' component={Movies}
                        loggedIn={loggedIn} cards={cards}
                        loading={loading} onMovieAdding={handleMovieAdding} savedCards={savedCards}
                        filter={useCheckboxFilter}
                        onDeletion={handleMovieDeletion}/>
        <ProtectedRoute path='/saved-movies' component={SavedMovies} savedCards={savedCards}
                        setSavedCards={setSavedCards}
                        onDeletion={handleMovieDeletion} filter={useCheckboxFilter}
                        loading={loading} loggedIn={loggedIn}/>
        <ProtectedRoute path='/profile' component={Profile} onLogOut={handleLogOut} loggedIn={loggedIn}
                        user={currentUser} onSubmit={handleUpdateUserInfo} validation={useFormWithValidation}
                        message={errorMessage} loading={loading}/>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
      {useRouteMatch(['/movies', '/saved-movies']) ? (<Footer/>) : ''}
    </CurrentUserContext.Provider>
  );
}

export default App;
