import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilm } from '../../mocks/mocks';
import AddReviewComponent from './add-review-component';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const film = makeFakeFilm();
const store = mockStore({
  DATA: { film: film }
});

describe('Component: AddReviewComponent', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <AddReviewComponent />
      </Provider>
    );

    expect(screen.getByText(/Post/)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(10);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

});
