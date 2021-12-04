import {useEffect, useMemo, useState} from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

let initialNum;
let showNum;

const setVisibleCards = () => {
  if (window.innerWidth >= 1280) {
    initialNum = 12;
    showNum = 3;
  } else if (window.innerWidth >= 768) {
    initialNum = 8;
    showNum = 2;
  } else {
    initialNum = 5;
    showNum = 2;
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
