// 작성자 : 이원석
import React from 'react';

import * as S from './Input.styles';

export const Input = React.forwardRef(
  ({ label, error, helperText, size = 'md', ...props }, ref) => {
    const hasError = !!error;

    const renderLabel = () => {
      if (!label) return null;

      if (label.includes('*')) {
        const parts = label.split('*');
        return (
          <S.Label>
            {parts[0]}
            <S.RequiredAsterisk>*</S.RequiredAsterisk>
            {parts[1]}
          </S.Label>
        );
      }

      return <S.Label>{label}</S.Label>;
    };

    return (
      <S.InputWrapper>
        <S.InputContainer>
          {renderLabel()}
          <S.StyledInput
            ref={ref}
            $hasError={hasError}
            size={size}
            {...props}
          />
        </S.InputContainer>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
      </S.InputWrapper>
    );
  },
);

Input.displayName = 'Input';

export default Input;
