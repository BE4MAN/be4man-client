// 작성자 : 이원석
import { Listbox } from '@headlessui/react';
import { Check } from 'lucide-react';
import React, { Fragment } from 'react';

import * as S from './CustomSelect.styles';

export const CustomSelect = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      options = [],
      value,
      onChange,
      onBlur,
      placeholder = '선택',
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const selected = options.find((opt) => opt.value === value);
    const hasValue = !!value && value !== '';

    return (
      <S.SelectOuterWrapper ref={ref}>
        <S.SelectContainer>
          {label && <S.Label>{label}</S.Label>}

          <Listbox value={value} onChange={onChange}>
            {({ open }) => (
              <S.SelectWrapper>
                <Listbox.Button
                  as={S.SelectButton}
                  $hasError={hasError}
                  $hasValue={hasValue}
                  size={size}
                  onBlur={onBlur}
                  {...props}
                >
                  <span>{selected?.label || placeholder}</span>
                  <S.ChevronIcon $open={open} size={20} />
                </Listbox.Button>

                <Listbox.Options as={S.OptionsPanel}>
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      as={Fragment}
                    >
                      {({ active, selected: isSelected }) => (
                        <S.Option $active={active} $selected={isSelected}>
                          <span>{option.label}</span>
                          {isSelected && <Check size={16} />}
                        </S.Option>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </S.SelectWrapper>
            )}
          </Listbox>
        </S.SelectContainer>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
      </S.SelectOuterWrapper>
    );
  },
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
