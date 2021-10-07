import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies(props) {
  return(
  <main className='movies'>
    <SearchForm onChange={props.onChange} onSubmit={props.onSubmit}/>
    <MoviesCardList cards={props.cards}/>
  </main>
  );
}

export default Movies;
