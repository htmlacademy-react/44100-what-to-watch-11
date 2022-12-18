import { render, screen } from '@testing-library/react';
import { makeFakeFilm, makeFakeReview } from '../../mocks/mocks';
import Tabs from './tabs';

const film = makeFakeFilm();
const reviews = [makeFakeReview()];

describe('Component: FilmTabs', () => {
  it('should render correctly', () => {

    render(<Tabs film={film} reviews={reviews} />);

    expect(screen.getByText(/Overview/)).toBeInTheDocument();
    expect(screen.getByText(/Details/)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
  });

});
