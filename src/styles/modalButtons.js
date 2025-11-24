import styled from '@emotion/styled';

export const PrimaryBtn = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primary ?? '#0066cc'};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  ${({ disabled }) =>
    !disabled &&
    `
    &:hover {
      opacity: 0.9;
    }
  `}
`;

export const SecondaryBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? '#E5E7EB' : theme.colors.border)};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#fff')};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#0B1220' : theme.colors.text};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  ${({ disabled, theme }) =>
    !disabled &&
    `
    &:hover {
      background: ${theme.mode === 'dark' ? '#F3F4F6' : '#f7f7fb'};
    }
  `}
`;
