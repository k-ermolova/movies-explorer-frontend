import './Footer.css';

function Footer() {
  return(
    <footer className='footer page__footer'>
    <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <span className='footer__data'>&#169; 2021</span>
        <ul className='footer__links'>
          <li className='footer__link'>Яндекс.Практикум</li>
          <li className='footer__link'>Github</li>
          <li className='footer__link'>Facebook</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
