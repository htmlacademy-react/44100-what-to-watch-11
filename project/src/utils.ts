import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { GENRES } from './const';
import { FilmsList } from './types/types';

dayjs.extend(duration);

export const getFilmsSelectedByGenre = (films: FilmsList, genre: string) => {
  if (genre === GENRES.AllGenres) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};

export const formatTimeForPlayer = (minutes: number): string => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

export const formatStrarringList = (arr: string[]) => arr?.join(', \n');
