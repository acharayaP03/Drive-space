import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuthForm from '../../components/AuthForm.tsx';

describe('Login page', () => {
  it('renders the login form correctly', () => {
    render(<AuthForm type="login" />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /create new account/i }),
    ).toHaveAttribute('href', '/register');
  });
});
