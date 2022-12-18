import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus } from '../../const';
import thunk from 'redux-thunk';
import FilmPage from './film-page';
import { makeFakeFilm } from '../../mocks/mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const film = makeFakeFilm();
const similarFilms = [makeFakeFilm()];
const favoriteFilms = [makeFakeFilm()];

describe('Component: FilmPage', () => {
  it('should render correctly if user is not auth', () => {
    const authorizationStatus = AuthStatus.NoAuth;
    const store = mockStore({
      DATA: { film: film, similarFilms: similarFilms, favoriteFilms: favoriteFilms },
      USER: { authorizationStatus: authorizationStatus }
    });

    render(
      <Provider store={store}>
        <FilmPage />
      </Provider>
    );

    expect(screen.getByText(/Play/)).toBeInTheDocument();
    expect(screen.getByText(/More like this/)).toBeInTheDocument();
    expect(screen.getAllByText(film.name).length).toBe(2);
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released.toString())).toBeInTheDocument();
    expect(screen.queryByText(/Add review/)).not.toBeInTheDocument();
  });

  it('should render correctly if user is auth', () => {
    const authorizationStatus = AuthStatus.Auth;
    const store = mockStore({
      DATA: { film: film, similarFilms: similarFilms, favoriteFilms: favoriteFilms },
      USER: { authorizationStatus: authorizationStatus }
    });

    render(
      <Provider store={store}>
        <FilmPage />
      </Provider>
    );

    expect(screen.getByText(/Play/)).toBeInTheDocument();
    expect(screen.getByText(/More like this/)).toBeInTheDocument();
    expect(screen.getAllByText(film.name).length).toBe(2);
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released.toString())).toBeInTheDocument();
    expect(screen.getByText(/Add review/)).toBeInTheDocument();
  });

});
