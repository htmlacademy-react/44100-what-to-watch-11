import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { APIRout, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AppDispatch, State } from '../types/state';
import { AuthData, Film, FilmsList, NewReview, Reviews, UserData } from '../types/types';
import { getFilm, getFilmsList, getFilteredFilmsList, getPromoFilm, getReviews, requireAuthStatus, setError, setReviewFormDisabled } from './actions';

export const fetchFilmsListAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilmsList',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmsList>(APIRout.Films);
    dispatch(getFilmsList(data));
  }
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(APIRout.Promo);
    dispatch(getPromoFilm(data));
  }
);

export const fetchFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilm',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(`${APIRout.Films}/${filmId}`);
    if (data) {
      dispatch(getFilm(data));
    } else {
      throw new Error('No data');
    }
  });

export const fetchFilmsByGenreAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilmsByGenre',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmsList>(`${APIRout.Films}/${filmId}`);
    if (data) {
      dispatch(getFilteredFilmsList(data));
    } else {
      throw new Error('No data');
    }
  });

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRout.Reviews}/${filmId}`);
    if (data) {
      dispatch(getReviews(data));
    } else {
      throw new Error('No data');
    }
  });

export const newCommentAction = createAsyncThunk<void, [number, NewReview], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/comment',
  async ([id, { comment, rating }], { dispatch, extra: api }) => {
    try {
      await api.post<Reviews>(`${APIRout.Reviews}/${id}`, { comment, rating });
      dispatch(setReviewFormDisabled(false));
    } catch {
      dispatch(setReviewFormDisabled(false));
    }
  },
);

export const checkAuthStatusAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuthStatus',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRout.Login);
      dispatch(requireAuthStatus(AuthStatus.Auth));
    } catch {
      dispatch(requireAuthStatus(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRout.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthStatus(AuthStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRout.Logout);
    dropToken();
    dispatch(requireAuthStatus(AuthStatus.NoAuth));
  }
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);
