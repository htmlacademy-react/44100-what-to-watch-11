import { Routes, Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus } from '../../const';
import { PrivateRoute } from './private-route';

const mockStore = configureMockStore();

describe('Component: PrivateRouter', () => {

  it('should render component for public route, when user is not authorized', () => {
    const store = mockStore();
    const history = createMemoryHistory({ initialEntries: ['/private'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path={'/login'}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute
                  authorizationStatus={AuthStatus.NoAuth}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user is authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthStatus.Auth},
    });
    const history = createMemoryHistory({ initialEntries: ['/private'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path={'/login'}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute
                  authorizationStatus={AuthStatus.Auth}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
