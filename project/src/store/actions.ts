import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction('changeGenre', (genre: string) => ({
  payload: genre,
}));

export const getFilteredFilmsList = createAction('getFilteredFilmsList');

export const resetDisplayedFilmsCounter = createAction('resetDisplayedFilmsCounter');

export const increaseDispayedFilmsCounter = createAction('increaseDispayedFilmsCounter');
