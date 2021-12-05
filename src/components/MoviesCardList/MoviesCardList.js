import MoviesCard from '../MoviesCard/MoviesCard';
import ShowMore from '../ShowMore/ShowMore';

import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <section className='cards movies__cards'>
      {!props.cards.length ? (<p
        className='cards__message'>Ничего не найдено</p>) : ''}
      <ul className='cards-list'>
        {props.cards.slice(0, props.visible).map(card => <MoviesCard key={card.id || card.movieId} card={card}
                                                                     onMovieAdding={props.onMovieAdding}
                                                                     onDeletion={props.onDeletion}
                                                                     saved={props.saved}
                                                                     savedCards={props.savedCards}/>)}
      </ul>
      {props.cards.length > props.visible && <ShowMore onShowMore={props.onShowMore}/>}
    </section>
  );
}

export default MoviesCardList;
