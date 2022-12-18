import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthStatus } from '../../const';
import { makeFakeFilm } from '../../mocks/mocks';
import FavoriteButone from './favorite-buttone';

const mockStore = configureMockStore([thunk]);
const film = makeFakeFilm();
const favoriteFilms = Array.from({length: 3}, makeFakeFilm);
const authorizationStatus = AuthStatus.Auth;
const store = mockStore({
  DATA: { film: film, favoriteFilms: favoriteFilms },
  USER: { authorizationStatus: authorizationStatus }
});

describe('Component: FavoriteButton', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <FavoriteButone filmId={film.id} />
      </Provider>
    );

    expect(screen.getByText(/My list/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(favoriteFilms.length.toString());
  });

});
