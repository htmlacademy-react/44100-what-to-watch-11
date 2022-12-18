export const GENRES = {
  AllGenres: 'All genres',
  Action: 'Action',
  Adventure: 'Adventure',
  Comedie: 'Comedy',
  Crime: 'Crime',
  Documentary: 'Documentary',
  Drama: 'Drama',
  Fantasy: 'Fantasy',
  Horror: 'Horror',
  KidsAndFamily: 'Kids & Family',
  Romance: 'Romance',
  SciFi: 'Sci-Fi',
  Thriller: 'Thriller',
};

export const APIRout = {
  Main: '/',
  Films: '/films',
  Promo: '/promo',
  Login: '/login',
  Logout: '/logout',
  Reviews: '/comments',
  Favorite: '/favorite',
};

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN',
}

export enum TabValue {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Utils = 'UTILS',
}

export const CommentLength = {
  min: 50,
  max: 400,
};

export const DEFAULT_DISPLAYED_FILMS_COUNTER = 8;

export const VIDEOPLAYER_TIMEOUT = 1000;

export const TIMEOUT_SHOW_ERROR = 2000;
