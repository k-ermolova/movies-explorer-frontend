import './PageNotFound.css';
import {Link} from "react-router-dom";

function PageNotFound() {
  return (
    <div className='not-found'>
      <span className='not-found__error'>404</span>
      <h3 className='not-found__title'>Страница не найдена</h3>
      <Link className='not-found__link' to='/'>Назад</Link>
    </div>
  )
}

export default PageNotFound;
