import {NavLink} from 'react-router-dom';

import './Navigation.css';

function Navigation(props) {
  return (
    <nav className='navbar'>
      <ul className={`navbar__container ${props.mobile ? 'navbar__container_mobile' : ''}`}>
        {props.mobile && <li className='navbar__item navbar__item_mobile'><NavLink className='navbar__link'
                                                                                   activeClassName='navbar__link_mobile'
                                                                                   exact to='/'>Главная</NavLink></li>}
        <li className={`navbar__item ${props.mobile ? 'navbar__item_mobile' : ''}`}><NavLink className='navbar__link'
                                                                                         activeClassName={`${props.mobile ? 'navbar__link_mobile' : 'navbar__link_desktop'}`}
                                                                                         to='/movies'>Фильмы</NavLink>
        </li>
        <li className={`navbar__item ${props.mobile ? 'navbar__item_mobile' : ''}`}><NavLink className='navbar__link'
                                                                                         activeClassName={`${props.mobile ? 'navbar__link_mobile' : 'navbar__link_desktop'}`}
                                                                                         to='/saved-movies'>Сохранённые
          фильмы</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
