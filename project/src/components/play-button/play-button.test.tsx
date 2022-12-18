import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../mocks/mocks';
import PlayButton from './play-button';

const film = makeFakeFilm();

describe('Component: PlayButton', () => {
  it('should render correctly', () => {

    render(
      <PlayButton filmId={film.id}/>
    );

    expect(screen.getByText(/Play/)).toBeInTheDocument();
  });
});
