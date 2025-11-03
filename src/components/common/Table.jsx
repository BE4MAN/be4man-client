import * as S from './Table.styles';

export function Table({ children, className, ...props }) {
  return (
    <S.TableContainer>
      <S.Table className={className} {...props}>
        {children}
      </S.Table>
    </S.TableContainer>
  );
}

export function TableHeader({ children, className, ...props }) {
  return (
    <S.TableHeader className={className} {...props}>
      {children}
    </S.TableHeader>
  );
}

export function TableBody({ children, className, ...props }) {
  return (
    <S.TableBody className={className} {...props}>
      {children}
    </S.TableBody>
  );
}

export function TableRow({ children, className, onClick, ...props }) {
  return (
    <S.TableRow
      className={className}
      onClick={onClick}
      clickable={!!onClick}
      {...props}
    >
      {children}
    </S.TableRow>
  );
}

export function TableHead({ children, className, ...props }) {
  return (
    <S.TableHead className={className} {...props}>
      {children}
    </S.TableHead>
  );
}

export function TableCell({ children, className, ...props }) {
  return (
    <S.TableCell className={className} {...props}>
      {children}
    </S.TableCell>
  );
}

export default Table;
