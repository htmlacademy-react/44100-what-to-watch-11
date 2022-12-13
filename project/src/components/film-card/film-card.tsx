import { Film } from '../../types/types';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { store } from '../../store';
import { changeGenre } from '../../store/data/data';

type FilmCardProps = {
  film: Film;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  inFocus: boolean;
}

function FilmCard({film, handleMouseEnter, handleMouseLeave, inFocus}: FilmCardProps): JSX.Element {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div key={film.id}>
        <div className="small-film-card__image">
          {inFocus
            ? <VideoPlayer film={film} width="280" height="175" />
            : <img src={film.previewImage} alt={film.name} width="280" height="175" />}
        </div>
        <h3 className="small-film-card__title">
          <Link
            to={`/films/${film.id}`}
            className="small-film-card__link"
            onClick={() => store.dispatch(changeGenre(film.genre))}
          >
            {film.name}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default FilmCard;
