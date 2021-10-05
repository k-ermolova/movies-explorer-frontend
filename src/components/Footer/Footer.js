import {Link} from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className='footer page__footer'>
      <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <span className='footer__data'>&#169; 2021</span>
        <ul className='footer__items'>
          <li className='footer__item'><Link className='footer__link' to={{pathname: 'https://practicum.yandex.ru/'}}
                                             target='_blank'>Яндекс.Практикум</Link></li>
          <li className='footer__item'><Link className='footer__link'
                                             to={{pathname: 'https://github.com/yandex-praktikum'}}
                                             target='_blank'>Github</Link></li>
          <li className='footer__item'><Link className='footer__link'
                                             to={{pathname: 'https://www.facebook.com/yandex.practicum/'}}
                                             target='_blank'>Facebook</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
