import { describe, it, expect } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import AuthForm from '../../components/AuthForm';

describe('Register page', () => {
  it('renders the register form correctly', () => {
    render(<AuthForm type="register" />);

    expect(
      screen.getByRole('heading', { name: /register new account/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create new account/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute(
      'href',
      '/login',
    );
  });

  it('shows validation error for invalid email', async () => {
    render(<AuthForm type="login" />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
});
