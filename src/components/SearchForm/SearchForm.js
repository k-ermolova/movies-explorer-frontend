import {useState} from 'react';
import {SEARCH_KEYWORD_INFO} from '../../utils/constants';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm(props) {
  const [value, setValue] = useState({
    saved: localStorage.valueForSaved ? JSON.parse(localStorage.valueForSaved) : '',
    all: localStorage.value ? JSON.parse(localStorage.value) : '',
  });
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    if (props.saved) {
      setValue({
        ...value,
        saved: evt.target.value,
      });
      if (value.saved === '') {
        setError(SEARCH_KEYWORD_INFO);
      }
    } else {
      setValue({
        ...value,
        all: evt.target.value,
      });
      if (value.all === '') {
        setError(SEARCH_KEYWORD_INFO);
      }
    }
  }

  const checkContent = (title, input) => {
    return title.toLowerCase().includes(input.toLowerCase());
  }

  const filteredCards = (cards, searchValue) => {
    return cards.filter((value) => {
      if (checkContent(value.nameRU, searchValue) || (value.nameEN !== null && checkContent(value.nameEN, searchValue))) {
        return value;
      }
      return '';
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.saved) {
      const savedMovies = filteredCards(props.savedCards, value.saved);
      props.setSavedCards(savedMovies);
      if (!savedMovies.length) {
        props.setSavedCards(() => props.savedCards);
      }
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      localStorage.setItem('valueForSaved', JSON.stringify(value.saved));
    } else {
      const allMovies = filteredCards(props.cards, value.all);
      props.setMovies(allMovies);
      localStorage.setItem('allMovies', JSON.stringify(allMovies));
      localStorage.setItem('value', JSON.stringify(value.all));
    }
  }

  const checkError = () => {
    if (props.saved) {
      return !value.saved
    } else return !value.all;
  }

  return (
    <section className='search movies__search'>
      <div className='search__container'>
        <form className='search__form' onSubmit={handleSubmit}>
          <input className='search__input' placeholder='Фильм' required onChange={handleChange} type='search'
                 name='search' value={props.saved ? value.saved : value.all}/>
          <p className={`search__error ${checkError() ? 'search__error_visible' : ''}`}>{error}</p>
          <button className='search__button' type='submit' disabled={checkError()}>Найти</button>
        </form>
        <FilterCheckbox onChange={props.onCheckbox} checked={props.checked} value=''/>
      </div>
    </section>
  );
}

export default SearchForm;
