import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies(props) {
  const {checkboxState, handleCheckboxState, featureFilms} = props.filter({});

  return (
    <main className='saved-movies page__saved-movies'>
      <SearchForm saved={true} savedCards={props.savedCards}
                  setSavedCards={props.setSavedCards} onCheckbox={() => handleCheckboxState(true)} checked={checkboxState.saved}/>
      {props.loading ? <Preloader/> :
        <MoviesCardList cards={checkboxState.saved ? props.savedCards : featureFilms(props.savedCards)}
                        onDeletion={props.onDeletion} saved={true} message={props.message}/>}
    </main>
  )
}

export default SavedMovies;
