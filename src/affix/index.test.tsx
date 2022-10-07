import React from 'react';
import { render, screen } from '@testing-library/react';
import Affix from './index';

describe('Affix', () => {
  test('renders Affix', () => {
    render(<Affix>click me</Affix>);
    const linkElement = screen.getByText(/click me/i);
    expect(linkElement).toBeInTheDocument();
  });
});
