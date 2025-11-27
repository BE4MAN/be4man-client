// 작성자 : 이원석
import * as S from './Badge.styles';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) {
  return (
    <S.Badge variant={variant} size={size} className={className} {...props}>
      {children}
    </S.Badge>
  );
}
