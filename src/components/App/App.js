import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import {useState, useEffect} from 'react';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import {useFormWithValidation} from '../../utils/Validation';
import {useCheckboxFilter} from '../../utils/MoviesFilter';
import {
  DUPLICATE_EMAIL_INFO,
  GENERAL_ERROR_INFO,
  INCORRECT_DATA_INFO,
  SUCCESS_INFO,
  WRONG_DATA_INFO
} from '../../utils/constants';

import './App.css';

function App() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('jwt')));
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState();
  const [disabledInputs, setDisabledInputs] = useState(false);

  const history = useHistory();

  const handleOpening = () => {
    setIsMenuOpened(true);
  }

  const handleClosing = () => {
    setIsMenuOpened(false);
  }

  const handleLogin = (userData) => {
    const {email, password} = userData;
    setDisabledInputs(true);
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
          handleErrorMessage(WRONG_DATA_INFO);
        } else if (err.status === 400) {
          handleErrorMessage(INCORRECT_DATA_INFO);
        } else {
          handleErrorMessage(GENERAL_ERROR_INFO);
        }
      })
      .finally(() => setDisabledInputs(false));
  }

  const handleRegister = (userData) => {
    const {name, email, password} = userData;
    setDisabledInputs(true);
    return mainApi
      .register(name, email, password)
      .then(() => handleLogin({email, password}))
      .catch(err => {
        if (err.status === 409) {
          handleErrorMessage(DUPLICATE_EMAIL_INFO);
        } else if (err.status === 400) {
          handleErrorMessage(INCORRECT_DATA_INFO);
        } else {
          handleErrorMessage(GENERAL_ERROR_INFO);
        }
      })
      .finally(() => setDisabledInputs(false));
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
    setDisabledInputs(true);
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        handleSuccessMessage(SUCCESS_INFO);
      })
      .catch(err => {
        if (err.status === 409) {
          handleErrorMessage(DUPLICATE_EMAIL_INFO);
        } else if (err.status === 400) {
          handleErrorMessage(INCORRECT_DATA_INFO);
        } else {
          handleErrorMessage(GENERAL_ERROR_INFO);
        }
      })
      .finally(() => setDisabledInputs(false));
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

  const handleSuccessMessage = (success) => {
    setSuccessMessage(success);
    setTimeout(() => setSuccessMessage(''), 2000);
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
        {!loggedIn && <Route exact path='/signup'>
          <Register onRegister={handleRegister} validation={useFormWithValidation} error={errorMessage}
                    disabledInputs={disabledInputs}/>
        </Route>}
        {!loggedIn && <Route exact path='/signin'>
          <Login onLogin={handleLogin} validation={useFormWithValidation} error={errorMessage}
                 disabledInputs={disabledInputs}/>
        </Route>}
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
                        error={errorMessage} success={successMessage} loading={loading}
                        disabledInputs={disabledInputs}/>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
      {useRouteMatch(['/movies', '/saved-movies']) ? (<Footer/>) : ''}
    </CurrentUserContext.Provider>
  );
}

export default App;
