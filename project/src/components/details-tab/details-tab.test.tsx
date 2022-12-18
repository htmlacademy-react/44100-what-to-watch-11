import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../mocks/mocks';
import DetailsTab from './details-tab';

const film = makeFakeFilm();

describe('Component: DetailsTab', () => {
  it('should render correctly', () => {

    render(
      <DetailsTab film={film} />
    );

    const textDirectorElement = screen.getByText(film.director);
    const textGenreElement = screen.getByText(film.genre);
    const starringElement = screen.getByText(film.starring.join(', '));
    const textReleasedElement = screen.getByText(film.released);

    expect(textDirectorElement).toBeInTheDocument();
    expect(textGenreElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
    expect(textReleasedElement).toBeInTheDocument();
  });
});
