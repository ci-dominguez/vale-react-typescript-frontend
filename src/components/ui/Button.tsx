interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'error';
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
    error: 'bg-red-600 text-white hover:bg-red-700',
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
