export type Film = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type FilmsList = Film[];

export type Genres = {
  AllGenres: string;
  Action: string;
  Adventure: string;
  Comedie: string;
  Crime: string;
  Documentary: string;
  Drama: string;
  Fantasy: string;
  Horror: string;
  KidsAndFamily: string;
  Romance: string;
  SciFi: string;
  Thriller: string;
}

export type PromoFilm = Film | null;

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export type Reviews = Review[];

export type InitialState = {
  genre: string;
  films: FilmsList;
  filmsByGenre: FilmsList;
  displayedFilmsCount: number;
  authorizationStatus: string;
  promoFilm: Film | null;
  error: string | null;
  isLoading: boolean;
}

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};
