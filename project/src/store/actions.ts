import { createAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../const';
import { Film, FilmsList, Reviews } from '../types/types';

export const changeGenre = createAction('changeGenre', (genre: string) => ({
  payload: genre,
}));

export const getFilm = createAction<Film>('getFilm');

export const getSimilarFilms = createAction<FilmsList>('getSimilarFilms');

export const getReviews = createAction<Reviews>('getReviews');

export const getFilmsList = createAction<FilmsList>('getFilmsList');

export const getFilteredFilmsList = createAction<FilmsList>('getFilteredFilmsList');

export const getPromoFilm = createAction<Film>('getPromoFilm');

export const resetDisplayedFilmsCounter = createAction('resetDisplayedFilmsCounter');

export const increaseDispayedFilmsCounter = createAction('increaseDispayedFilmsCounter');

export const requireAuthStatus = createAction<AuthStatus>('requireAuthStatus');

export const setError = createAction<string | null>('setError');

export const setReviewFormDisabled = createAction<boolean>('setReviewFormDisabled');
