import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return(
    <section className='search movies__search'>
      <div className='search__container'>
        <form className='search__form'>
          <input className='search__input' placeholder='Фильм'/>
          <button className='search__button' type='submit'>Найти</button>
        </form>
        <FilterCheckbox/>
      </div>
    </section>
  );
}

export default SearchForm;
