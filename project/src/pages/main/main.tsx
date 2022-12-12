import React, { useEffect } from 'react';
import { GENRES } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import FilmsListComponent from '../../components/films-list-component/films-list-component';
import GenresList from '../../components/genres-list/genres-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import { store } from '../../store';
import { changeGenre, getFilteredFilmsList, resetDisplayedFilmsCounter } from '../../store/actions';
import { FilmsList } from '../../types/types';

type MainPageProps = {
  films: FilmsList;
}

function Main({ films }: MainPageProps): JSX.Element {

  useEffect(() => {
    store.dispatch(changeGenre(GENRES.AllGenres));
    store.dispatch(getFilteredFilmsList(films));
    store.dispatch(resetDisplayedFilmsCounter());
  }, []);

  const selectedGenre = useAppSelector((state) => state.genre);
  const filmsByGenre = useAppSelector((storage) => storage.filmsByGenre);
  const displayedFilmsCount = useAppSelector((state) => state.displayedFilmsCount);
  const isLoading = useAppSelector((state) => state.isLoading);
  const { promoFilm } = useAppSelector((state) => state);

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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
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
