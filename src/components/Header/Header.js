import './Header.css';

function Header(props) {
  return (props.pathname === 'movies' ? (
        <header className="header header_movies page__header">
          <div className='header__logo'/>
          <ul className="header__navbar">
            <li className="header__item header__item_type_film">Фильмы</li>
            <li className="header__item header__item_type_saved-film">Сохранённые фильмы</li>
          </ul>
          <a className='header__profile'>Аккаунт</a>
        </header>)
        : <header className="header page__header">
          <div className='header__logo'/>
          <ul className="header__navbar">
            <li className="header__item header__item_type_link">Регистрация</li>
            <li className="header__item header__item_type_button">Войти</li>
          </ul>
        </header>
  );
}

export default Header;
