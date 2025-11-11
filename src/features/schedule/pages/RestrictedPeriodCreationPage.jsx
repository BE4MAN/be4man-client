import { format } from 'date-fns';
import { RotateCcw } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { scheduleAPI } from '@/api/schedule';
import DateTimePicker from '@/components/common/DateTimePicker';
import ServiceTag from '@/components/common/ServiceTag';
import TimePicker from '@/components/common/TimePicker';
import { RequiredAsterisk } from '@/components/schedule/commonStyles';
import ScheduleCustomSelect from '@/components/schedule/components/ScheduleCustomSelect';
import ScheduleModal from '@/components/schedule/components/ScheduleModal';
import ConflictingDeploymentsList from '@/components/schedule/ConflictingDeploymentsList';
import * as Detail from '@/components/schedule/RestrictedPeriodDetailModal.styles';
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
  const [duration, setDuration] = useState('');
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  const [isRecurrenceEndNone, setIsRecurrenceEndNone] = useState(true);
  const [recurrenceType, setRecurrenceType] = useState(''); // '매일', '매주', '매월', ''
  const [recurrenceWeekday, setRecurrenceWeekday] = useState(''); // 요일 (월~일)
  const [recurrenceWeekOfMonth, setRecurrenceWeekOfMonth] = useState(''); // N번째 주 (1~4)
  const [selectedServices, setSelectedServices] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [conflictingDeployments, setConflictingDeployments] = useState([]);
  const [isLoadingConflicts, setIsLoadingConflicts] = useState(false);
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

  const parseDurationHours = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getEndedAtLabel = () => {
    const hours = parseDurationHours(duration);
    if (!startDate || !startTime || hours <= 0) return '—';
    const base = new Date(`${startDate}T${startTime}:00`);
    if (Number.isNaN(base.getTime())) return '—';
    const ended = new Date(base);
    ended.setHours(ended.getHours() + hours);
    return format(ended, 'yyyy-MM-dd HH:mm');
  };

  const weekOfMonthLabelMap = {
    1: '첫째 주',
    2: '둘째 주',
    3: '셋째 주',
    4: '넷째 주',
    5: '다섯째 주',
  };

  const getRecurrenceSummary = () => {
    if (!recurrenceType || recurrenceType === '') return '없음';

    let summary = '';
    if (recurrenceType === '매일') {
      summary = '매일';
    } else if (recurrenceType === '매주') {
      summary = recurrenceWeekday ? `매주 ${recurrenceWeekday}` : '매주';
    } else if (recurrenceType === '매월') {
      const weekLabel =
        weekOfMonthLabelMap[Number.parseInt(recurrenceWeekOfMonth, 10)] || '';
      const dayLabel = recurrenceWeekday || '';
      const parts = ['매월', weekLabel, dayLabel].filter(Boolean);
      summary = parts.join(' ');
      if (!summary) {
        summary = '매월';
      }
    } else {
      summary = recurrenceType;
    }

    const endLabel =
      isRecurrenceEndNone || !recurrenceEndDate ? '없음' : recurrenceEndDate;
    return `${summary} (종료: ${endLabel})`;
  };

  const handleSaveClick = () => {
    // 필수 필드 검증
    const titleError = !title.trim();
    const banTypeError = !banType || banType === '';
    const hasDuration = parseDurationHours(duration) > 0;
    const timeError = !(startTime && hasDuration);
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

    // 모든 필드가 유효한 경우에만 충돌 확인 후 모달 열기
    if (
      !titleError &&
      !banTypeError &&
      !timeError &&
      !descriptionError &&
      !servicesError
    ) {
      // 충돌된 배포 작업 조회
      setIsLoadingConflicts(true);
      setConflictingDeployments([]);

      const banData = {
        title,
        description,
        startDate,
        startTime,
        duration: parseDurationHours(duration),
        type: banType,
        services: selectedServices,
        recurrenceType: recurrenceType || null,
        recurrenceWeekday: recurrenceWeekday || null,
        recurrenceWeekOfMonth: recurrenceWeekOfMonth || null,
        recurrenceEndDate: isRecurrenceEndNone
          ? null
          : recurrenceEndDate || null,
      };

      scheduleAPI
        .getConflictingDeployments(banData)
        .then((conflicts) => {
          setConflictingDeployments(conflicts);
          setIsLoadingConflicts(false);
          setRegisterModalOpen(true);
        })
        .catch(() => {
          setIsLoadingConflicts(false);
          setRegisterModalOpen(true);
        });
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
  const isTimeValid = !!(startTime && parseDurationHours(duration) > 0);
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

  const handleResetServices = () => {
    setSelectedServices([]);
  };

  const truncateDescription = (text) => {
    if (!text || text.trim() === '') return '—';
    // 문장 단위로 분리 (마침표, 느낌표, 물음표 기준)
    const sentences = text
      .split(/([.!?]+\s*)/)
      .filter((s) => s.trim().length > 0)
      .reduce((acc, curr, idx) => {
        if (idx % 2 === 0) {
          acc.push(curr);
        } else {
          acc[acc.length - 1] += curr;
        }
        return acc;
      }, [])
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (sentences.length <= 2) {
      return text;
    }

    return sentences.slice(0, 2).join(' ') + '...';
  };

  const renderConfirmationDetail = () => {
    const durationHours = parseDurationHours(duration);
    const durationLabel = durationHours > 0 ? `${durationHours} 시간` : '—';
    const startDateTimeLabel =
      startDate && startTime ? `${startDate} ${startTime}:00` : '—';
    const endedAtLabel = getEndedAtLabel();
    const recurrenceSummary = getRecurrenceSummary();
    const registrantName = user?.name || '—';
    const registrantDepartment = user?.department
      ? DEPARTMENT_REVERSE_MAP[user.department] || user.department
      : '없음';
    const servicesToRender =
      Array.isArray(selectedServices) && selectedServices.length > 0
        ? selectedServices
        : [];
    const descriptionValue = truncateDescription(description);

    return (
      <Detail.ContentWrapper>
        <Detail.Content>
          <Detail.InfoTable role="table">
            <Detail.InfoColGroup>
              <col />
              <col />
              <col />
              <col />
            </Detail.InfoColGroup>
            <Detail.InfoRow>
              <Detail.InfoTh>제목</Detail.InfoTh>
              <Detail.InfoTd>{title || '—'}</Detail.InfoTd>
              <Detail.InfoTh>유형</Detail.InfoTh>
              <Detail.InfoTd>{banType || '—'}</Detail.InfoTd>
            </Detail.InfoRow>
            <Detail.InfoRow>
              <Detail.InfoTh>등록자</Detail.InfoTh>
              <Detail.InfoTd>{registrantName}</Detail.InfoTd>
              <Detail.InfoTh>등록부서</Detail.InfoTh>
              <Detail.InfoTd>{registrantDepartment}</Detail.InfoTd>
            </Detail.InfoRow>
            <Detail.InfoRow>
              <Detail.InfoTh>연관 서비스</Detail.InfoTh>
              <Detail.InfoTd colSpan={3}>
                {servicesToRender.length > 0 ? (
                  <Detail.ServicesContainer>
                    {servicesToRender.map((service) => (
                      <ServiceTag key={service} service={service} />
                    ))}
                  </Detail.ServicesContainer>
                ) : (
                  '—'
                )}
              </Detail.InfoTd>
            </Detail.InfoRow>
            <Detail.InfoRow>
              <Detail.InfoTh>시작일자</Detail.InfoTh>
              <Detail.InfoTd colSpan={3}>{startDateTimeLabel}</Detail.InfoTd>
            </Detail.InfoRow>
            <Detail.InfoRow>
              <Detail.InfoTh>금지 시간</Detail.InfoTh>
              <Detail.InfoTd>{durationLabel}</Detail.InfoTd>
              <Detail.InfoTh>종료 일시</Detail.InfoTh>
              <Detail.InfoTd>{endedAtLabel}</Detail.InfoTd>
            </Detail.InfoRow>
            <Detail.InfoRow>
              <Detail.InfoTh>금지 주기</Detail.InfoTh>
              <Detail.InfoTd colSpan={3}>{recurrenceSummary}</Detail.InfoTd>
            </Detail.InfoRow>
          </Detail.InfoTable>

          <Detail.InfoTable role="table">
            <Detail.InfoColGroup>
              <col />
              <col />
              <col />
              <col />
            </Detail.InfoColGroup>
            <Detail.InfoRow>
              <Detail.InfoTh>설명</Detail.InfoTh>
              <Detail.InfoTd colSpan={3}>{descriptionValue}</Detail.InfoTd>
            </Detail.InfoRow>
          </Detail.InfoTable>
        </Detail.Content>
      </Detail.ContentWrapper>
    );
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
                        const nextType = value || '';
                        setRecurrenceType(nextType);
                        setRecurrenceEndDate('');
                        setIsRecurrenceEndNone(true);
                        if (nextType && nextType !== '') {
                          // 금지 주기를 선택하면 금지 일자 초기화
                          setStartDate('');
                        } else {
                          setRecurrenceWeekday('');
                          setRecurrenceWeekOfMonth('');
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
                            { value: '5', label: '다섯번째 주' },
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
                {recurrenceType && recurrenceType !== '' && (
                  <S.RecurrenceEndSection>
                    <S.RecurrenceEndLabel>종료 일자</S.RecurrenceEndLabel>
                    <S.RecurrenceEndControls>
                      <S.RecurrenceEndNoneOption>
                        <input
                          type="checkbox"
                          checked={isRecurrenceEndNone}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setIsRecurrenceEndNone(checked);
                            if (checked) {
                              setRecurrenceEndDate('');
                            }
                          }}
                        />
                        <span>없음</span>
                      </S.RecurrenceEndNoneOption>
                      <S.RecurrenceEndPicker>
                        <DateTimePicker
                          date={recurrenceEndDate}
                          onDateChange={(date) => {
                            setRecurrenceEndDate(date);
                            if (date) {
                              setIsRecurrenceEndNone(false);
                            }
                          }}
                          showLabel={false}
                          error={false}
                          disabled={isRecurrenceEndNone}
                        />
                      </S.RecurrenceEndPicker>
                    </S.RecurrenceEndControls>
                  </S.RecurrenceEndSection>
                )}
              </S.RecurrenceContainerWrapper>
            </S.MetaTdRecurrence>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>금지 일자</S.MetaTh>
            <S.MetaTdDate colSpan={3}>
              <DateTimePicker
                date={startDate}
                onDateChange={(date) => {
                  handleDateChange(date);
                  // 금지 일자를 선택하면 금지 주기 초기화
                  if (date) {
                    setRecurrenceType('');
                    setRecurrenceWeekday('');
                    setRecurrenceWeekOfMonth('');
                  }
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
                    const hasDuration = parseDurationHours(duration) > 0;
                    setErrors((prev) => ({
                      ...prev,
                      time: !(newValue && hasDuration),
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
                  step="1"
                  disabled={false}
                  value={duration}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setDuration(value);
                    if (touched.time) {
                      const hasDuration = parseDurationHours(value) > 0;
                      setErrors((prev) => ({
                        ...prev,
                        time: !(startTime && hasDuration),
                      }));
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
        {renderConfirmationDetail()}
        {isLoadingConflicts ? (
          <Detail.ConfirmMessage>충돌 확인 중...</Detail.ConfirmMessage>
        ) : (
          <>
            <ConflictingDeploymentsList deployments={conflictingDeployments} />
            <Detail.ConfirmMessage>
              본 작업 금지를 등록하시겠습니까?
            </Detail.ConfirmMessage>
          </>
        )}
      </ScheduleModal>
    </S.PageContainer>
  );
}
