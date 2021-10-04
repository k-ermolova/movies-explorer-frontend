import './Navigation.css';
import {Link, NavLink} from "react-router-dom";

function Navigation(props) {
  return (props.desktopMenu ?
      (<nav className='navbar'>
      <ul className={`navbar__container navbar__container_authorized`}>
        <li className='navbar__item'><NavLink className='navbar__link' activeClassName='navbar__link_active' to='/movies'>Фильмы</NavLink></li>
        <li className='navbar__item'><NavLink className='navbar__link' activeClassName='navbar__link_active' to='/saved-movies'>Сохранённые фильмы</NavLink></li>
      </ul>
    </nav>)
      : <nav className='navbar'>
      <ul className='navbar__container'>
        <li className='navbar__item'><Link className='navbar__link' to='/signup'>Регистрация</Link></li>
        <li className='navbar__item navbar__item_type_button'><Link className='navbar__link' to='/signin'>Войти</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
