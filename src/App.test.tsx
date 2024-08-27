import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/bramble point/i);
    expect(titleElement).toBeInTheDocument();
  });
});

