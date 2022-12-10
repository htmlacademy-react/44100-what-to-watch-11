import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { APIRout, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AppDispatch, State } from '../types/state';
import { AuthData, Film, FilmsList, UserData } from '../types/types';
import { getFilmsList, getFilteredFilmsList, getPromoFilm, requireAuthStatus, setError } from './actions';

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

export const fetchFilteredFilmsListAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilteredFilmsList',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmsList>(APIRout.Films);
    dispatch(getFilteredFilmsList(data));
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
    setTimeout (
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);
