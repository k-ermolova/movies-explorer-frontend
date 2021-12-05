import {useHistory} from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();
  return (
    <div className='not-found'>
      <span className='not-found__error'>404</span>
      <h3 className='not-found__title'>Страница не найдена</h3>
      <button className='not-found__link' onClick={() => history.goBack()}>Назад</button>
    </div>
  )
}

export default PageNotFound;
