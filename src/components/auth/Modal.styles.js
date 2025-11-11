import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.modalOverlay};
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ $zIndex }) => $zIndex || 50};
`;

export const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-height: 90vh;
  overflow-y: auto;
  ${({ variant }) =>
    variant === 'detail'
      ? `
    display: flex;
    flex-direction: column;
    min-width: 50vh;
    width: 75%;
  `
      : `
    max-width: 75%;
  `}
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h3`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) =>
    `calc(${theme.typography.fontSize['2xl']} * 0.8)`};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin: 0;
`;

export const TitleIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: all 0.2s ease;

  &&:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ModalBody = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  ${({ variant }) =>
    variant === 'detail'
      ? `
    flex: 1;
  `
      : ''}
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
