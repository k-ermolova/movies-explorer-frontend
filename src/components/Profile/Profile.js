import './Profile.css';
import {useMemo} from 'react';

function Profile(props) {
  const {values, handleChange, errors, isValid, setValues} = props.validation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(values);
  }

  useMemo(() => {
    setValues({
      name: props.user.name,
      email: props.user.email
    })
  }, [props.user.email, props.user.name, setValues]);

  return (
    <div className='profile page__profile'>
      <h3 className='profile__title'>{`Привет, ${props.user.name}!`}</h3>
      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__label'>Имя</label>
        <input className='profile__input' type='text' name='name' minLength='2' maxLength='30'
               value={values.name}
               onChange={handleChange}/>
        {errors.name ? <p className='error'>{errors.name}</p> : ''}
        <label className='profile__label'>E-mail</label>
        <input className='profile__input' type='email' name='email' maxLength='30' value={values.email}
               onChange={handleChange}/>
        {errors.email ? <p className='error'>{errors.email}</p> : ''}
        {props.message ? <p className='error'>{props.message}</p> : ''}
        <button className='profile__edit-button' type='submit' disabled={!isValid}>Редактировать</button>
      </form>
      <button className='profile__exit-button' onClick={props.onLogOut}>Выйти из аккаунта</button>
    </div>
  );
}

export default Profile;
