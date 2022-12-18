import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from './sign-in';

describe('Component: SignIn', () => {
  it('should render "SignIn" page', async () => {

    render(<SignIn />);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'login');
    await userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/login/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
