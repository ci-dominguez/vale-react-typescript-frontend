interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
}

const Button = ({ children, variant = 'primary' }: ButtonProps) => {
  const baseClasses = 'rounded-full flex font-editorial text-lg';

  const variantStylesMap: Record<string, string> = {
    primary: 'bg-charcoal text-white',
    secondary: '',
  };

  const variantStyles =
    variantStylesMap[variant] || variantStylesMap['primary'];

  return (
    <button type='button' className={`${baseClasses} ${variantStyles}`}>
      {children}
    </button>
  );
};

export default Button;
