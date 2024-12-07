import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import Page from '../../app/(auth)/register/page';

describe('Register page', () => {
  it('Should render register page', async () => {
    const RegisterPage = await Page();
    render(RegisterPage);

    const heading = screen.getByRole('heading', {
      name: /register user/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
