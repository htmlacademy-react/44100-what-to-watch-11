import {render, screen} from '@testing-library/react';
import { makeFakeFilm } from '../../mocks/mocks';
import VideoPlayer from './video-player';

const film = makeFakeFilm();

describe('Component: VideoPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('should render correctly', () => {

    render(
      <VideoPlayer film={film} width={'280'} height={'175'}/>,
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
