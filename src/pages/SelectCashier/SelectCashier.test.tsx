
import { render, screen } from '@testing-library/react';
import SelectCashier from './SelectCashier';

test('renders SelectCashier', () => {
  render(<SelectCashier />);
  const linkElement = screen.getByText(/Select a Cashier/i);
  expect(linkElement).toBeInTheDocument();
});


