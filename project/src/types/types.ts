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

export type NewReview = {
  rating: number;
  comment: string;
}

export type ReviewFormData = {
  rating: number;
  comment: string;
}

export type InitialState = {
  displayedFilmsCount: number;

  isReviewFormDisabled: boolean;
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

export type FilmsData = {
  films: FilmsList;
  promoFilm: Film | null;
  film?: Film;
  genre: string;
  filmsByGenre: FilmsList;
  similarFilms: FilmsList;
  reviews: Reviews;
  isLoading: boolean;
  filmIsLoading: boolean;
  reviewsIsLoading : boolean;
  similarFilmsIsLoading: boolean;
  error: string | null;
}

export type GlobalUserData = {
  authorizationStatus: string;
}

export type UtilsData = {
  displayedFilmsCount: number;
  isReviewFormDisabled: boolean;
}
