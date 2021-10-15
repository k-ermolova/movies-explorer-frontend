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

  const history = useHistory();

  let moviesInput;

  const handleOpening = () => {
    setIsMenuOpened(true);
  }

  const handleClosing = () => {
    setIsMenuOpened(false);
  }

  const handleLogin = ({email, password}) => {
    return mainApi
      .authorize(email, password)
      .then(data => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/movies');
        }
      }).catch(err => console.log(err));
  }

  const handleRegister = ({name, email, password}) => {
    return mainApi
      .register(name, email, password)
      .then(data => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/movies');
        }
      }).catch(err => console.log(err));
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

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn, history]);


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
          <Register onRegister={handleRegister} onChange={handleInputChange} value={inputValue}/>
        </Route>
        <Route path='/signin'>
          <Login onLogin={handleLogin} onChange={handleInputChange} value={inputValue}/>
        </Route>
        <ProtectedRoute path='/movies' component={Movies} cards={filteredCards} onChange={handleChange}
                        onSubmit={handleSubmit} loggedIn={loggedIn}/>
        <ProtectedRoute path='/saved-movies' component={SavedMovies} loggedIn={loggedIn}/>
        <ProtectedRoute path='/profile' component={Profile} onLogOut={handleLogOut} loggedIn={loggedIn}/>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
      {useRouteMatch(['/movies', '/saved-movies']) ? (<Footer/>) : ''}
    </CurrentUserContext.Provider>
  );
}

export default App;
