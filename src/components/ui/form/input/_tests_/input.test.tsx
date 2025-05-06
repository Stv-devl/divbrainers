import { render, screen, fireEvent } from '@testing-library/react';
import { UseFormRegister } from 'react-hook-form';
import { ProfileFormData } from '../../../../../../lib/schema/profileShema';
import Input from '../Input';

const mockOnChange = jest.fn();
const mockOnBlur = jest.fn();
const mockRef = jest.fn();

const register = (() => ({
  onChange: mockOnChange,
  onBlur: mockOnBlur,
  ref: mockRef,
  name: 'name',
})) as unknown as UseFormRegister<ProfileFormData>;

const baseProps = {
  name: 'name' as const,
  type: 'text',
  label: 'Name',
  placeholder: 'e.g. John',
  autoComplete: 'name',
  register,
  error: '',
};

describe('Input', () => {
  it('renders input with correct props', () => {
    render(<Input {...baseProps} />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'e.g. John');
  });

  it('does not show error message when no error is provided', () => {
    render(<Input {...baseProps} error="" />);
    const errorElement = screen.queryByText('Required field');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('displays error when provided', () => {
    render(<Input {...baseProps} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('related register props correctly to the input', () => {
    render(<Input {...baseProps} />);
    const input = screen.getByLabelText('Name');

    fireEvent.change(input, { target: { value: 'Julie' } });
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnBlur).toHaveBeenCalled();
    expect(mockRef).toHaveBeenCalled();
  });
});
