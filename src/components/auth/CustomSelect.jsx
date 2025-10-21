import { Listbox, Transition } from '@headlessui/react';
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
                  <span>{selected?.label || ''}</span>
                  <S.ChevronIcon $open={open} size={20} />
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Listbox.Options as={S.OptionsPanel}>
                    {options.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <S.Option $active={active} $selected={selected}>
                            <span>{option.label}</span>
                            {selected && <Check size={16} />}
                          </S.Option>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
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
