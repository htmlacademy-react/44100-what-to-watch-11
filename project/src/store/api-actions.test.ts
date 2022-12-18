import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { APIRout } from '../const';
import { checkAuthStatusAction, fetchFilmAction, fetchFilmsListAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, newCommentAction, setFavoriteFilmAction } from './api-actions';
import { Film, FilmsList, Review, Reviews } from '../types/types';
import { makeFakeFilm, makeFakeReview } from '../mocks/mocks';

const film: Film = makeFakeFilm();
const films: FilmsList = Array.from({ length: 3 }, makeFakeFilm);
const review: Review = makeFakeReview();
const reviews: Reviews = Array.from({ length: 3 }, makeFakeReview);

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch fetchFilmsListAction when GET /films', async () => {

    mockAPI
      .onGet(APIRout.Films)
      .reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchFilmsListAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsListAction.pending.type,
      fetchFilmsListAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoFilmAction when GET /promo', async () => {

    mockAPI
      .onGet(APIRout.Promo)
      .reply(200, film);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFilmAction when GET /films/film:id', async () => {

    mockAPI
      .onGet(`${APIRout.Films}/${film.id}`)
      .reply(200, film);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarFilmsAction when GET /films/film:id/similar', async () => {

    mockAPI
      .onGet(`${APIRout.Films}/${film.id}/similar`)
      .reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /comments/film:id', async () => {

    mockAPI
      .onGet(`${APIRout.Reviews}/${film.id}`)
      .reply(200, reviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch setFavoriteFilmAction when POST /favorite/film:id/status', async () => {

    mockAPI
      .onPost(`${APIRout.Favorite}/${film.id}/${Number(!film.isFavorite)}`)
      .reply(200, {...film, isFavorite: !film.isFavorite});

    const store = mockStore();

    await store.dispatch(setFavoriteFilmAction([film.id, !film.isFavorite]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setFavoriteFilmAction.pending.type,
      setFavoriteFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch newCommentAction when POST /comments/film:id', async () => {

    mockAPI
      .onPost(`${APIRout.Reviews}/${film.id}`)
      .reply(200, review);

    const store = mockStore();

    await store.dispatch(newCommentAction([film.id, review]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      newCommentAction.pending.type,
      newCommentAction.fulfilled.type
    ]);
  });

  it('should set authorization status is «Auth» when server return 200', async () => {

    const store = mockStore();

    mockAPI
      .onGet(APIRout.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthStatusAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthStatusAction.pending.type,
      checkAuthStatusAction.fulfilled.type
    ]);
  });

});
