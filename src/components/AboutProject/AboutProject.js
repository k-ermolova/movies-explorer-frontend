import Title from '../Title/Title';

import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about content__about'>
      <Title title='О проекте'/>
      <ul className='about__container'>
        <li className='about__column'>
          <h3 className='about__title'>Дипломный проект включал 5 этапов</h3>
          <p className='about__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
            финальные доработки.</p>
        </li>
        <li className='about__column'>
          <h3 className='about__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='about__duration'>
        <div>
          <p className='about__item about__item_backend'>1 неделя</p>
          <p className='about__sign'>Back-end</p>
        </div>
        <div>
          <p className='about__item about__item_frontend'>4 недели</p>
          <p className='about__sign'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
