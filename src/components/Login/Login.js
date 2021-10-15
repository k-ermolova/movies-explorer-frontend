import {useState} from 'react';
import {Link} from 'react-router-dom';

import Logo from '../Logo/Logo';

import './Login.css';

function Login(props) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const {name, value} = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {email, password} = userData;
    props.onLogin({email, password});
  }
  return (
    <div className='auth page__auth'>
      <Logo/>
      <h3 className='auth__title'>Рады видеть!</h3>
      <form className='form' onSubmit={handleSubmit}>
        <fieldset className='form__field'>
          <label className='form__label'>E-mail</label>
          <input className='input-text input-text_type_login' type='email' name='email' onChange={handleChange}
                 value={userData.email} required/>
          <label className='form__label'>Пароль</label>
          <input className='input-text input-text_type_login' type='password' name='password' onChange={handleChange}
                 value={userData.password} required/>
        </fieldset>
        <button className='form__button' type='submit'>Войти</button>
        <p className='form__question'>Ещё не зарегистрированы?&nbsp;
          <Link to='/signup' className='form__link'>Регистрация</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
