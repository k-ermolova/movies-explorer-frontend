import './Portfolio.css';

function Portfolio() {
  return(
  <section className='portfolio content__portfolio'>
    <h3 className='portfolio__title'>Портфолио</h3>
    <ul className='portfolio__list'>
      <li className='portfolio__item'>Статичный сайт</li>
      <li className='portfolio__item'>Адаптивный сайт</li>
      <li className='portfolio__item'>Одностраничное приложение</li>
    </ul>
  </section>
  );
}

export default Portfolio;
