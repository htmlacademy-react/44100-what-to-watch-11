import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus } from '../../const';
import App from './app';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { makeFakeFilm, makeFakeReview } from '../../mocks/mocks';

const mockStore = configureMockStore([thunk]);
const promoFilm = makeFakeFilm();
const film = makeFakeFilm();
const similarFilms = [makeFakeFilm()];
const favoriteFilms = [makeFakeFilm()];
const genre = 'Drama';
const films = [makeFakeFilm()];
const reviews = [makeFakeReview()];

const store = mockStore({
  USER: { authorizationStatus: AuthStatus.NoAuth },
  DATA: { promoFilm: promoFilm, film: film, similarFilms: similarFilms, favoriteFilms: favoriteFilms, films: films, reviews: reviews },
  FILMS: { genre: genre }
});

const authStore = mockStore({
  USER: { authorizationStatus: AuthStatus.Auth },
  DATA: { promoFilm: promoFilm, film: film, similarFilms: similarFilms, favoriteFilms: favoriteFilms, films: films, reviews: reviews },
  FILMS: { genre: genre }
});

describe('Application Routing', () => {
  it('should render "Main" page when user navigate to "/"', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(promoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(promoFilm.released.toString())).toBeInTheDocument();
  });

  it('should render "SignIn" page when user navigate to "/login"', () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('sign-in__input');
  });

  it('should render "MyList" page when user navigate to "/mylist"', () => {
    const history = createMemoryHistory({ initialEntries: ['/mylist'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/My list/)).toBeInTheDocument();
  });

  it('should render "Film" page when user navigate to "/films/id"', () => {
    const history = createMemoryHistory({ initialEntries: ['/films/id'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Play/)).toBeInTheDocument();
    expect(screen.getByText(/More like this/)).toBeInTheDocument();
  });

  it('should render "AddReview" page when user navigate to "/films/id/review"', () => {
    const history = createMemoryHistory({ initialEntries: ['/films/id/review'] });

    render(
      <Provider store={authStore}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Add review/)).toBeInTheDocument();
  });

  it('should render "Player" page when user navigate to "/player/id"', () => {
    const history = createMemoryHistory({ initialEntries: ['/player/id'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Exit/)).toBeInTheDocument();
  });

  it('should render "Page404" when user navigate to non-existent route', () => {
    const history = createMemoryHistory({ initialEntries: ['*'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/)).toBeInTheDocument();
  });

});
