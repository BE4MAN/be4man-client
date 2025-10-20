import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { mq } from '@/styles/theme';

const shimmer = keyframes`
  0%   { background-position: -15rem 0; }
  100% { background-position:  15rem 0; }
`;

export const Shimmer = styled.div`
  --h: ${({ height }) => height || '0.75rem'};

  height: var(--h);
  border-radius: ${({ theme }) => theme.radius.md};
  margin: ${({ theme }) => `${theme.spacing.sm} 0`};
  background-color: ${({ theme }) => theme.colors.skeletonBase};
  background-image: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.skeletonHi},
    transparent
  );
  background-size: 15rem 100%;
  animation: ${shimmer} 1.1s linear infinite;
  will-change: background-position;

  ${mq.md} {
    background-size: 20rem 100%;
  }
  ${mq.lg} {
    background-size: 24rem 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-image: none;
  }
`;
