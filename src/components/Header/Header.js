import './Header.css';
import Logo from "../Logo/Logo";
import AccountLink from "../AccountLink/AccountLink";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (props.pathname === 'movies' ? (
        <header className="header header_movies page__header">
          <Logo/>
          <Navigation pathname='movies'/>
          <AccountLink/>
          <button className='header__menu'/>
        </header>)
      : <header className="header page__header">
        <Logo/>
        <Navigation/>
      </header>
  );
}

export default Header;
