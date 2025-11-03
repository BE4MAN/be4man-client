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

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 2px;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

export const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.mq.md`
    grid-template-columns: 1fr 1fr;
  `}
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

  & > div > div > div {
    min-width: 14.0625rem !important;
    width: auto !important;
    height: 2.2rem !important;
    display: flex !important;
    align-items: center !important;
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
