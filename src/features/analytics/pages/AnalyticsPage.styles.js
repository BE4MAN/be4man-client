import styled from '@emotion/styled';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.mode === 'light' ? '#F9FAFB' : '#0E1116'};
  padding: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.mq.md`
    padding: ${theme.spacing.lg} ${theme.spacing.lg};
  `}
`;

export const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  animation: fade-in 0.5s ease-in;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.mq.lg`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.mq.md`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${({ theme }) => theme.mq.lg`
    grid-template-columns: repeat(3, 1fr);
  `}
`;
