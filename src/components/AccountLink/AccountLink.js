import './AccountLink.css';
import {Link} from "react-router-dom";

function AccountLink() {
  return(
    <div className='account'>
      <Link className='account__title' to='/profile'>Аккаунт</Link>
      <div className='account__icon'/>
    </div>
  );
}

export default AccountLink;
