import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../mocks/mocks';
import FilmsListComponent from './films-list-component';

const films = Array.from({length: 3}, makeFakeFilm);

describe('Component: FilmsListComponent', () => {
  it('should render correctly', () => {

    render(<FilmsListComponent filmsList={films} />);

    expect(screen.getAllByTestId('film').length).toBe(films.length);
  });
});
