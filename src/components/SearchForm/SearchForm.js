import './SearchForm.css';

function SearchForm() {
  return(
    <section className='search movies__search'>
      <form className='search__form'>
        <input className='search__input' placeholder='Фильм'/>
        <button className='search__button' type='submit'>Найти</button>
      </form>
    </section>
  );
}

export default SearchForm;
