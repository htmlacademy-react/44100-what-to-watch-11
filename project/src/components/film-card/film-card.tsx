import { Film } from '../../types/types';
import { Link } from 'react-router-dom';

type FilmCardfilm = {
  film: Film;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

function FilmCard({film, handleMouseEnter, handleMouseLeave}: FilmCardfilm): JSX.Element {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div key={film.id}>
        <div className="small-film-card__image">
          <img src={film.previewImage} alt={film.name} width="280" height="175" />
        </div>
        <h3 className="small-film-card__title">
          <Link to={'films/:id/'} className="small-film-card__link">{film.name}</Link>
        </h3>
      </div>
    </article>
  );
}

export default FilmCard;
