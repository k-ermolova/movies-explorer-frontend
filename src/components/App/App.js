import {Route, Switch} from 'react-router-dom';
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

import './App.css';

function App() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  let moviesInput;

  const handleOpening = () => {
    setIsMenuOpened(true);
  }

  const handleClosing = () => {
    setIsMenuOpened(false);
  }

  useEffect(() => {
    moviesApi.getMovies()
      .then(cards => setCards(cards))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (evt) => {
    moviesInput = evt.target.value;
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
  });

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Header/>
          <Main/>
          <Footer/>
        </Route>
        <Route path='/movies'>
          <Header desktopMenu={true} onMenu={handleOpening} isMenuOpened={isMenuOpened} onClose={handleClosing}/>
          <Movies cards={filteredCards} onChange={handleChange} onSubmit={handleSubmit}/>
          <Footer/>
        </Route>
        {/*<Route path='/saved-movies'>*/}
        {/*  <Header desktopMenu={true} onMenu={handleOpening} isMenuOpened={isMenuOpened} onClose={handleClosing}/>*/}
        {/*  <SavedMovies/>*/}
        {/*  <Footer/>*/}
        {/*</Route>*/}
        <Route path='/profile'>
          <Header desktopMenu={true} onMenu={handleOpening} isMenuOpened={isMenuOpened} onClose={handleClosing}/>
          <Profile/>
        </Route>
        <Route path='/signup'>
          <Register/>
        </Route>
        <Route path='/signin'>
          <Login/>
        </Route>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
