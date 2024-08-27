import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { act } from 'react';

describe('Header component', () => {
  it('should render the title', () => {
    render(<Header />);
    const linkElement = screen.getByText(/bramble point/i);
    expect(linkElement).toBeInTheDocument();
  });
});

