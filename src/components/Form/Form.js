import './Form.css';
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";

function Form(props) {
  return (props.component === 'register' ?
      <div className='auth page__auth'>
        <Logo/>
        <h3 className='auth__title'>Добро пожаловать!</h3>
        <form className='form'>
          <fieldset className='form__field'>
            <label className='form__label'>Имя</label>
            <input className='input-text' type='text'/>
            <label className='form__label'>E-mail</label>
            <input className='input-text' type='email'/>
            <label className='form__label'>Пароль</label>
            <input className='input-text' type='password'/>
          </fieldset>
          <button className='form__button' type='submit'>Зарегистрироваться</button>
          <p className='form__question'>Уже зарегистрированы?&nbsp;
            <Link to='/signin' className='form__link'>Войти</Link>
          </p>
        </form>
      </div>

      : <div className='auth page__auth'>
        <Logo/>
        <h3 className='auth__title'>Рады видеть!</h3>
        <form className='form'>
          <fieldset className='form__field'>
            <label className='form__label'>E-mail</label>
            <input className='input-text input-text_type_login' type='email'/>
            <label className='form__label'>Пароль</label>
            <input className='input-text input-text_type_login' type='password'/>
          </fieldset>
          <button className='form__button' type='submit'>Войти</button>
          <p className='form__question'>Ещё не зарегистрированы?&nbsp;
            <Link to='/signup' className='form__link'>Регистрация</Link>
          </p>
        </form>
      </div>
  );
}

export default Form;
