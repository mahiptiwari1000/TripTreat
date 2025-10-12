import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../components/Loader';

describe('Loader Component', () => {
  it('renders the Trip&Treat logo', () => {
    render(<Loader />);

    // Check if the logo text is rendered using getAllByText for duplicate letters
    const tElements = screen.getAllByText('T');
    expect(tElements).toHaveLength(2); // Two T's in "Trip&Treat"

    const rElements = screen.getAllByText('r');
    expect(rElements).toHaveLength(2); // Two r's in "Trip&Treat"

    expect(screen.getByText('i')).toBeInTheDocument();
    expect(screen.getByText('p')).toBeInTheDocument();
    expect(screen.getByText('&')).toBeInTheDocument();
    expect(screen.getByText('e')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('t')).toBeInTheDocument();
  });

  it('renders the loading message', () => {
    render(<Loader />);

    expect(
      screen.getByText('Discovering From Homestays to Hidden Trails...')
    ).toBeInTheDocument();
  });

  it('renders with custom progress', () => {
    render(<Loader progress={50} />);

    // The progress bar should be present
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Loader />);

    // Find the main container by its role attribute
    const container = screen.getByRole('status');
    expect(container).toHaveClass(
      'fixed',
      'inset-0',
      'flex',
      'flex-col',
      'items-center',
      'justify-center'
    );
  });
});
