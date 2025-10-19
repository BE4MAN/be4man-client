import styled from '@emotion/styled';

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  position: relative;
`;

export const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(145deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const MainContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 624px;
  margin: 0 ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.mq.md`
    margin: 0 ${theme.spacing.md};
  `}

  ${({ theme }) => theme.mq.xl`
    margin: 0 ${theme.spacing.lg};
  `}
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Logo = styled.img`
  height: 4.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.mq.md`
    height: 6rem;
  `}

  ${({ theme }) => theme.mq.xl`
    height: 7.2rem;
  `}
`;

export const ServiceDescription = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.01em;
`;

export const Card = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(14.4px);
  box-shadow: ${({ theme }) => theme.shadow.md};

  ${({ theme }) => theme.mq.md`
    padding: ${theme.spacing.lg};
  `}
`;

export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const GithubButtonWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const WelcomeTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin: 0;

  ${({ theme }) => theme.mq.md`
    font-size: ${theme.typography.fontSize['2xl']};
  `}

  ${({ theme }) => theme.mq.xl`
    font-size: ${theme.typography.fontSize['3xl']};
  `}
`;

export const WelcomeText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;

  ${({ theme }) => theme.mq.md`
    font-size: ${theme.typography.fontSize.md};
  `}

  ${({ theme }) => theme.mq.xl`
    font-size: ${theme.typography.fontSize.lg};
  `}
`;

export const GithubButton = styled.button`
  width: 100%;
  height: 3.3rem;
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.github};
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.githubHover};
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
`;

export const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const StepCircle = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.05rem;
`;

export const StepLabel = styled.span`
  color: ${(props) => props.color};
  font-size: 1.05rem;
`;

export const ProgressLine = styled.div`
  width: 3.6rem;
  height: 2.4px;
  background-color: ${(props) => props.bg};
`;

export const FormSection = styled.div`
  text-align: center;
`;

export const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-top: 24px;
  margin-bottom: 36px;

  ${({ theme }) => theme.mq.md`
    font-size: ${theme.typography.fontSize['2xl']};
  `}

  ${({ theme }) => theme.mq.xl`
    font-size: ${theme.typography.fontSize['3xl']};
  `}
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.mq.md`
    gap: ${theme.spacing.lg};
    width: 90%;
  `}

  ${({ theme }) => theme.mq.xl`
    width: 80%;
  `}
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-align: left;
`;

export const Input = styled.input`
  width: 100%;
  height: 3.3rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${(props) => props.borderColor};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: left;
`;

export const SubmitErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.error}15`};
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: 48px;
  margin-bottom: 24px;
  justify-content: center;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mq.md`
    flex-direction: row;
    gap: ${theme.spacing.md};

    & > * {
      flex: 1;
      max-width: 200px;
    }
  `}
`;

export const BackButton = styled.button`
  flex: 1;
  height: 3.3rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 3.3rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.brand};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }
`;

export const SuccessSection = styled.div`
  padding: 3.6rem 0;
  text-align: center;
`;

export const SuccessEmoji = styled.div`
  font-size: 4.5rem;
  margin-bottom: 1.8rem;
`;

export const SuccessTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SuccessText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.modalOverlay};
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  text-align: center;
  max-width: 400px;
  width: 90%;

  ${({ theme }) => theme.mq.md`
    padding: calc(${theme.spacing.lg} * 2);
  `}
`;

export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.brand};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ModalText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
