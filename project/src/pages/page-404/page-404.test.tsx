import { render, screen } from '@testing-library/react';
import Page404 from './page-404';

describe('Component: Page404', () => {
  it('should render correctly', () => {

    render(<Page404 />);

    expect(screen.getByText(/404 Not Found/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/)).toBeInTheDocument();
  });

});
