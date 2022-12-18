import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../mocks/mocks';
import OverviewTab from './overview-tab';

const film = makeFakeFilm();

describe('Component: OverviewTab', () => {
  it('should render correctly', () => {

    render(
      <OverviewTab film={film} />
    );

    const ratingElement = screen.getByText(film.rating);
    const directorElement = screen.getByText(`Director: ${film.director}`);
    const descriptionElement = screen.getByText(film.description);
    const starringElement = screen.getByText(`Starring: ${film.starring.join(', ')}`);
    const scoreElement = screen.getByText(`${film.scoresCount} ratings`);

    expect(ratingElement).toBeInTheDocument();
    expect(directorElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument();
  });
});
