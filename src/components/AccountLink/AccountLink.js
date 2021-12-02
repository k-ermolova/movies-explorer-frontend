import {Link} from 'react-router-dom';

import './AccountLink.css';

function AccountLink(props) {
  return(
    <div className={`account ${props.mobile ? '' : 'account_desktop'}`}>
      <Link className='account__title' to='/profile' onClick={props.onClick}>Аккаунт</Link>
      <div className='account__icon'/>
    </div>
  );
}

export default AccountLink;
