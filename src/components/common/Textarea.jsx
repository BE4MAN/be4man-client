// 작성자 : 이원석
import * as S from './Textarea.styles';

export default function Textarea({
  label,
  error,
  className,
  rows = 4,
  ...props
}) {
  return (
    <S.Container className={className}>
      {label && <S.Label>{label}</S.Label>}
      <S.Textarea rows={rows} hasError={!!error} {...props} />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
}
