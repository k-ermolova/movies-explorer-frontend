import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import ShowMore from "../ShowMore/ShowMore";

function MoviesCardList() {
  return(
    <section className='cards movies__cards'>
      <ul className='cards-list'>
        <MoviesCard/>
      </ul>
      <ShowMore/>
    </section>
  );
}

export default MoviesCardList;
