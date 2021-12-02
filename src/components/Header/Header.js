import {Link} from 'react-router-dom';

import Logo from '../Logo/Logo';
import AccountLink from '../AccountLink/AccountLink';
import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu';

import './Header.css';

function Header(props) {
  return (props.loggedIn ? (
        <header className='header header_movies page__header'>
          <Logo/>
          <Navigation loggedIn={true}/>
          <AccountLink/>
          <button className='header__menu' onClick={props.onMenu}/>
          <Menu isMenuOpened={props.isMenuOpened} onClose={props.onClose}/>
        </header>)
      : <header className='header page__header'>
        <Logo/>
        <ul className='header__container'>
          <li className='header__item'><Link className='header__link' to='/signup'>Регистрация</Link></li>
          <li className='header__item header__item_type_button'><Link className='header__link' to='/signin'>Войти</Link></li>
        </ul>
      </header>
  );
}

export default Header;
