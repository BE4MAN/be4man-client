import { X } from 'lucide-react';

import * as S from './ServiceTag.styles';

export default function ServiceTag({ service, onRemove }) {
  return (
    <S.Tag>
      <S.TagText>{service}</S.TagText>
      {onRemove && (
        <S.RemoveButton
          type="button"
          onClick={onRemove}
          aria-label={`${service} 필터 제거`}
        >
          <X size={14} />
        </S.RemoveButton>
      )}
    </S.Tag>
  );
}
