// 작성자 : 김민호, 이원석
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from './DeployManagement.styles';

function Tag({ text, onRemove }) {
  return (
    <S.TagPill>
      {text}
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`${text} 제거`}>
          ×
        </button>
      )}
    </S.TagPill>
  );
}

export default function ApplyForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [expTime, setExpTime] = useState('');
  const [type, setType] = useState('정기배포');

  const [startAt, setStartAt] = useState(null);

  const availableServices = useMemo(
    () => ['user-service', 'billing-api', 'order-service', 'notification'],
    [],
  );

  const [serviceSelect, setServiceSelect] = useState('user-service');
  const [services, setServices] = useState(['user-service', 'billing-api']);
  const [body, setBody] = useState('');

  const [approverQuery, setApproverQuery] = useState('');
  const [approvers] = useState([]);

  const addService = () => {
    if (serviceSelect && !services.includes(serviceSelect)) {
      setServices((prev) => [...prev, serviceSelect]);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({
      title,
      type,
      startAt,
      services,
      body,
      approvers,
    });
  };

  return (
    <form onSubmit={submit} style={{ display: 'contents' }}>
      <S.ApplyLeft>
        <S.Field>
          <S.Label>제목</S.Label>
          <S.Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=""
          />
        </S.Field>

        <S.Grid2>
          <S.Field>
            <S.Label>배포 유형</S.Label>
            <S.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option>정기배포</option>
              <option>긴급패치</option>
              <option>일반배포</option>
            </S.Select>
          </S.Field>

          <S.Field>
            <S.Label>배포 대상 PR</S.Label>
            <S.Input value={title} />
          </S.Field>
        </S.Grid2>

        <S.Grid2>
          <S.Field>
            <S.Label>배포 시작 시각</S.Label>
            <S.DateField>
              <DatePicker
                selected={startAt}
                onChange={setStartAt}
                showTimeSelect
                dateFormat="yyyy.MM.dd HH:mm"
                placeholderText=""
                popperPlacement="bottom-start"
              />
            </S.DateField>
          </S.Field>

          <S.Field>
            <S.Label>배포 예상 시간</S.Label>
            <S.Input
              value={expTime}
              onChange={(e) => setExpTime(e.target.value)}
              placeholder="ex) 30분, 1시간"
            />
          </S.Field>
        </S.Grid2>

        <S.Field>
          <S.ServiceWrap>
            <S.Label>연관서비스</S.Label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <S.Select
                value={serviceSelect}
                onChange={(e) => setServiceSelect(e.target.value)}
              >
                {availableServices.map((svc) => (
                  <option key={svc} value={svc}>
                    {svc}
                  </option>
                ))}
              </S.Select>
              <S.SmallBtn type="button" onClick={addService}>
                추가
              </S.SmallBtn>
            </div>
          </S.ServiceWrap>
          <S.TagWrap>
            <S.TagArea>
              {services.map((s) => (
                <Tag
                  key={s}
                  text={s}
                  onRemove={() =>
                    setServices((prev) => prev.filter((x) => x !== s))
                  }
                />
              ))}
            </S.TagArea>
          </S.TagWrap>
        </S.Field>

        <S.Field>
          <S.Label>내용</S.Label>
          <S.Textarea
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="내용을 입력해주세요."
          />
        </S.Field>
      </S.ApplyLeft>

      <S.ApplyRight>
        <S.RightTitle>결재 라인</S.RightTitle>
        <S.Input
          placeholder="이름을 검색해주세요."
          value={approverQuery}
          onChange={(e) => setApproverQuery(e.target.value)}
        />
        <S.ApproverBox aria-label="결재라인">
          {approvers.length === 0 ? (
            <S.Empty>선택된 결재자가 없습니다.</S.Empty>
          ) : (
            <ul>
              {approvers.map((a) => (
                <li key={a.id}>{a.name}</li>
              ))}
            </ul>
          )}
        </S.ApproverBox>

        <S.FlexRow gap={8} style={{ marginTop: 12 }}>
          <S.SecondaryBtn type="button" onClick={onCancel}>
            취소
          </S.SecondaryBtn>
          <S.PrimaryBtn type="submit">등록</S.PrimaryBtn>
        </S.FlexRow>
      </S.ApplyRight>
    </form>
  );
}
