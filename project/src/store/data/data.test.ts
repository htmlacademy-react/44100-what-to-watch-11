import { makeFakeFilm, makeFakeReview } from '../../mocks/mocks';
import { Film, FilmsData, FilmsList, Reviews } from '../../types/types';
import { data, initialState } from './data';
import {
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsListAction,
  fetchPromoFilmAction,
  fetchReviewsAction,
  fetchSimilarFilmsAction
} from '../api-actions';

const film: Film = makeFakeFilm();
const filmsList: FilmsList = Array.from({ length: 3 }, makeFakeFilm);
const reviews: Reviews = Array.from({ length: 3 }, makeFakeReview);

describe('Reducer: data', () => {

  let state: FilmsData;

  beforeEach(() => {
    state = initialState;
  })

  it('without additional parameters should return initial state', () => {
    expect(data.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should set iSoading to true if fetchFilmsListAction pending', () => {
    expect(data.reducer(state, { type: fetchFilmsListAction.pending.type }))
      .toEqual({isLoading: true});
  });

  it('should get films array and set isLoading status to false if fetchFilmsListAction fulfilled', () => {
    expect(data.reducer(state, { type: fetchFilmsListAction.fulfilled.type, payload: filmsList}))
      .toEqual({...state, films: filmsList, isLoading: false});
  });

  it('should set isLoading status to true if fetchPromoFilmAction pending', () => {
    expect(data.reducer(state, { type: fetchPromoFilmAction.pending.type }))
      .toEqual({...state, isLoading: true});
  });

  it('should get promoFilm and set isLoading status to false if fetchPromoFilmAction fulfilled', () => {
    expect(data.reducer(state, { type: fetchFilmsListAction.fulfilled.type, payload: film}))
      .toEqual({...state, promoFilm: film, isLoading: false});
  });

  it('should set isLoading status to true if fetchFilmAction pending', () => {
    expect(data.reducer(state, { type: fetchFilmAction.pending.type }))
      .toEqual({...state, isLoading: true});
  });

  it('should get film and set isLoading status to false if fetchFilmAction fulfilled', () => {
    expect(data.reducer(state, { type: fetchFilmAction.fulfilled.type, payload: film}))
      .toEqual({...state, film: film, isLoading: false});
  });

  it('should set reviewsIsLoading status to true if fetchReviewsAction pending', () => {
    expect(data.reducer(state, { type: fetchReviewsAction.pending.type }))
      .toEqual({...state, isLoading: true});
  });

  it('should get reviews and set reviewsIsLoading status to false if fetchFilmAction fulfilled', () => {
    expect(data.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({...state, reviews: reviews, reviewsIsLoading: false});
  });

  it('should set similarFilmsIsLoading to true if fetchSimilarFilmsAction pending', () => {
    expect(data.reducer(state, { type: fetchSimilarFilmsAction.pending.type }))
      .toEqual({...state, similarFilmsIsLoading: true});
  });

  it('should get similarFilms array and set similarFilmsIsLoading status to false if fetchFilmsListAction fulfilled', () => {
    expect(data.reducer(state, { type: fetchFilmsListAction.fulfilled.type, payload: filmsList}))
      .toEqual({...state, similarFilms: filmsList, isLoading: false});
  });

  it('should set myListIsLoading to true if fetchFavoriteFilmsAction pending', () => {
    expect(data.reducer(state, { type: fetchFavoriteFilmsAction.pending.type }))
      .toEqual({...state, myListIsLoading: true});
  });

  it('should get favoriteFilms array and set myListIsLoading status to false if fetchFavoriteFilmsAction fulfilled', () => {
    expect(data.reducer(state, { type: fetchFavoriteFilmsAction.fulfilled.type, payload: filmsList}))
      .toEqual({...state, favoriteFilms: filmsList, myListIsLoading: false});
  });

});
