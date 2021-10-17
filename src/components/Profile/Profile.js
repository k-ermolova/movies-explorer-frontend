import './Profile.css';
import {useState} from 'react';

function Profile(props) {
  const [userName, setUserName] = useState(props.user.name);
  const [userEmail, setUserEmail] = useState(props.user.email);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit({
      name: userName,
      email: userEmail,
    });
  }

  return (
    <div className='profile page__profile'>
      <h3 className='profile__title'>{`Привет, ${props.user.name}!`}</h3>
      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__label'>Имя</label>
        <input className='profile__input' type='text' name='name' minLength='2' maxLength='30' value={userName}
               onChange={evt => setUserName(evt.target.value)}/>
        <label className='profile__label'>E-mail</label>
        <input className='profile__input' type='email' name='email' maxLength='30' value={userEmail}
               onChange={evt => setUserEmail(evt.target.value)}/>
        <button className='profile__edit-button' type='submit'>Редактировать</button>
      </form>
      <button className='profile__exit-button' onClick={props.onLogOut}>Выйти из аккаунта</button>
    </div>
  );
}

export default Profile;
