import './Header.css';
import Logo from "../Logo/Logo";
import AccountLink from "../AccountLink/AccountLink";
import Navigation from "../Navigation/Navigation";
import Menu from "../Menu/Menu";

function Header(props) {
  return (props.desktopMenu ? (
        <header className="header header_movies page__header">
          <Logo/>
          <Navigation desktopMenu={true}/>
          <AccountLink/>
          <button className='header__menu' onClick={props.onMenu}/>
          <Menu isMenuOpened={props.isMenuOpened} onClose={props.onClose}/>
        </header>)
      : <header className="header page__header">
        <Logo/>
        <Navigation/>
      </header>
  );
}

export default Header;
