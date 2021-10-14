import {useState} from 'react';
import {Link} from 'react-router-dom';

import Logo from '../Logo/Logo';

function Register(props) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = (evt) => {
    evt.preventDefault();
    const {name, email, password} = userData;
    props.onRegister({name, email, password});
  }

  return (
    <div className='auth page__auth'>
      <Logo/>
      <h3 className='auth__title'>Добро пожаловать!</h3>
      <form className='form'>
        <fieldset className='form__field'>
          <label className='form__label'>Имя</label>
          <input className='input-text' type='text' required/>
          <label className='form__label'>E-mail</label>
          <input className='input-text' type='email' required/>
          <label className='form__label'>Пароль</label>
          <input className='input-text' type='password' required/>
        </fieldset>
        <button className='form__button' type='submit'>Зарегистрироваться</button>
        <p className='form__question'>Уже зарегистрированы?&nbsp;
          <Link to='/signin' className='form__link'>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
