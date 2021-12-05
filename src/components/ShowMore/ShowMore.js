import './ShowMore.css';

function ShowMore(props) {
  return(
    <div className='more cards__more'>
      <button className='more__button' type='button' onClick={props.onShowMore}>Ещё</button>
    </div>
  );
}

export default ShowMore;
