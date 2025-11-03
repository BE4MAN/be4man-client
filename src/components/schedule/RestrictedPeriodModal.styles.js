import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
`;

export const MainContent = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DateTimeSection = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
`;

export const DateRangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DateRangeLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ServicesField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ServicesSelectWrapper = styled.div`
  min-width: 14.0625rem;
  width: auto;
  height: 2.2rem;
  display: flex;
  align-items: center;

  & > div {
    width: 100%;
  }

  /* ScheduleCustomSelect 내부 SelectWrapper 스타일 강제 적용 */
  & > div > div > div {
    min-width: 14.0625rem;
    width: auto;
    height: 2.2rem;
    display: flex;
    align-items: center;
  }
`;

export const ServicesTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;
