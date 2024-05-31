import { render, screen } from '@testing-library/react';
import App from './App';

test('renders whose turn it is', () => {
  render(<App />);
  const linkElement = screen.getByText(/red's turn/i);
  expect(linkElement).toBeInTheDocument();
});
