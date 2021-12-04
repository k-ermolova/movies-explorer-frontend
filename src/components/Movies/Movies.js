import {useEffect, useMemo, useState} from 'react';
import {DESKTOP_WIDTH, TABLET_WIDTH, CARDS_CONFIG} from '../../utils/constants';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

let initialNum;
let showNum;

const setVisibleCards = () => {
  if (window.innerWidth >= DESKTOP_WIDTH) {
    initialNum = CARDS_CONFIG.desktop.initial;
    showNum = CARDS_CONFIG.desktop.more;
  } else if (window.innerWidth >= TABLET_WIDTH) {
    initialNum = CARDS_CONFIG.tablet.initial;
    showNum = CARDS_CONFIG.tablet.more;
  } else {
    initialNum = CARDS_CONFIG.mobile.initial;
    showNum = CARDS_CONFIG.mobile.more;
  }
}

function Movies(props) {
  const [visible, setVisible] = useState(initialNum);
  const [movies, setMovies] = useState([]);
  const {checkboxState, handleCheckboxState, featureFilms} = props.filter({});

  useEffect(() => {
    if (localStorage.allMovies) {
      setMovies(() => JSON.parse(localStorage.allMovies));
    }
  }, [])

  const showMoreCards = () => {
    setVisible(previous => previous + showNum);
  };

  useMemo(() => setVisibleCards(), []);

  return (
    <main className='movies'>
      <SearchForm cards={props.cards} setMovies={setMovies}
                  onCheckbox={() => handleCheckboxState(false)} checked={checkboxState.all}/>
      {props.loading ? <Preloader/> :
        <MoviesCardList cards={checkboxState.all ? movies : featureFilms(movies)} initialCards={props.cards} onShowMore={showMoreCards} visible={visible}
                        onMovieAdding={props.onMovieAdding} onDeletion={props.onDeletion}
                        savedCards={props.savedCards}/>}
    </main>
  );
}

export default Movies;
