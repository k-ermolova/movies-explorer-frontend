import './MoviesCard.css';

function MoviesCard(props) {
  if (props.button === 'remove') {
    return(
      <li className='card'>
        <div className='card__heading'>
          <h3 className='card__title'>В погоне за Бенкси</h3>
          <p className='card__duration'>27 минут</p>
        </div>
        <img className='card__image' src={props.image} alt='Постер к фильму'/>
        <button className='card__button card__button_remove'/>
      </li>
    )
  }
  return(
    <li className='card'>
      <div className='card__heading'>
        <h3 className='card__title'>В погоне за Бенкси</h3>
        <p className='card__duration'>27 минут</p>
      </div>
      <img className='card__image' src={props.image} alt='Постер к фильму'/>
      {props.saved ? <button className='card__button card__button_saved'/> : <button className='card__button'>Сохранить</button>}
    </li>
  )
}

export default MoviesCard;
