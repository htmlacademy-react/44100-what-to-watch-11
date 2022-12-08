import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeGenre, getFilteredFilmsList } from '../../store/actions';
import { Genres } from '../../types/types';

type GenresListProps = {
  genres: Genres;
  selectedGenre: string;
}

function GenresList({ genres, selectedGenre }: GenresListProps): JSX.Element {

  const dispatch = useDispatch();

  return (
    <ul className="catalog__genres-list">
      {Object.values(genres).map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`}
        >
          <Link to='#'
            className="catalog__genres-link"
            onClick={() => {
              dispatch(changeGenre(genre));
              dispatch(getFilteredFilmsList());
            }}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
