import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Page from '../../app/(auth)/login/page.tsx';

describe('Login page', () => {
  it('should render', async () => {
    const Pagecomponent = await Page();
    render(Pagecomponent);

    const heading = screen.getByRole('heading', { name: /login user/i });
    expect(heading).toBeInTheDocument();
  });
});
