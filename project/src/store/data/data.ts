import { createSlice } from '@reduxjs/toolkit';
import { GENRES, NameSpace } from '../../const';
import { FilmsData } from '../../types/types';
import { fetchSimilarFilmsAction, fetchFilmsListAction, fetchFilmAction, fetchPromoFilmAction, fetchReviewsAction } from '../api-actions';

const initialState: FilmsData = {
  films: [],
  promoFilm: null,
  genre: GENRES.AllGenres,
  filmsByGenre: [],
  similarFilms: [],
  reviews: [],
  isLoading: false,
  filmIsLoading: false,
  reviewsIsLoading : false,
  similarFilmsIsLoading: false,
  error: null,
};

export const data = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeGenre: (state, action: {type: string; payload: string}) => {
      state.genre = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsListAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsListAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.filmIsLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.filmIsLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsIsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsIsLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.similarFilmsIsLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.similarFilmsIsLoading = false;
      });
  },
});

export const { changeGenre } = data.actions;
