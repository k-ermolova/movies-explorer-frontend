import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return(
    <main className='saved-movies'>
      <SearchForm/>
      <MoviesCardList type='saved'/>
    </main>
  )
}

export default SavedMovies;
