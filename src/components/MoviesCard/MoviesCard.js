import {Link} from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard(props) {
  const isSaved = props.savedCards ? props.savedCards.some((savedMovie) => savedMovie.movieId === props.card.id) : false;
  const savedMovie = props.savedCards ? props.savedCards.find((savedMovie) => savedMovie.movieId === props.card.id) : null;

  const handleSaveButton = () => {
    props.onMovieAdding(props.card);
  }

  const handleRemoveButton = () => {
    if (props.card._id) {
      props.onDeletion(props.card);
    } else if (savedMovie._id) {
      props.onDeletion(savedMovie);
    }
  }

  return (
    <li className='card'>
      <div className='card__heading'>
        <h3 className='card__title'>{props.card.nameRU}</h3>
        <p className='card__duration'>{`${props.card.duration} минут`}</p>
      </div>
      <Link to={{pathname: props.card.trailerLink || props.card.trailer}} target='_blank'>
        <img className='card__image'
             src={props.card.image.url ? `https://api.nomoreparties.co${props.card.image.url}` : props.card.image}
             alt={`Постер к фильму ${props.card.nameRU}`}/>
      </Link>
      <button
        className={`card__button ${props.saved ? 'card__button_remove' : ''} ${isSaved ? 'card__button_saved' : ''}`}
        onClick={props.saved || isSaved ? handleRemoveButton : handleSaveButton}>{props.saved || isSaved ? '' : 'Сохранить'}</button>
    </li>
  )
}

export default MoviesCard;
