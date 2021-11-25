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

  const showMoreCards = () => {
    setVisible(previous => previous + showNum);
  }

  useMemo(() => setVisibleCards(), []);

  return(
  <main className='movies'>
    <SearchForm onChange={props.onChange} onSubmit={props.onSubmit} validation={props.validation}/>
    <MoviesCardList cards={props.cards} onShowMore={showMoreCards} visible={visible}/>
  </main>
  );
}

export default Movies;
