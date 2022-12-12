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
  filmsByGenre: [],
  promoFilm: null,
  displayedFilmsCount: DEFAULT_DISPLAYED_FILMS_COUNTER,
  authorizationStatus: AuthStatus.Unknown,
  error: null,
  isLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilmsList, (state, action) => {
      state.films = action.payload;
      state.filmsByGenre = state.films;
      state.isLoading = false;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilteredFilmsList, (state) => {
      if (state.genre === GENRES.AllGenres) {
        state.filmsByGenre = state.films;
      } else {
        state.filmsByGenre = state.films.filter((film) => film.genre === state.genre);
      }
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
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
