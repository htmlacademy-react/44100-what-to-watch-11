import { memo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setFavoriteFilmAction } from '../../store/api-actions';
import { store } from '../../store';
import { getFavoriteFilms } from '../../store/data/data-selector';

type FavoriteButtonProps = {
  filmId: number;
};

function FavoriteButton({ filmId }: FavoriteButtonProps): JSX.Element {

  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const isFilmFavorite = favoriteFilms.some((film) => film.id === filmId);

  const handleFavoriteAddButtonClick = () => {
    if (!isFilmFavorite) {
      store.dispatch(setFavoriteFilmAction([filmId, true]));
    } else {
      store.dispatch(setFavoriteFilmAction([filmId, false]));
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteAddButtonClick}>
      {isFilmFavorite ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>)}
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

export default memo(FavoriteButton);
