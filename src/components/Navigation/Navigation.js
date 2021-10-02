import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation(props) {
  return (props.pathname === 'movies' ?
      (<nav className='navbar'>
      <ul className='navbar__container navbar__container_movies'>
        <li className='navbar__item navbar__item_type_film'><Link className='navbar__link' to='/movies'>Фильмы</Link></li>
        <li className='navbar__item navbar__item_type_saved-film'><Link className='navbar__link' to='/saved-movies'>Сохранённые фильмы</Link></li>
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
