import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const InfoTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  margin-bottom: 0;
`;

export const InfoColGroup = styled.colgroup`
  & > col:nth-of-type(1) {
    width: 120px;
  }

  & > col:nth-of-type(2) {
    width: 75%;
  }

  & > col:nth-of-type(3) {
    width: 120px;
  }

  & > col:nth-of-type(4) {
    width: 75%;
  }
`;

export const InfoRow = styled.tr`
  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const InfoTh = styled.th`
  width: 120px;
  vertical-align: middle;
  padding: 8px 10px 8px 15px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f9fc')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  text-align: left;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InfoTd = styled.td`
  vertical-align: middle;
  padding: 8px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DeploymentsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const DescriptionText = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: #fff;
  }
`;

export const ConfirmDeleteButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ConfirmMessage = styled.div`
  text-align: center;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
