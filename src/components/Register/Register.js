import {Link} from 'react-router-dom';

import Logo from '../Logo/Logo';

function Register(props) {
  const {values, handleChange, errors, isValid} = props.validation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(values);
  }

  return (
    <div className='auth page__auth'>
      <Logo/>
      <h3 className='auth__title'>Добро пожаловать!</h3>
      <form className='form' onSubmit={handleSubmit}>
        <fieldset className='form__field'>
          <label className='form__label'>Имя</label>
          <input className={`input-text ${errors.name ? 'input-text_error' : ''}`} type='text' name='name'
                 onChange={handleChange} value={values.name || ''}
                 minLength={2} maxLength={30} disabled={props.disabledInputs} required/>
          {errors.name ? <p className='error'>{errors.name}</p> : ''}
          <label className='form__label'>E-mail</label>
          <input className={`input-text ${errors.email ? 'input-text_error' : ''}`} type='email' name='email'
                 onChange={handleChange} value={values.email || ''} disabled={props.disabledInputs}
                 required/>
          {errors.email ? <p className='error'>{errors.email}</p> : ''}
          <label className='form__label'>Пароль</label>
          <input className={`input-text ${errors.password ? 'input-text_error' : ''}`} type='password'
                 name='password' onChange={handleChange}
                 value={values.password || ''} disabled={props.disabledInputs} required/>
          {errors.password ? <p className='error'>{errors.password}</p> : ''}
          {props.error ? <p className='error'>{props.error}</p> : ''}
        </fieldset>
        <button className='form__button' type='submit' disabled={!isValid && props.disabledInputs}>Зарегистрироваться
        </button>
        <p className='form__question'>Уже зарегистрированы?&nbsp;
          <Link to='/signin' className='form__link'>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
