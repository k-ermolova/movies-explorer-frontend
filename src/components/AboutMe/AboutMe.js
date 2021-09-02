import './AboutMe.css';
import Title from "../Title/Title";

function AboutMe() {
  return(
    <section className='student content__student'>
      <Title title='Студент'/>
      <h3 className='student__name'>Ксения</h3>
      <p className='student__intro'>Фронтенд-разработчик, 21 год</p>
      <p className='student__description'>Я родилась в Волгограде, а после окончания школы переехала в Москву. Учусь
        на факультете физико-математических и естественных наук РУДН. Люблю фотографировать, а ещё увлекаюсь бегом.
        Недавно начала кодить. </p>
      <div className='student__image'/>
      <ul className='student__media'>
        <li className='student__link'>Facebook</li>
        <li className='student__link'>Github</li>
      </ul>
    </section>
  );
}

export default AboutMe;
