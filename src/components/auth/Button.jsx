import React from 'react';

import * as S from './Button.styles';

export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      onClick,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <S.StyledButton
        ref={ref}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        onClick={onClick}
        type={type}
        {...props}
      >
        {children}
      </S.StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
