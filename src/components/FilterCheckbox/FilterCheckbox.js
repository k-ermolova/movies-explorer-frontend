import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return(
    <div className='filter'>
      <label htmlFor='toggle-button' className='filter__label'>Короткометражки</label>
      <input className='filter__checkbox' type='checkbox' id='toggle-button' onChange={props.onChange} checked={props.checked}/>
    </div>
  );
}

export default FilterCheckbox;
