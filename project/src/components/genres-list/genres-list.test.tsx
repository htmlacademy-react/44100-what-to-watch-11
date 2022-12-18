import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilm } from '../../mocks/mocks';
import GenresList from './genres-list';
import { Provider } from 'react-redux';
import { GENRES } from '../../const';

const mockStore = configureMockStore();
const films = [makeFakeFilm()];
const genre = 'Drama';
const store = mockStore({
  DATA: { films: films },
  FILMS: {genre: genre}
});

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <GenresList genres={GENRES} selectedGenre={genre}/>
      </Provider>
    );

    expect(screen.getByText(/All genres/)).toBeInTheDocument();
    expect(screen.getByText(/Action/)).toBeInTheDocument();
    expect(screen.getByText(/Adventure/)).toBeInTheDocument();
    expect(screen.getByText(/Comedy/)).toBeInTheDocument();
    expect(screen.getByText(/Crime/)).toBeInTheDocument();
    expect(screen.getByText(/Documentary/)).toBeInTheDocument();
    expect(screen.getByText(/Drama/)).toBeInTheDocument();
    expect(screen.getByText(/Fantasy/)).toBeInTheDocument();
    expect(screen.getByText(/Horror/)).toBeInTheDocument();
    expect(screen.getByText(/Kids & Family/)).toBeInTheDocument();
    expect(screen.getByText(/Romance/)).toBeInTheDocument();
    expect(screen.getByText(/Sci-Fi/)).toBeInTheDocument();
    expect(screen.getByText(/Thriller/)).toBeInTheDocument();
  });

});
