import React, { useEffect } from 'react';
import { AuthStatus, GENRES } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import FilmsListComponent from '../../components/films-list-component/films-list-component';
import GenresList from '../../components/genres-list/genres-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import { getFilmsList, getGenre, getLoadingStatus, getPromoFilm } from '../../store/data/data-selector';
import { getDisplayedFilmsCount } from '../../store/utils/utils-selector';
import { resetDisplayedFilmsCounter } from '../../store/utils/utils';
import { getFilmsSelectedByGenre } from '../../utils';
import { changeGenre } from '../../store/data/data';
import PlayButton from '../../components/play-button/play-button';
import FavoriteButone from '../../components/favorite-buttone.tsx/favorite-butone';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import { store } from '../../store';
import { getAuthStatus } from '../../store/user/user-selector';

function Main(): JSX.Element {

  useEffect(() => {
    store.dispatch(changeGenre(GENRES.AllGenres));
    store.dispatch(resetDisplayedFilmsCounter());
    if (authorizationStatus === AuthStatus.Auth) {
      store.dispatch(fetchFavoriteFilmsAction());
    }
  }, [store.dispatch]);

  const films = useAppSelector(getFilmsList);
  const selectedGenre = useAppSelector(getGenre);
  const filmsByGenre = getFilmsSelectedByGenre(films, selectedGenre);
  const displayedFilmsCount = useAppSelector(getDisplayedFilmsCount);
  const isLoading = useAppSelector(getLoadingStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm?.posterImage} alt={`${promoFilm?.name ?? ''} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">

                <PlayButton filmId={promoFilm.id} />

                <FavoriteButone filmId={promoFilm.id} />

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={GENRES} selectedGenre={selectedGenre} />

          {isLoading
            ? <Spinner />
            : <FilmsListComponent filmsList={filmsByGenre.slice(0, displayedFilmsCount)} />}

          {filmsByGenre.length - displayedFilmsCount > 0 && <ShowMoreButton />}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Main;
