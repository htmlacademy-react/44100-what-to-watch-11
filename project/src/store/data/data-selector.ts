import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { FilmsList } from '../../types/types';

export const getFilmsList = (state: State) => state[NameSpace.Data].films;

export const getPromoFilm = (state: State) => state[NameSpace.Data].promoFilm;

export const getGenre = (state: State) => state[NameSpace.Data].genre;

export const getSimilarFilms = (state: State) => state[NameSpace.Data].similarFilms;

export const getFilteredFilmsList = (state: State) => state[NameSpace.Data].filmsByGenre;

export const getFilm = (state: State) => state[NameSpace.Data].film;

export const getReviews = (state: State) => state[NameSpace.Data].reviews;

export const getLoadingStatus = (state: State) => state[NameSpace.Data].isLoading;

export const getFilmLoadingStatus = (state: State) => state[NameSpace.Data].filmIsLoading;

export const getReviewsLoadingStatus = (state: State) => state[NameSpace.Data].reviewsIsLoading;

export const getSimilarFilmsLoadingStatus = (state: State) => state[NameSpace.Data].similarFilmsIsLoading;

export const getFavoriteFilms = (state: State): FilmsList => state[NameSpace.Data].favoriteFilms;

export const getFavoriteFilmsLoadingStatus = (state: State): boolean => state[NameSpace.Data].myListIsLoading;

export const getError = (state: State) => state[NameSpace.Data].error;
