import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shimmer = keyframes`
  0%   { background-position: -240px 0; }
  100% { background-position:  240px 0; }
`;

const baseBg = (t) =>
  t.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
const hiBg = (t) =>
  t.mode === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.12)';

export const Shimmer = styled.div`
  --h: ${({ height }) => height || '12px'};

  height: var(--h);
  border-radius: 6px;
  margin: 10px 0;
  background-color: ${({ theme }) => baseBg(theme)};
  background-image: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => hiBg(theme)},
    transparent
  );
  background-size: 240px 100%;
  animation: ${shimmer} 1.1s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-image: none;
  }
`;
