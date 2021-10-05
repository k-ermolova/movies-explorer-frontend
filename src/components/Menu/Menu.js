import Navigation from '../Navigation/Navigation';
import AccountLink from '../AccountLink/AccountLink';

import './Menu.css';

function Menu(props) {
  return(
    <div className={`menu ${props.isMenuOpened ? 'menu_opened' : ''}`}>
      <div className='menu__container'>
        <button className='menu__close-button' onClick={props.onClose}/>
        <Navigation mobile={true}/>
        <AccountLink mobile={true}/>
      </div>
    </div>
  );
}

export default Menu;
