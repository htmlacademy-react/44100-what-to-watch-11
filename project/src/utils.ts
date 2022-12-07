import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatTimeForPlayer = (minutes: number): string => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

export const formatStrarringList = (arr: string[]) => arr.join(', \n');
