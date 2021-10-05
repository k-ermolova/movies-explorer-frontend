import MoviesCard from '../MoviesCard/MoviesCard';
import ShowMore from '../ShowMore/ShowMore';
import image_1 from '../../images/1.png';
import image_2 from '../../images/2.png';
import image_3 from '../../images/3.png';
import image_4 from '../../images/4.png';
import image_5 from '../../images/5.png';
import image_6 from '../../images/6.png';
import image_7 from '../../images/7.png';
import image_8 from '../../images/8.png';
import image_9 from '../../images/9.png';
import image_10 from '../../images/10.png';
import image_11 from '../../images/11.png';
import image_12 from '../../images/12.png';

import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <section className='cards movies__cards'>
      {props.type === 'saved' ? <ul className='cards-list'>
        <MoviesCard image={image_1} button='remove'/>
        <MoviesCard image={image_2} button='remove'/>
        <MoviesCard image={image_3} button='remove'/>
      </ul>
      : <><ul className='cards-list'>
          <MoviesCard image={image_1} saved={true}/>
          <MoviesCard image={image_2} saved={true}/>
          <MoviesCard image={image_3}/>
          <MoviesCard image={image_4}/>
          <MoviesCard image={image_5}/>
          <MoviesCard image={image_6} saved={true}/>
          <MoviesCard image={image_7} saved={true}/>
          <MoviesCard image={image_8}/>
          <MoviesCard image={image_9}/>
          <MoviesCard image={image_10}/>
          <MoviesCard image={image_11} saved={true}/>
          <MoviesCard image={image_12}/>
        </ul>
        <ShowMore/></>}
    </section>
  );
}

export default MoviesCardList;
