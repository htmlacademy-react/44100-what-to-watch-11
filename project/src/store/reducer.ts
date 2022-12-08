import { createReducer } from '@reduxjs/toolkit';
import { genres } from '../mocks/genres';
import { filmsList } from '../mocks/filmsList';
import { InitialState } from '../types/types';
import { changeGenre, getFilteredFilmsList } from './actions';

const initialState: InitialState = {
  genre: genres.AllGenres,
  films: filmsList,
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
    });
});

export { reducer };
