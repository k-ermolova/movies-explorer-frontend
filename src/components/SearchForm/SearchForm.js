import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm() {
  return(
    <section className='search movies__search'>
      <div className='search__container'>
        <form className='search__form'>
          <input className='search__input' placeholder='Фильм' required/>
          <button className='search__button' type='submit'>Найти</button>
        </form>
        <FilterCheckbox/>
      </div>
    </section>
  );
}

export default SearchForm;
