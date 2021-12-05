import {Link} from 'react-router-dom';

import Logo from '../Logo/Logo';

import './Login.css';

function Login(props) {
  const {values, handleChange, errors, isValid} = props.validation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onLogin(values);
  }
  return (
    <div className='auth page__auth'>
      <Logo/>
      <h3 className='auth__title'>Рады видеть!</h3>
      <form className='form' onSubmit={handleSubmit}>
        <fieldset className='form__field'>
          <label className='form__label'>E-mail</label>
          <input className={`input-text ${errors.email ? 'input-text_error' : ''}`} type='email' name='email'
                 onChange={handleChange} disabled={props.disabledInputs}
                 value={values.email || ''} required maxLength={80}/>
          {errors.email ? <p className='error'>{errors.email}</p> : ''}
          <label className='form__label'>Пароль</label>
          <input className={`input-text ${errors.password ? 'input-text_error' : ''}`} type='password' name='password'
                 onChange={handleChange} disabled={props.disabledInputs}
                 value={values.password || ''} required/>
          {errors.password ? <p className='error'>{errors.password}</p> : ''}
          {props.error ? <p className='error'>{props.error}</p> : ''}
        </fieldset>
        <button className='form__button' type='submit' disabled={!isValid && props.disabledInputs}>Войти</button>
        <p className='form__question'>Ещё не зарегистрированы?&nbsp;
          <Link to='/signup' className='form__link'>Регистрация</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
