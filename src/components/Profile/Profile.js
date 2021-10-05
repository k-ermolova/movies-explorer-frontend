import {Link} from 'react-router-dom';

import './Profile.css';

function Profile() {
  return(
    <div className='profile page__profile'>
      <h3 className='profile__title'>Привет, Виталий!</h3>
      <form className='profile__form'>
        <label className='profile__label'>Имя</label>
        <input className='profile__input' type='text' name='name' minLength='2' maxLength='30' value='Виталий'/>
        <label className='profile__label'>E-mail</label>
        <input className='profile__input' type='email' name='email' maxLength='30' value='pochta@yandex.ru'/>
        <button className='profile__edit-button' type='submit'>Редактировать</button>
      </form>
      <Link className='profile__exit-button' to='/signin'>Выйти из аккаунта</Link>
    </div>
  );
}

export default Profile;
