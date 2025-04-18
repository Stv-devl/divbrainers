import { ButtonComponent } from '@/types/type';
import { cn } from '../../../lib/utils/cn';

const Button: React.FC<ButtonComponent> = ({
  label,
  onClick,
  color,
  bgColor,
  hoverColor,
  textColor,
  fontSize = 'text-base',
  IconComponent,
  disabled,
  type = 'button',
  iconColor,
  isLoading,
}: ButtonComponent): React.ReactElement => {
  const defaultBg = color === 'filled' ? 'bg-blue-500' : 'bg-transparent';
  const defaultText = color === 'filled' ? 'text-white' : 'text-blue-800';
  const defaultBorder = color === 'empty' ? 'border border-blue-500' : '';
  const defaultHover =
    color === 'filled' ? 'hover:bg-blue-800' : 'hover:bg-blue-100';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        bgColor ?? defaultBg,
        hoverColor ?? defaultHover,
        textColor ?? defaultText,
        defaultBorder,
        fontSize,
        'flex items-center justify-center gap-2 duration-500 ease-in-out font-semibold rounded-lg w-full h-full px-3 cursor-pointer'
      )}
    >
      {isLoading ? (
        <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
      ) : (
        <>
          {IconComponent && <IconComponent fill={iconColor} />}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;
