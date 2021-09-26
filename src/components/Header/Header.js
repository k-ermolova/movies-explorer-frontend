import './Header.css';
import Logo from "../Logo/Logo";

function Header(props) {
  return (props.pathname === 'movies' ? (
        <header className="header header_movies page__header">
          <Logo/>
          <ul className="header__navbar">
            <li className="header__item header__item_type_film">Фильмы</li>
            <li className="header__item header__item_type_saved-film">Сохранённые фильмы</li>
          </ul>
          <div className='header__profile-container'>
            <a className='header__profile'>Аккаунт</a>
            <div className='header__profile-icon'/>
          </div>
        </header>)
      : <header className="header page__header">
        <Logo/>
        <ul className="header__navbar">
          <li className="header__item">Регистрация</li>
          <li className="header__item header__item_type_button">Войти</li>
        </ul>
      </header>
  );
}

export default Header;
