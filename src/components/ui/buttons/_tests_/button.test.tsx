import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

const ComponentIcon = () => <svg data-testid="icon" />;

const mockOnClick = jest.fn();
const baseProps = {
  label: 'Click me',
  onClick: jest.fn(),
  color: 'filled' as const,
  IconComponent: ComponentIcon,
  disabled: false,
  type: 'button' as const,
  iconColor: 'black',
  isLoading: false,
};

describe('Button', () => {
  it('renders button with label', () => {
    render(<Button {...baseProps} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<Button {...baseProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(baseProps.onClick).toHaveBeenCalled();
  });

  it('renders with icon if provided', () => {
    render(<Button {...baseProps} />);
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('disables button when disabled is true', () => {
    render(<Button {...baseProps} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button when isLoading is true', () => {
    render(<Button {...baseProps} isLoading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(
      screen.getByRole('button').querySelector('.animate-spin')
    ).toBeInTheDocument();
  });
});
