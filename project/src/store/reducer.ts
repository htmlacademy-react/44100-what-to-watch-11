import { createReducer } from '@reduxjs/toolkit';
import { genres } from '../mocks/genres';
import { filmsList } from '../mocks/filmsList';
import { InitialState } from '../types/types';
import { changeGenre, getFilteredFilmsList, resetDisplayedFilmsCounter, increaseDispayedFilmsCounter } from './actions';
import { DEFAULT_DISPLAYED_FILMS_COUNTER } from '../const';

const initialState: InitialState = {
  genre: genres.AllGenres,
  films: filmsList,
  displayedFilmsCount: DEFAULT_DISPLAYED_FILMS_COUNTER,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilteredFilmsList, (state) => {
      if (state.genre === genres.AllGenres) {
        state.films = filmsList;
        return;
      }
      state.films = filmsList.filter((film) => film.genre === state.genre);
    })
    .addCase(resetDisplayedFilmsCounter, (state) => {
      state.displayedFilmsCount = DEFAULT_DISPLAYED_FILMS_COUNTER;
    })
    .addCase(increaseDispayedFilmsCounter, (state) => {
      state.displayedFilmsCount += DEFAULT_DISPLAYED_FILMS_COUNTER;
    });
});

export { reducer };
