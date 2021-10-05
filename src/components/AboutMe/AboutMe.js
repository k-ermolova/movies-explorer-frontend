import {Link} from 'react-router-dom';

import Title from '../Title/Title';

import './AboutMe.css';

function AboutMe() {
  return (
    <section className='student content__student'>
      <Title title='Студент'/>
      <div className='student__container'>
        <div className='student__info'>
          <h3 className='student__name'>Ксения</h3>
          <p className='student__intro'>Фронтенд-разработчик, 21 год</p>
          <p className='student__description'>Я родилась в Волгограде, а после окончания школы переехала в Москву. Учусь
            на факультете физико-математических и естественных наук РУДН. Люблю фотографировать, а ещё увлекаюсь бегом.
            Недавно начала кодить. </p>
          <ul className='student__media'>
            <li><Link className='student__link'
                                to={{pathname: 'https://www.facebook.com/ksenia.ermolova.75/'}}
                                target='_blank'>Facebook</Link></li>
            <li><Link className='student__link' to={{pathname: 'https://github.com/k-ermolova'}}
                                target='_blank'>Github</Link></li>
          </ul>
        </div>
        <div className='student__image'/>
      </div>
    </section>
  );
}

export default AboutMe;
