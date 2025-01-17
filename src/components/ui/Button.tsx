interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'destructive' | 'destructive-outline';
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
}: ButtonProps) => {
  const baseClasses = 'rounded-full flex font-editorial text-lg';

  const variantStylesMap: Record<string, string> = {
    primary: 'bg-charcoal text-white hover:bg-[#191919]',
    secondary: 'bg-parchment text-charcoal',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    'destructive-outline':
      'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
  };

  const variantStyles =
    variantStylesMap[variant] || variantStylesMap['primary'];

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
