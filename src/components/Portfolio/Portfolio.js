import {Link} from 'react-router-dom';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio content__portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'><Link className='portfolio__link'
                                              to={{pathname: 'https://github.com/k-ermolova/how-to-learn'}}
                                              target='_blank'>Статичный сайт</Link></li>
        <li className='portfolio__item'><Link className='portfolio__link'
                                              to={{pathname: 'https://github.com/k-ermolova/russian-travel'}}
                                              target='_blank'>Адаптивный сайт</Link></li>
        <li className='portfolio__item'><Link className='portfolio__link'
                                              to={{pathname: 'https://github.com/k-ermolova/react-mesto-api-full'}}
                                              target='_blank'>Одностраничное приложение</Link></li>
      </ul>
    </section>
  );
}

export default Portfolio;
