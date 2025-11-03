import styled from '@emotion/styled';

export const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 28px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  flex: 0 0 auto;
  max-width: 100%;
  white-space: nowrap;
`;

export const TagText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 16px;
  height: 16px;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.brand};
  }
`;
