import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Avatar from './index';

describe('Avatar', () => {
  test('renders Avatar', () => {
    render(<Avatar>click me</Avatar>);
    const linkElement = screen.getByText(/click me/i);
    expect(linkElement).toBeInTheDocument();
  });

});
