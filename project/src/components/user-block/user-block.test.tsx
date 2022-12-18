import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus } from '../../const';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from '../app/app';

const history = createMemoryHistory({ initialEntries: ['/'] });
const mockStore = configureMockStore([thunk]);

describe('Component: UserBlock', () => {

  it('should render correctly when user is auth', () => {

    const authorizationStatus = AuthStatus.Auth;
    const store = mockStore({
      USER: { authorizationStatus: authorizationStatus }
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Sign out/)).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('should render correctly when user is noauth', () => {

    const authorizationStatus = AuthStatus.NoAuth;
    const store = mockStore({
      USER: { authorizationStatus: authorizationStatus }
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
  });

});
