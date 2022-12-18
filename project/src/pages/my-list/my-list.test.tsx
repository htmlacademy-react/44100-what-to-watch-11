import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus } from '../../const';
import thunk from 'redux-thunk';
import { makeFakeFilm } from '../../mocks/mocks';
import MyList from './my-list';
import { createMemoryHistory } from '@remix-run/router';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
const favoriteFilms = makeFakeFilm();

describe('Component: MyList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory({initialEntries: ['/favorites']});
    const authorizationStatus = AuthStatus.Auth;
    const store = mockStore({
      DATA: { favoriteFilms: favoriteFilms },
      USER: { authorizationStatus: authorizationStatus }
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <MyList />
        </Router>
      </Provider>

    );

    expect(screen.getByText(/My list/)).toBeInTheDocument();
  });
});
