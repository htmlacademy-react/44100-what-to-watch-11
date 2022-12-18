import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../mocks/mocks';
import FilmCard from './film-card';

const film = makeFakeFilm();
const fakeHandler = () => null;

describe('Component: FilmCard', () => {

  it('should render correctly', () => {

    render(<FilmCard film={film} handleMouseEnter={fakeHandler} handleMouseLeave={fakeHandler} inFocus={false} />);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

});
