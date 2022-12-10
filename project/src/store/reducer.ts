import { createReducer } from '@reduxjs/toolkit';
import { InitialState } from '../types/types';
import { AuthStatus, DEFAULT_DISPLAYED_FILMS_COUNTER } from '../const';
import { GENRES } from '../const';
import {
  changeGenre,
  getFilteredFilmsList,
  resetDisplayedFilmsCounter,
  increaseDispayedFilmsCounter,
  requireAuthStatus,
  getPromoFilm,
  getFilmsList
} from './actions';

const initialState: InitialState = {
  genre: GENRES.AllGenres,
  films: [],
  promoFilm: null,
  displayedFilmsCount: DEFAULT_DISPLAYED_FILMS_COUNTER,
  authStatus: AuthStatus.Unknown,
  error: null,
  isLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilmsList, (state, action) => {
      state.films = action.payload;
      state.isLoading = false;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilteredFilmsList, (state, action) => {
      if (state.genre === GENRES.AllGenres) {
        return;
      }
      state.films = action.payload.filter((film) => film.genre === state.genre);
    })
    .addCase(getPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(resetDisplayedFilmsCounter, (state) => {
      state.displayedFilmsCount = DEFAULT_DISPLAYED_FILMS_COUNTER;
    })
    .addCase(increaseDispayedFilmsCounter, (state) => {
      state.displayedFilmsCount += DEFAULT_DISPLAYED_FILMS_COUNTER;
    })
    .addCase(requireAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    });
});

export { reducer };
