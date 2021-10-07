import {Link} from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <li className='card'>
      <div className='card__heading'>
        <h3 className='card__title'>{props.card.nameRU}</h3>
        <p className='card__duration'>{`${props.card.duration} минут`}</p>
      </div>
      <Link to={{pathname: props.card.trailerLink}} target='_blank'>
        <img className='card__image' src={`https://api.nomoreparties.co${props.card.image.url}`} alt='Постер к фильму'/>
      </Link>
      <button className='card__button'>Сохранить</button>
    </li>
  )
}

export default MoviesCard;
