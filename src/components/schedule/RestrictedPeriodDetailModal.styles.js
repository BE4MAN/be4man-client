// 작성자 : 이원석
import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const Content = styled.div`
  width: 100%;
`;

export const InfoTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
`;

export const InfoColGroup = styled.colgroup`
  & > col:nth-of-type(1) {
    width: 120px;
  }

  & > col:nth-of-type(2) {
    width: 50%;
  }

  & > col:nth-of-type(3) {
    width: 120px;
  }

  & > col:nth-of-type(4) {
    width: 50%;
  }
`;

export const InfoRow = styled.tr`
  &:not(:first-of-type) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const InfoTh = styled.th`
  width: 120px;
  vertical-align: middle;
  padding: 8px 10px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0f1520' : '#f7f9fc')};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

export const InfoTd = styled.td`
  vertical-align: middle;
  padding: 8px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  position: relative;
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4537rem;
  height: 2.2687rem;
  padding: 0 0.5rem;
  border-radius: 0.3125rem;
  font-size: 0.7936rem;
  cursor: pointer;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.schedule.restrictedDanger};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.schedule.restrictedDanger};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  ${({ theme }) => theme.mq.md`
    padding: 0 0.75rem;
  `}

  &:hover {
    background: ${({ theme }) => theme.colors.schedule.restrictedDanger};
    color: white;
  }
`;

export const ConfirmButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.brand};
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const ConfirmMessage = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.6;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const EditSection = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const BanTitleIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  padding: 4px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;
