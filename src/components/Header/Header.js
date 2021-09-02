import './Header.css';

function Header() {
  return (
    <header className="header page__header">
      <div className='header__logo'/>
      <ul className="header__navbar">
        <li className="header__item header__item_type_link">Регистрация</li>
        <li className="header__item header__item_type_button">Войти</li>
      </ul>
    </header>
  );
}

export default Header;
