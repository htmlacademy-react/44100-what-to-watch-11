import { useDispatch } from 'react-redux';
import { increaseDispayedFilmsCounter } from '../../store/utils/utils';

function ShowMoreButton(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => dispatch(increaseDispayedFilmsCounter())}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
