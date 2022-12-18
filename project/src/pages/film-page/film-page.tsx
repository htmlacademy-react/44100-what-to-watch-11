import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FavoriteButone from '../../components/favorite-buttone.tsx/favorite-buttone';
import FilmsListComponent from '../../components/films-list-component/films-list-component';
import PlayButton from '../../components/play-button/play-button';
import Spinner from '../../components/spinner/spinner';
import Tabs from '../../components/tabs/tabs';
import UserBlock from '../../components/user-block/user-block';
import { AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { store } from '../../store';
import { fetchFilmAction, fetchSimilarFilmsAction, fetchReviewsAction } from '../../store/api-actions';
import { getFilm, getFilmLoadingStatus, getReviews, getReviewsLoadingStatus, getSimilarFilms, getSimilarFilmsLoadingStatus } from '../../store/data/data-selector';
import { getAuthStatus } from '../../store/user/user-selector';
import Page404 from '../page-404/page-404';

function FilmPage(): JSX.Element {

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      store.dispatch(fetchFilmAction(id));
      store.dispatch(fetchSimilarFilmsAction(id));
      store.dispatch(fetchReviewsAction(id));
    }
  }, [id]);

  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const reviews = useAppSelector(getReviews);
  const isFilmLoading = useAppSelector(getFilmLoadingStatus);
  const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);
  const isSimilarFilmsLoading = useAppSelector(getSimilarFilmsLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthStatus);

  if (isFilmLoading && isSimilarFilmsLoading && isReviewsLoading) {
    return (
      <Spinner />
    );
  }

  if (film === undefined) {
    return <Page404 />;
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={'/'} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock />

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">

                <PlayButton filmId={film.id}/>

                <FavoriteButone filmId={film.id} />

                {authorizationStatus === AuthStatus.Auth && <Link to={'review'} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              {film && <Tabs film={film} reviews={reviews} />}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsListComponent filmsList={similarFilms} />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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

export default FilmPage;
