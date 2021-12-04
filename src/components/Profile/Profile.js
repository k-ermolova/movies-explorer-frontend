import {useEffect, useMemo, useState} from 'react';

import './Profile.css';

function Profile(props) {
  const {values, handleChange, errors, isValid, setValues} = props.validation({});
  const [isDisabled, setIsDisabled] = useState(true);

  const isLoaded = values !== undefined;

  let isCorrect = isValid && (props.user.name !== values.name || props.user.email !== values.email)
    && (isLoaded ? (values.name.length !== 0 && values.email.length !== 0) : true);

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

  useEffect(() => {
    setIsDisabled(!isCorrect);
  }, [isCorrect, isValid, props.user.email, props.user.name, values.email, values.name])

  return (
    <div className='profile page__profile'>
      <h3 className='profile__title'>{`Привет, ${props.user.name}!`}</h3>
      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__label'>Имя</label>
        <input className='profile__input' type='text' name='name' minLength='2' maxLength='30'
               value={values.name || ''} disabled={props.disabledInputs}
               onChange={handleChange}/>
        {errors.name ? <p className='error'>{errors.name}</p> : ''}
        <label className='profile__label'>E-mail</label>
        <input className='profile__input' type='email' name='email' maxLength='30' value={values.email || ''}
               onChange={handleChange} disabled={props.disabledInputs}/>
        {errors.email ? <p className='error'>{errors.email}</p> : ''}
        {props.error ? <p className='error'>{props.error}</p> : ''}
        <p
          className={`profile__success-info ${props.success ? 'profile__success-info_visible' : ''}`}>{props.success}</p>
        <button className='profile__edit-button' type='submit'
                disabled={isDisabled || props.disabledInputs}>Редактировать
        </button>
      </form>
      <button className='profile__exit-button' onClick={props.onLogOut}>Выйти из аккаунта</button>
    </div>
  );
}

export default Profile;
