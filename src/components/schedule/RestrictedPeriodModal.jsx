import { useState } from 'react';

import Button from '@/components/auth/Button';
import Input from '@/components/auth/Input';
import Modal from '@/components/auth/Modal';
import DateTimePicker from '@/components/common/DateTimePicker';
import Textarea from '@/components/common/Textarea';

import * as S from './RestrictedPeriodModal.styles';

export default function RestrictedPeriodModal({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const handleSave = () => {
    // TODO: API 호출
    onClose();
  };

  const isTitleValid = title.trim().length > 0;
  const isDateTimeValid = startDateTime && endDateTime;
  const isFormValid = isTitleValid && isDateTimeValid;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="작업 금지 기간 추가"
      maxWidth="1200px"
      variant="creation"
      footer={
        <S.Footer>
          <Button variant="cancel" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isFormValid}
          >
            저장
          </Button>
        </S.Footer>
      }
    >
      <S.Content>
        <S.MainContent>
          <Input
            label="제목 *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="금지 기간 제목을 입력하세요"
            error={
              title.length > 0 && !isTitleValid ? '제목을 입력해주세요' : ''
            }
          />

          <Textarea
            label="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="금지 기간에 대한 설명을 입력하세요"
            rows={3}
          />
        </S.MainContent>

        <S.DateTimeSection>
          <DateTimePicker
            label="시작일자 *"
            value={startDateTime}
            onChange={setStartDateTime}
          />

          <DateTimePicker
            label="종료일자 *"
            value={endDateTime}
            onChange={setEndDateTime}
          />
        </S.DateTimeSection>
      </S.Content>
    </Modal>
  );
}
