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
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  let moviesInput;

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
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/movies');
        }
      }).catch(err => {
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
      .then(data => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/movies');
        }
      }).catch(err => {
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
    localStorage.removeItem('jwt');
    history.push('/');
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      mainApi
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true)
        })
        .catch(err => console.log(err));
    }
  }

  const handleUpdateUserInfo = (name, email) => {
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => setCurrentUser(userData))
      .catch(err => console.log(err));
  }

  const handleErrorMessage = (err) => {
    setErrorMessage(err);
    setTimeout(() => setErrorMessage(''), 4000);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [history, loggedIn]);


  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          setCards(movies);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  const handleChange = (evt) => {
    moviesInput = evt.target.value;
  }

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSearchValue(moviesInput);
  }

  const checkContent = (title, input) => {
    return title.toLowerCase().includes(input.toLowerCase());
  }

  const filteredCards = cards.filter((value) => {
    if (checkContent(value.nameRU, searchValue)) {
      return value;
    }
    return '';
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {useRouteMatch(['/movies', '/saved-movies', '/profile']) ? (
        <Header desktopMenu={true} onMenu={handleOpening} isMenuOpened={isMenuOpened} onClose={handleClosing}/>) : ''}
      <Switch>
        <Route exact path='/'>
          <Header/>
          <Main/>
          <Footer/>
        </Route>
        <Route path='/signup'>
          <Register onRegister={handleRegister} onChange={handleInputChange} value={inputValue}
                    validation={useFormWithValidation} message={errorMessage}/>
        </Route>
        <Route path='/signin'>
          <Login onLogin={handleLogin} onChange={handleInputChange} value={inputValue}
                 validation={useFormWithValidation} message={errorMessage}/>
        </Route>
        <ProtectedRoute path='/movies' component={Movies} cards={filteredCards} onChange={handleChange}
                        onSubmit={handleSubmit} loggedIn={loggedIn}/>
        <ProtectedRoute path='/saved-movies' component={SavedMovies} loggedIn={loggedIn}/>
        <ProtectedRoute path='/profile' component={Profile} onLogOut={handleLogOut} loggedIn={loggedIn}
                        user={currentUser} onSubmit={handleUpdateUserInfo}/>
        <Route path='*'>
          <PageNotFound history={history}/>
        </Route>
      </Switch>
      {useRouteMatch(['/movies', '/saved-movies']) ? (<Footer/>) : ''}
    </CurrentUserContext.Provider>
  );
}

export default App;
