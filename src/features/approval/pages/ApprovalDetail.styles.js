import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.bg};
  min-height: calc(100dvh - var(--header-h, 72px));
`;

export const Panel = styled.div`
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 20px 24px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
`;

export const PrimaryBtn = styled.button`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
`;

export const DangerBtn = styled.button`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
`;

export const SubtleBtn = styled.button`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.cancelBorder};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const InfoTable = styled.table`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: 16px;
`;

export const InfoColGroup = styled.colgroup`
  display: block;
`;

export const InfoRow = styled.tr`
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
`;

export const InfoTh = styled.th`
  width: 120px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const InfoTd = styled.td`
  padding: 8px;
  border-right: 0.5px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};

  &[data-bb] {
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Section = styled.section`
  margin-top: 16px;
`;

export const BodyViewer = styled.div`
  min-height: 240px;
  padding: 12px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};

  h2,
  h3 {
    margin: 12px 0 8px;
    font-weight: 600;
  }

  p,
  li {
    line-height: 1.5;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.modalOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 720px;
  max-width: calc(100% - 40px);
  max-height: calc(100% - 80px);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
`;

export const ModalTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ModalBody = styled.div`
  padding: 12px 16px;
  flex: 1;
  overflow-y: auto;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px 14px;
  border-top: 0.5px solid ${({ theme }) => theme.colors.border};
`;

export const ALTable = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

export const ALHeadRow = styled.div`
  display: table-row;
  background: ${({ theme }) => theme.colors.surface};
`;

export const ALRow = styled.div`
  display: table-row;

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.colors.interactiveHover};
  }
`;

export const ALCell = styled.div`
  display: table-cell;
  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};

  &[data-col='comment'] {
    width: 40%;
  }

  [data-head] & {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const CommentText = styled.div`
  white-space: pre-wrap;
`;

export const ReasonLabel = styled.div`
  margin-bottom: 6px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ReasonTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  resize: vertical;
`;
