import MoviesCard from '../MoviesCard/MoviesCard';
import ShowMore from '../ShowMore/ShowMore';

import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <section className='cards movies__cards'>
      <ul className='cards-list'>
        {props.cards.map(card => <MoviesCard key={card.id} card={card}/>)}
      </ul>
    </section>
  );
}

export default MoviesCardList;
