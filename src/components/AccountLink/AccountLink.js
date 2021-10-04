import './AccountLink.css';
import {Link} from "react-router-dom";

function AccountLink(props) {
  return(
    <div className={`account ${props.mobile ? '' : 'account_desktop'}`}>
      <Link className='account__title' to='/profile'>Аккаунт</Link>
      <div className='account__icon'/>
    </div>
  );
}

export default AccountLink;
