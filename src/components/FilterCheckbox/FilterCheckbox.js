import './FilterCheckbox.css';

function FilterCheckbox() {
  return(
    <div className='filter'>
      <label htmlFor='toggle-button' className='filter__label'>Короткометражки</label>
      <input className='filter__checkbox' type='checkbox' id='toggle-button' checked={true}/>
    </div>
  );
}

export default FilterCheckbox;
