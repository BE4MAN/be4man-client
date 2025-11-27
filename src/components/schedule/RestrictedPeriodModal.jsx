// 작성자 : 이원석
import { useState } from 'react';

import Button from '@/components/auth/Button';
import Input from '@/components/auth/Input';
import DateTimeRangePicker from '@/components/common/DateTimeRangePicker';
import ServiceTag from '@/components/common/ServiceTag';
import Textarea from '@/components/common/Textarea';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import { DEPARTMENT_REVERSE_MAP } from '@/constants/accounts';
import { useAuthStore } from '@/stores/authStore';

import * as S from './RestrictedPeriodModal.styles';

export default function RestrictedPeriodModal({
  open,
  onClose,
  availableServices = [],
}) {
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSave = () => {
    // TODO: API 호출
    onClose();
  };

  const isTitleValid = title.trim().length > 0;
  const isDateTimeValid = startDate && endDate && startTime && endTime;
  const isFormValid = isTitleValid && isDateTimeValid;

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleTimeChange = (start, end) => {
    setStartTime(start);
    setEndTime(end);
  };

  return (
    <ScheduleModal
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
          <S.UserInfoBox>
            <Input label="등록자" value={user?.name || ''} readOnly />
            <Input
              label="등록부서"
              value={
                user?.department
                  ? DEPARTMENT_REVERSE_MAP[user.department] || user.department
                  : '없음'
              }
              readOnly
            />
          </S.UserInfoBox>
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

          <S.ServicesField>
            <S.ServicesSelectWrapper>
              <ScheduleCustomSelect
                label="연관 서비스"
                value={Array.isArray(selectedServices) ? selectedServices : []}
                onChange={(value) => {
                  // Headless UI Listbox가 multiple 모드에서 선택된 배열을 직접 반환
                  setSelectedServices(Array.isArray(value) ? value : []);
                }}
                options={availableServices}
                multiple
                placeholder="전체"
              />
            </S.ServicesSelectWrapper>

            {Array.isArray(selectedServices) && selectedServices.length > 0 && (
              <S.ServicesTagContainer>
                {selectedServices.map((service) => (
                  <ServiceTag
                    key={service}
                    service={service}
                    onRemove={() =>
                      setSelectedServices((prev) => {
                        const prevArray = Array.isArray(prev) ? prev : [];
                        return prevArray.filter((s) => s !== service);
                      })
                    }
                  />
                ))}
              </S.ServicesTagContainer>
            )}
          </S.ServicesField>
        </S.MainContent>

        <S.DateTimeSection>
          <DateTimeRangePicker
            startDate={startDate}
            endDate={endDate}
            startTime={startTime}
            endTime={endTime}
            onDateChange={handleDateRangeChange}
            onTimeChange={handleTimeChange}
            showLabel
          />
        </S.DateTimeSection>
      </S.Content>
    </ScheduleModal>
  );
}
