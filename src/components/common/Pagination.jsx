import { ChevronLeft, ChevronRight } from 'lucide-react';

import * as S from './Pagination.styles';

export function Pagination({ children, className, ...props }) {
  return (
    <S.PaginationContainer className={className} {...props}>
      {children}
    </S.PaginationContainer>
  );
}

export function PaginationContent({ children, className, ...props }) {
  return (
    <S.PaginationContent className={className} {...props}>
      {children}
    </S.PaginationContent>
  );
}

export function PaginationItem({ children, className, ...props }) {
  return (
    <S.PaginationItem className={className} {...props}>
      {children}
    </S.PaginationItem>
  );
}

export function PaginationLink({
  children,
  isActive,
  onClick,
  className,
  ...props
}) {
  return (
    <S.PaginationLink
      isActive={isActive}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </S.PaginationLink>
  );
}

export function PaginationPrevious({ onClick, disabled, className, ...props }) {
  return (
    <S.PaginationButton
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <S.PaginationText>이전</S.PaginationText>
    </S.PaginationButton>
  );
}

export function PaginationNext({ onClick, disabled, className, ...props }) {
  return (
    <S.PaginationButton
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      <S.PaginationText>다음</S.PaginationText>
      <ChevronRight className="h-4 w-4" />
    </S.PaginationButton>
  );
}

export default Pagination;
