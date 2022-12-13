import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { APIRout, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AppDispatch, State } from '../types/state';
import { AuthData, Film, FilmsList, NewReview, Reviews, UserData } from '../types/types';
import { setError } from './actions';

export const fetchFilmsListAction = createAsyncThunk<FilmsList, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmsList',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmsList>(APIRout.Films);
    return (data);
  }
);

export const fetchPromoFilmAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(APIRout.Promo);
    return (data);
  }
);

export const fetchFilmAction = createAsyncThunk<Film, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(`${APIRout.Films}/${filmId}`);
    if (data) {
      return (data);
    } else {
      throw new Error('No data');
    }
  });

export const fetchSimilarFilmsAction = createAsyncThunk<FilmsList, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmsList>(`${APIRout.Films}/${filmId}/similar`);
    if (data) {
      return (data);
    } else {
      throw new Error('No data');
    }
  });

export const fetchReviewsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRout.Reviews}/${filmId}`);
    if (data) {
      return (data);
    } else {
      throw new Error('No data');
    }
  });

export const fetchFavoriteFilmsAction = createAsyncThunk<FilmsList, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmsList>(APIRout.Favorite);
    return data;
  },
);

export const setFavoriteFilmAction = createAsyncThunk<void, [number, boolean], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/setFavoriteFilm',
  async ([id, status], { dispatch, extra: api }) => {
    await api.post<Film>(`${APIRout.Favorite}/${id}/${Number(status)}`);
    dispatch(fetchFavoriteFilmsAction());
  },
);

export const newCommentAction = createAsyncThunk<void, [number, NewReview], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'utils/comment',
  async ([id, { comment, rating }], { dispatch, extra: api }) => {
    await api.post<Reviews>(`${APIRout.Reviews}/${id}`, { comment, rating });
  }
);

export const checkAuthStatusAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthStatus',
  async (_arg, { dispatch, extra: api }) => {
    await api.get(APIRout.Login);
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRout.Login, { email, password });
    saveToken(token);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRout.Logout);
    dropToken();
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
