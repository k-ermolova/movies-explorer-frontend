import {useMemo, useState} from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

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
  const [isChecked, setIsChecked] = useState(true);

  const showMoreCards = () => {
    setVisible(previous => previous + showNum);
  };
  const featureFilms = props.cards.filter(card => card.duration > 40);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  useMemo(() => setVisibleCards(), []);

  return(
  <main className='movies'>
    <SearchForm onChange={props.onChange} onSubmit={props.onSubmit} validation={props.validation} onCheckbox={handleCheck} checked={isChecked}/>
    <MoviesCardList cards={isChecked ? props.cards : featureFilms} onShowMore={showMoreCards} visible={visible}/>
  </main>
  );
}

export default Movies;
