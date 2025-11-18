import { Listbox } from '@headlessui/react';
import { Check } from 'lucide-react';
import { Fragment } from 'react';
import React from 'react';

import * as S from './ScheduleCustomSelect.styles';

export const ScheduleCustomSelect = React.forwardRef(
  (
    {
      label,
      error,
      options = [],
      value,
      onChange,
      onBlur,
      multiple = false,
      placeholder,
      showSelectAll = false,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const selectedValues = multiple
      ? Array.isArray(value)
        ? value
        : []
      : [value].filter(Boolean);
    const selected = multiple
      ? options.filter((opt) => selectedValues.includes(opt.value))
      : options.find((opt) => opt.value === value);
    const hasValue = multiple
      ? selectedValues.length > 0
      : !!value && value !== '';

    const allSelected =
      multiple &&
      options.length > 0 &&
      selectedValues.length === options.length;

    const handleSelectAll = () => {
      if (allSelected) {
        // 모두 선택된 경우: 모두 해제
        onChange([]);
      } else {
        // 모두 선택되지 않은 경우: 모두 선택
        onChange(options.map((opt) => opt.value));
      }
    };

    return (
      <S.SelectOuterWrapper ref={ref}>
        <S.SelectContainer>
          {label && <S.Label>{label}</S.Label>}

          <Listbox value={value} onChange={onChange} multiple={multiple}>
            {({ open }) => (
              <S.SelectWrapper>
                <Listbox.Button
                  as={S.SelectButton}
                  $hasError={hasError}
                  $hasValue={hasValue}
                  onBlur={onBlur}
                  {...props}
                >
                  <span>
                    {multiple
                      ? hasValue
                        ? `${selected.length}개 선택됨`
                        : placeholder || ''
                      : selected?.label || placeholder || ''}
                  </span>
                  <S.ChevronIcon $open={open} size={20} />
                </Listbox.Button>

                <Listbox.Options as={S.OptionsPanel}>
                  {multiple && showSelectAll && (
                    <S.SelectAllOption onClick={handleSelectAll}>
                      <span>전체</span>
                      {allSelected && <Check size={16} />}
                    </S.SelectAllOption>
                  )}
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      as={Fragment}
                    >
                      {({ active, selected: isSelected }) => (
                        <S.Option
                          $active={multiple ? active : false}
                          $selected={isSelected}
                        >
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
      </S.SelectOuterWrapper>
    );
  },
);

ScheduleCustomSelect.displayName = 'ScheduleCustomSelect';

export default ScheduleCustomSelect;
