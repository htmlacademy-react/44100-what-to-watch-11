import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { makeFakeFilm } from '../../mocks/mocks';
import Player from './player';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const film = makeFakeFilm();

describe('Component: PlayerScreen', () => {

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('should render correctly', () => {
    const store = mockStore({
      DATA: { film: film },
    });
    render(
      <Provider store={store}>
        <Player />
      </Provider>
    );

    expect(screen.getByText(/Exit/)).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(3);
  });

});
