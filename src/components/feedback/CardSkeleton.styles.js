import styled from '@emotion/styled';

export const Box = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius}px;
  padding: 16px;
  height: ${({ height }) => height || '120px'};
  box-shadow: ${({ theme }) => theme.shadow};
`;
