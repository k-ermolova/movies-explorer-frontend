import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import './SavedMovies.css';

function SavedMovies() {
  return(
    <main className='saved-movies page__saved-movies'>
      <SearchForm/>
      <MoviesCardList type='saved'/>
    </main>
  )
}

export default SavedMovies;
