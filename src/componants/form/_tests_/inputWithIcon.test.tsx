/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import InputWithIcon from '../InputWithIcon';

const ComponentIcon = () => <svg data-testid="icon" />;

const baseProps = {
  name: 'username',
  type: 'text',
  label: 'Username',
  placeholder: 'Enter username',
  autoComplete: 'username',
  IconComponent: ComponentIcon,
  registration: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'username',
  },
};

describe('InputWithIcon', () => {
  it('renders label and input correctly', () => {
    render(<InputWithIcon {...baseProps} error="" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('displays the icon', () => {
    render(<InputWithIcon {...baseProps} error="" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not show error message when no error is provided', () => {
    render(<InputWithIcon {...baseProps} error="" />);
    const errorElement = screen.queryByText('Required field');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('displays an error message if error is passed', () => {
    render(<InputWithIcon {...baseProps} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
