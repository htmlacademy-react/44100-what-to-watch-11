import { render, screen } from '@testing-library/react';
import AddReview from './add-review';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilm } from '../../mocks/mocks';
import { AuthStatus } from '../../const';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const film = makeFakeFilm();
const store = mockStore({
  DATA: { film: film },
  USER: {authorizationStatus: AuthStatus.Auth}
});

describe('Component: AddReview', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <AddReview />
      </Provider>
    );

    expect(screen.getByText(/Add review/)).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByAltText(film.name)).toBeInTheDocument();
  });

});
