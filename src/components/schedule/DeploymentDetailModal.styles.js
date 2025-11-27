// 작성자 : 이원석
import styled from '@emotion/styled';

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
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
`;

export const TitleLink = styled.span`
  color: ${({ theme }) => theme.colors.brand || '#0066cc'};
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.brand || '#0066cc'}40;

  &:hover {
    color: ${({ theme }) => theme.colors.brand || '#0066cc'};
    text-decoration-color: ${({ theme }) => theme.colors.brand || '#0066cc'};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;
