import { useState } from 'react';
import { Film, FilmsList } from '../../types/types';
import FilmCard from '../film-card/film-card';

type FilmsListComponentsProps = {
  filmsList: FilmsList;
}

function FilmsListComponent({ filmsList }: FilmsListComponentsProps): JSX.Element {
  const [activeFilmCard, setActiveFilmCard] = useState<Film | null>(null);

  return (
    <div className="catalog__films-list">
      <div className="catalog__films-list">
        {filmsList.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            handleMouseEnter={() => setActiveFilmCard(film)}
            handleMouseLeave={() => setActiveFilmCard(null)}
            inFocus={film.id === activeFilmCard?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default FilmsListComponent;
