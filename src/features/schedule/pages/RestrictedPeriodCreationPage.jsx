import { RotateCcw } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import DateTimePicker from '@/components/common/DateTimePicker';
import ServiceTag from '@/components/common/ServiceTag';
import TimePicker from '@/components/common/TimePicker';
import { RequiredAsterisk } from '@/components/schedule/commonStyles';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import { DEPARTMENT_REVERSE_MAP } from '@/constants/accounts';
import { useAuthStore } from '@/stores/authStore';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';

import { mockDeployments } from '../mockData';

import * as S from './RestrictedPeriodCreationPage.styles';

export default function RestrictedPeriodCreationPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [banType, setBanType] = useState(''); // 유형
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [recurrenceType, setRecurrenceType] = useState(''); // '매일', '매주', '매월', ''
  const [recurrenceWeekday, setRecurrenceWeekday] = useState(''); // 요일 (월~일)
  const [recurrenceWeekOfMonth, setRecurrenceWeekOfMonth] = useState(''); // N번째 주 (1~4)
  const [selectedServices, setSelectedServices] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const restrictedHoursInputRef = useRef(null);
  const [errors, setErrors] = useState({
    title: false,
    banType: false,
    time: false,
    description: false,
    services: false,
  });
  const [touched, setTouched] = useState({
    title: false,
    banType: false,
    time: false,
    description: false,
    services: false,
  });

  // 서비스 목록 추출
  const availableServices = [
    ...new Set(mockDeployments.map((deployment) => deployment.service)),
  ].sort();

  const handleSaveClick = () => {
    // 필수 필드 검증
    const titleError = !title.trim();
    const banTypeError = !banType || banType === '';
    const timeError = !(startTime && endTime);
    const descriptionError = !description.trim();
    const servicesError =
      !Array.isArray(selectedServices) || selectedServices.length === 0;

    setErrors({
      title: titleError,
      banType: banTypeError,
      time: timeError,
      description: descriptionError,
      services: servicesError,
    });

    setTouched({
      title: true,
      banType: true,
      time: true,
      description: true,
      services: true,
    });

    // 모든 필드가 유효한 경우에만 모달 열기
    if (
      !titleError &&
      !banTypeError &&
      !timeError &&
      !descriptionError &&
      !servicesError
    ) {
      setRegisterModalOpen(true);
    }
  };

  const handleCancelClick = () => {
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    setCancelModalOpen(false);
    navigate('/schedule', { state: { viewMode: 'list' } });
  };

  const confirmRegister = () => {
    setRegisterModalOpen(false);
    // TODO: API 호출
    navigate('/schedule', { state: { viewMode: 'list' } });
  };

  const isTitleValid = title.trim().length > 0;
  const isBanTypeValid = banType && banType !== '';
  const isTimeValid = startTime && endTime;
  const isDescriptionValid = description.trim().length > 0;
  const isServicesValid =
    Array.isArray(selectedServices) && selectedServices.length > 0;
  const isFormValid =
    isTitleValid &&
    isBanTypeValid &&
    isTimeValid &&
    isDescriptionValid &&
    isServicesValid;

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleTimeChange = (start, end) => {
    setStartTime(start);
    setEndTime(end);
  };

  const handleResetServices = () => {
    setSelectedServices([]);
  };

  return (
    <S.PageContainer>
      <S.Panel>
        <S.PageTitle>작업 금지 기간 추가</S.PageTitle>

        <S.Toolbar>
          <SecondaryBtn onClick={handleCancelClick}>취소</SecondaryBtn>
          <PrimaryBtn onClick={handleSaveClick} disabled={!isFormValid}>
            등록
          </PrimaryBtn>
        </S.Toolbar>

        <S.MetaTable role="table">
          <S.MetaColGroup>
            <col />
            <col />
            <col />
            <col />
          </S.MetaColGroup>

          <S.MetaRow>
            <S.MetaTh>등록자</S.MetaTh>
            <S.MetaTdText>{user?.name || ''}</S.MetaTdText>
            <S.MetaTh>등록부서</S.MetaTh>
            <S.MetaTdText>
              {user?.department
                ? DEPARTMENT_REVERSE_MAP[user.department] || user.department
                : '없음'}
            </S.MetaTdText>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>
              제목 <RequiredAsterisk>*</RequiredAsterisk>
            </S.MetaTh>
            <S.MetaTdTitle>
              <S.Input
                placeholder="작업 금지 제목을 입력하세요"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (touched.title) {
                    setErrors((prev) => ({
                      ...prev,
                      title: !e.target.value.trim(),
                    }));
                  }
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                $hasError={touched.title && errors.title}
              />
            </S.MetaTdTitle>
            <S.MetaTh>
              유형 <RequiredAsterisk>*</RequiredAsterisk>
            </S.MetaTh>
            <S.MetaTd>
              <ScheduleCustomSelect
                value={banType}
                onChange={(value) => {
                  setBanType(value || '');
                  if (touched.banType) {
                    setErrors((prev) => ({
                      ...prev,
                      banType: !value || value === '',
                    }));
                  }
                }}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, banType: true }))
                }
                options={[
                  { value: 'DB 마이그레이션', label: 'DB 마이그레이션' },
                  { value: '서버 점검', label: '서버 점검' },
                  { value: '외부 일정', label: '외부 일정' },
                  { value: '재난 재해', label: '재난 재해' },
                ]}
                placeholder="유형 선택"
                error={touched.banType && errors.banType ? '' : ''}
              />
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>금지 주기</S.MetaTh>
            <S.MetaTdRecurrence colSpan={3}>
              <S.RecurrenceContainerWrapper>
                <S.RecurrenceContainer>
                  <S.RecurrenceTypeSelect>
                    <ScheduleCustomSelect
                      value={recurrenceType}
                      onChange={(value) => {
                        setRecurrenceType(value || '');
                        // 금지 주기를 선택하면 금지 일자 초기화
                        if (value && value !== '') {
                          setStartDate('');
                        }
                      }}
                      options={[
                        { value: '', label: '없음' },
                        { value: '매일', label: '매일' },
                        { value: '매주', label: '매주' },
                        { value: '매월', label: '매월' },
                      ]}
                      placeholder="없음"
                    />
                  </S.RecurrenceTypeSelect>

                  {recurrenceType === '매주' && (
                    <S.RecurrenceField>
                      <ScheduleCustomSelect
                        value={recurrenceWeekday}
                        onChange={(value) => setRecurrenceWeekday(value || '')}
                        options={[
                          { value: '월요일', label: '월요일' },
                          { value: '화요일', label: '화요일' },
                          { value: '수요일', label: '수요일' },
                          { value: '목요일', label: '목요일' },
                          { value: '금요일', label: '금요일' },
                          { value: '토요일', label: '토요일' },
                          { value: '일요일', label: '일요일' },
                        ]}
                        placeholder="요일 선택"
                      />
                    </S.RecurrenceField>
                  )}

                  {recurrenceType === '매월' && (
                    <>
                      <S.RecurrenceField>
                        <ScheduleCustomSelect
                          value={recurrenceWeekOfMonth}
                          onChange={(value) =>
                            setRecurrenceWeekOfMonth(value || '')
                          }
                          options={[
                            { value: '1', label: '첫째 주' },
                            { value: '2', label: '둘째 주' },
                            { value: '3', label: '셋째 주' },
                            { value: '4', label: '넷째 주' },
                          ]}
                          placeholder="주 선택"
                        />
                      </S.RecurrenceField>
                      <S.RecurrenceField>
                        <ScheduleCustomSelect
                          value={recurrenceWeekday}
                          onChange={(value) =>
                            setRecurrenceWeekday(value || '')
                          }
                          options={[
                            { value: '월요일', label: '월요일' },
                            { value: '화요일', label: '화요일' },
                            { value: '수요일', label: '수요일' },
                            { value: '목요일', label: '목요일' },
                            { value: '금요일', label: '금요일' },
                            { value: '토요일', label: '토요일' },
                            { value: '일요일', label: '일요일' },
                          ]}
                          placeholder="요일 선택"
                        />
                      </S.RecurrenceField>
                    </>
                  )}
                </S.RecurrenceContainer>
              </S.RecurrenceContainerWrapper>
            </S.MetaTdRecurrence>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>금지 일자</S.MetaTh>
            <S.MetaTdDate colSpan={3}>
              <DateTimePicker
                date={startDate}
                startTime={startTime}
                endTime={endTime}
                onDateChange={(date) => {
                  handleDateChange(date);
                  // 금지 일자를 선택하면 금지 주기 초기화
                  if (date) {
                    setRecurrenceType('');
                    setRecurrenceWeekday('');
                    setRecurrenceWeekOfMonth('');
                  }
                }}
                onTimeChange={(start, end) => {
                  handleTimeChange(start, end);
                }}
                showLabel={false}
                error={false}
                disabled={!!recurrenceType && recurrenceType !== ''}
              />
            </S.MetaTdDate>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>
              시작 시각 <RequiredAsterisk>*</RequiredAsterisk>
            </S.MetaTh>
            <S.MetaTdTime>
              <TimePicker
                value={startTime || ''}
                onChange={(newValue) => {
                  setStartTime(newValue);
                  if (touched.time) {
                    setErrors((prev) => ({
                      ...prev,
                      time: !(newValue && endTime),
                    }));
                  }
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, time: true }))}
                $hasError={touched.time && errors.time}
              />
            </S.MetaTdTime>
            <S.MetaTh>
              금지 시간 <RequiredAsterisk>*</RequiredAsterisk>
            </S.MetaTh>
            <S.MetaTdRestrictedHours>
              <S.RestrictedHoursInputWrapper>
                <S.RestrictedHoursInput
                  ref={restrictedHoursInputRef}
                  type="number"
                  min="1"
                  disabled={false}
                  value={
                    startTime && endTime
                      ? (() => {
                          const start = new Date(`2000-01-01T${startTime}:00`);
                          const end = new Date(`2000-01-01T${endTime}:00`);
                          if (end < start) {
                            end.setDate(end.getDate() + 1);
                          }
                          const diffMs = end - start;
                          return Math.floor(
                            diffMs / (1000 * 60 * 60),
                          ).toString();
                        })()
                      : ''
                  }
                  onChange={(e) => {
                    const hours = parseInt(e.target.value, 10);
                    if (!isNaN(hours) && hours > 0) {
                      if (startTime) {
                        const [startHour, startMinute] = startTime
                          .split(':')
                          .map(Number);
                        const totalMinutes =
                          startHour * 60 + startMinute + hours * 60;
                        const endHour = Math.floor(totalMinutes / 60);
                        const endMinute = totalMinutes % 60;
                        const newEndTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
                        setEndTime(newEndTime);
                        if (touched.time) {
                          setErrors((prev) => ({
                            ...prev,
                            time: !(startTime && newEndTime),
                          }));
                        }
                      } else {
                        // startTime이 없어도 값은 저장 가능
                        if (touched.time) {
                          setErrors((prev) => ({
                            ...prev,
                            time: !e.target.value,
                          }));
                        }
                      }
                    }
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, time: true }))}
                  $hasError={touched.time && errors.time}
                />
                <S.HoursUnit>시간</S.HoursUnit>
              </S.RestrictedHoursInputWrapper>
            </S.MetaTdRestrictedHours>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>
              연관 서비스 <RequiredAsterisk>*</RequiredAsterisk>
            </S.MetaTh>
            <S.MetaTdService colSpan={3}>
              <S.ServiceInputContainer>
                <S.ServiceSelectWrapper>
                  <ScheduleCustomSelect
                    value={
                      Array.isArray(selectedServices) ? selectedServices : []
                    }
                    onChange={(value) => {
                      setSelectedServices(Array.isArray(value) ? value : []);
                      if (touched.services) {
                        setErrors((prev) => ({
                          ...prev,
                          services: !Array.isArray(value) || value.length === 0,
                        }));
                      }
                    }}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, services: true }))
                    }
                    options={availableServices.map((service) => ({
                      value: service,
                      label: service,
                    }))}
                    multiple
                    showSelectAll
                    error={touched.services && errors.services ? '' : ''}
                  />
                </S.ServiceSelectWrapper>
                <S.ServiceButtonsContainer>
                  <S.ServiceButton type="button" onClick={handleResetServices}>
                    <RotateCcw size={14} />
                    <span>초기화</span>
                  </S.ServiceButton>
                </S.ServiceButtonsContainer>
              </S.ServiceInputContainer>
              {Array.isArray(selectedServices) &&
                selectedServices.length > 0 && (
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
            </S.MetaTdService>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>
              설명 <RequiredAsterisk>*</RequiredAsterisk>
            </S.MetaTh>
            <S.MetaTdDescription colSpan={3}>
              <S.Textarea
                placeholder="금지 기간에 대한 설명을 입력하세요"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (touched.description) {
                    setErrors((prev) => ({
                      ...prev,
                      description: !e.target.value.trim(),
                    }));
                  }
                }}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, description: true }))
                }
                $hasError={touched.description && errors.description}
              />
              {touched.description && errors.description && (
                <div
                  style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}
                >
                  설명을 입력해주세요
                </div>
              )}
            </S.MetaTdDescription>
          </S.MetaRow>
        </S.MetaTable>
      </S.Panel>

      {/* 취소 확인 모달 */}
      <ScheduleModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="등록 취소"
        showCloseButton={false}
        closeOnOverlayClick={false}
        footer={
          <>
            <SecondaryBtn onClick={() => setCancelModalOpen(false)}>
              취소
            </SecondaryBtn>
            <PrimaryBtn onClick={confirmCancel}>확인</PrimaryBtn>
          </>
        }
      >
        작성 중인 내용이 저장되지 않은 채 취소됩니다.
      </ScheduleModal>

      {/* 등록 확인 모달 */}
      <ScheduleModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title="작업 금지 기간 등록"
        showCloseButton={false}
        closeOnOverlayClick={false}
        footer={
          <>
            <SecondaryBtn onClick={() => setRegisterModalOpen(false)}>
              취소
            </SecondaryBtn>
            <PrimaryBtn onClick={confirmRegister}>확인</PrimaryBtn>
          </>
        }
      >
        본 작업 금지를 등록하시겠습니까?
      </ScheduleModal>
    </S.PageContainer>
  );
}
