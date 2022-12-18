import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilm } from '../../mocks/mocks';
import { AuthStatus } from '../../const';
import Main from './main';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const films = makeFakeFilm();
const promoFilm = makeFakeFilm();
const genre = 'All genre';
const favoriteFilms = [makeFakeFilm()];
const store = mockStore({
  DATA: { films: films, promoFilm: promoFilm, favoriteFilms: favoriteFilms },
  USER: {authorizationStatus: AuthStatus.Auth},
  FILMS: { genre: genre }
});

describe('Component: Main', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    expect(screen.getAllByText(promoFilm.name)[0]).toBeInTheDocument();
    expect(screen.getByText(promoFilm.released.toString())).toBeInTheDocument();
  });

});
