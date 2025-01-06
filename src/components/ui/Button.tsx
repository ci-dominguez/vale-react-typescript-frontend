interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
}: ButtonProps) => {
  const baseClasses = 'rounded-full flex font-editorial text-lg';

  const variantStylesMap: Record<string, string> = {
    primary: 'bg-charcoal text-white hover:bg-[#191919]',
    secondary: 'bg-parchment text-charcoal',
  };

  const variantStyles =
    variantStylesMap[variant] || variantStylesMap['primary'];

  return (
    <button type={type} className={`${baseClasses} ${variantStyles}`}>
      {children}
    </button>
  );
};

export default Button;
