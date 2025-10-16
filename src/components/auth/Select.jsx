import React from 'react';

import * as S from './Select.styles';

export const Select = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      placeholder = '선택하세요',
      options = [],
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;

    return (
      <S.SelectContainer>
        {label && <S.Label>{label}</S.Label>}
        <S.SelectWrapper>
          <S.StyledSelect ref={ref} $hasError={hasError} size={size} {...props}>
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </S.StyledSelect>
          <S.ChevronIcon size={20} />
        </S.SelectWrapper>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
      </S.SelectContainer>
    );
  },
);

Select.displayName = 'Select';

export default Select;
