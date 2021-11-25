import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm(props) {
  return(
    <section className='search movies__search'>
      <div className='search__container'>
        <form className='search__form' onSubmit={props.onSubmit}>
          <input className='search__input' placeholder='Фильм' required onChange={props.onChange}/>
          <button className='search__button' type='submit'>Найти</button>
        </form>
        <FilterCheckbox onChange={props.onCheckbox} checked={props.checked}/>
      </div>
    </section>
  );
}

export default SearchForm;
