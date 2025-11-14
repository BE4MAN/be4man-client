import { format, addMonths } from 'date-fns';
import { RotateCcw, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
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
import { getForbiddenMessage, isForbiddenError } from '@/utils/errorHandler';

import { useScheduleMetadata } from '../hooks/useScheduleMetadata';
import {
  getNextMonthlyWeekday,
  getNextWeekday,
  getTodayDate,
} from '../utils/dateCalculator';
import {
  banTypeToEnum,
  enumToBanType,
  recurrenceTypeToEnum,
  weekdayToEnum,
  weekOfMonthToEnum,
} from '../utils/enumConverter';
import { formatTimeToKorean } from '../utils/timeFormatter';

import * as S from './RestrictedPeriodCreationPage.styles';

export default function RestrictedPeriodCreationPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [banType, setBanType] = useState(''); // 유형
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('00:00'); // 기본값: 00:00
  const [durationHours, setDurationHours] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
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
  const [showForbiddenModal, setShowForbiddenModal] = useState(false);
  const [forbiddenMessage, setForbiddenMessage] = useState('');
  const [errors, setErrors] = useState({
    title: false,
    banType: false,
    time: false,
    description: false,
    services: false,
    startDate: false,
  });
  const [touched, setTouched] = useState({
    title: false,
    banType: false,
    time: false,
    description: false,
    services: false,
    startDate: false,
  });

  // 메타데이터 조회
  const { data: metadata, isLoading: isLoadingMetadata } =
    useScheduleMetadata();

  // 서비스 목록 추출 (메타데이터의 projects 사용)
  const availableServices = metadata?.projects
    ? metadata.projects.map((project) => ({
        value: project.name,
        label: project.name,
      }))
    : [];

  // 프로젝트 이름 → ID 변환 함수
  const getProjectIdsFromNames = (serviceNames) => {
    if (!metadata?.projects || !Array.isArray(serviceNames)) return [];
    return serviceNames
      .map((name) => {
        const project = metadata.projects.find((p) => p.name === name);
        return project?.id;
      })
      .filter((id) => id !== undefined);
  };

  const parseDurationValue = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  };

  const getDurationInMinutes = () => {
    const hours = parseDurationValue(durationHours);
    const minutes = parseDurationValue(durationMinutes);
    return hours * 60 + minutes;
  };

  const getEndedAtLabel = () => {
    const totalMinutes = getDurationInMinutes();
    if (!startDate || !startTime || totalMinutes <= 0) return '—';
    const base = new Date(`${startDate}T${startTime}:00`);
    if (Number.isNaN(base.getTime())) return '—';
    const ended = new Date(base);
    ended.setMinutes(ended.getMinutes() + totalMinutes);
    const formatted = format(ended, 'yyyy-MM-dd HH:mm');
    return formatTimeToKorean(formatted);
  };

  // 주차 숫자 → 한글 변환 (getNextMonthlyWeekday에서 사용)
  const weekOfMonthLabelMap = {
    1: '첫째 주',
    2: '둘째 주',
    3: '셋째 주',
    4: '넷째 주',
    5: '다섯째 주',
  };

  // 주차 한글 → 숫자 변환 (getNextMonthlyWeekday에서 사용)
  const weekOfMonthToNumber = (weekLabel) => {
    const map = {
      '첫째 주': 1,
      '둘째 주': 2,
      '셋째 주': 3,
      '넷째 주': 4,
      '다섯째 주': 5,
    };
    return map[weekLabel] ?? 1;
  };

  // 한글 요일 문자열을 숫자로 변환 (0=일요일, 1=월요일, ..., 6=토요일)
  const weekdayToNumber = (weekday) => {
    const weekdayMap = {
      일요일: 0,
      월요일: 1,
      화요일: 2,
      수요일: 3,
      목요일: 4,
      금요일: 5,
      토요일: 6,
    };
    return weekdayMap[weekday] ?? null;
  };

  // allowedWeekdays 계산 (매주 또는 매월 반복일 때만)
  const getAllowedWeekdays = () => {
    if (
      (recurrenceType === '매주' || recurrenceType === '매월') &&
      recurrenceWeekday
    ) {
      return weekdayToNumber(recurrenceWeekday);
    }
    return null;
  };

  const getRecurrenceSummary = () => {
    if (!recurrenceType || recurrenceType === '') return '—';

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
    // 정기 이벤트 여부 확인
    const isRegularEvent = recurrenceType && recurrenceType !== '';

    // 필수 필드 검증
    const titleError = !title.trim();
    const banTypeError = !banType || banType === '';
    const hasDuration = getDurationInMinutes() > 0;
    const timeError = !(startTime && hasDuration);
    const descriptionError = !description.trim();
    const servicesError =
      !Array.isArray(selectedServices) || selectedServices.length === 0;
    // startDate는 비정기 이벤트일 때만 필수
    const startDateError = !isRegularEvent && !startDate;

    setErrors({
      title: titleError,
      banType: banTypeError,
      time: timeError,
      description: descriptionError,
      services: servicesError,
      startDate: startDateError,
    });

    setTouched({
      title: true,
      banType: true,
      time: true,
      description: true,
      services: true,
      startDate: true,
    });

    // 모든 필드가 유효한 경우에만 충돌 확인 후 모달 열기
    if (
      !titleError &&
      !banTypeError &&
      !timeError &&
      !descriptionError &&
      !servicesError &&
      !startDateError
    ) {
      // 충돌된 배포 작업 조회
      setIsLoadingConflicts(true);
      setConflictingDeployments([]);

      // 프로젝트 이름 → ID 변환
      const projectIds = getProjectIdsFromNames(selectedServices);
      if (projectIds.length === 0) {
        setIsLoadingConflicts(false);
        setRegisterModalOpen(true);
        return;
      }

      // queryEndDate 계산 (오늘 + 6개월)
      const today = new Date();
      const queryEndDate = format(addMonths(today, 6), 'yyyy-MM-dd');
      const queryStartDate = getTodayDate();

      const conflictParams = {
        projectIds,
        startDate,
        startTime,
        durationMinutes: getDurationInMinutes(),
        queryStartDate,
        queryEndDate,
      };

      // 반복 필드 추가
      if (recurrenceType) {
        conflictParams.recurrenceType = recurrenceTypeToEnum(recurrenceType);
        if (recurrenceWeekday) {
          conflictParams.recurrenceWeekday = weekdayToEnum(recurrenceWeekday);
        }
        if (recurrenceWeekOfMonth) {
          conflictParams.recurrenceWeekOfMonth = weekOfMonthToEnum(
            recurrenceWeekOfMonth,
          );
        }
        if (!isRecurrenceEndNone && recurrenceEndDate) {
          conflictParams.recurrenceEndDate = recurrenceEndDate;
        }
      }

      scheduleAPI
        .getConflictingDeployments(conflictParams)
        .then((response) => {
          setConflictingDeployments(response.conflictingDeployments || []);
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

  const confirmRegister = async () => {
    setRegisterModalOpen(false);

    // 프로젝트 이름 → ID 변환
    const projectIds = getProjectIdsFromNames(selectedServices);
    if (projectIds.length === 0) {
      // 에러 처리 (이미 validation에서 체크되지만 안전장치)
      return;
    }

    // API 요청 데이터 구성
    // banType이 이미 Enum 값이면 그대로 사용, 아니면 한글에서 Enum으로 변환
    let typeEnum = banType;

    // banType이 Enum 값이 아닌 경우 (한글 문자열인 경우) 변환 시도
    if (
      banType &&
      !banType.startsWith('DB_') &&
      banType !== 'MAINTENANCE' &&
      banType !== 'EXTERNAL_SCHEDULE' &&
      banType !== 'ACCIDENT'
    ) {
      typeEnum = banTypeToEnum(banType);
    }

    // typeEnum이 없거나 빈 문자열이면 에러
    if (!typeEnum || typeEnum === '') {
      console.error('Invalid banType:', banType, 'typeEnum:', typeEnum);
      alert('유형을 선택해주세요.');
      return;
    }

    const banData = {
      title,
      description,
      startDate,
      startTime,
      durationMinutes: getDurationInMinutes(),
      type: typeEnum,
      relatedProjectIds: projectIds,
      endedAt: null, // 백엔드에서 계산
    };

    // 반복 필드 추가
    if (recurrenceType) {
      banData.recurrenceType = recurrenceTypeToEnum(recurrenceType);
      if (recurrenceWeekday) {
        banData.recurrenceWeekday = weekdayToEnum(recurrenceWeekday);
      }
      if (recurrenceWeekOfMonth) {
        banData.recurrenceWeekOfMonth = weekOfMonthToEnum(
          recurrenceWeekOfMonth,
        );
      }
      if (!isRecurrenceEndNone && recurrenceEndDate) {
        banData.recurrenceEndDate = recurrenceEndDate;
      }
    }

    try {
      await scheduleAPI.createBan(banData);
      navigate('/schedule', { state: { viewMode: 'list' } });
    } catch (error) {
      // 403 Forbidden 에러 처리
      if (isForbiddenError(error)) {
        const message = getForbiddenMessage(error);
        setForbiddenMessage(message);
        setShowForbiddenModal(true);
      } else {
        // 기타 에러 처리
        console.error('Ban 생성 실패:', error);
      }
    }
  };

  const isTitleValid = title.trim().length > 0;
  const isBanTypeValid = banType && banType !== '';
  const isTimeValid = !!(startTime && getDurationInMinutes() > 0);
  const isDescriptionValid = description.trim().length > 0;
  const isServicesValid =
    Array.isArray(selectedServices) && selectedServices.length > 0;
  const isRegularEvent = recurrenceType && recurrenceType !== '';
  const isStartDateValid = isRegularEvent || !!startDate;
  const isFormValid =
    isTitleValid &&
    isBanTypeValid &&
    isTimeValid &&
    isDescriptionValid &&
    isServicesValid &&
    isStartDateValid;

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
    const hours = parseDurationValue(durationHours);
    const minutes = parseDurationValue(durationMinutes);
    const durationLabel =
      hours > 0 && minutes > 0
        ? `${hours}시간 ${minutes}분`
        : hours > 0
          ? `${hours}시간`
          : minutes > 0
            ? `${minutes}분`
            : '—';
    const startDateTimeLabel =
      startDate && startTime
        ? formatTimeToKorean(`${startDate} ${startTime}:00`)
        : '—';
    const endedAtLabel = getEndedAtLabel();
    const recurrenceSummary = getRecurrenceSummary();
    const registrantName = user?.name || '—';
    const registrantDepartment = user?.department
      ? DEPARTMENT_REVERSE_MAP[user.department] || user.department
      : '없음';
    const servicesToRender =
      Array.isArray(selectedServices) && selectedServices.length > 0
        ? selectedServices.map((service) => {
            // service가 문자열인지 확인, 객체인 경우 value 추출
            return typeof service === 'string'
              ? service
              : service?.value || service?.label || service;
          })
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
              <Detail.InfoTd>
                {banType ? enumToBanType(banType) || banType : '—'}
              </Detail.InfoTd>
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
              <Detail.InfoTh>지속시간</Detail.InfoTh>
              <Detail.InfoTd>{durationLabel}</Detail.InfoTd>
              <Detail.InfoTh>반복 주기</Detail.InfoTh>
              <Detail.InfoTd>{recurrenceSummary}</Detail.InfoTd>
            </Detail.InfoRow>
            <Detail.InfoRow>
              <Detail.InfoTh>종료일자</Detail.InfoTh>
              <Detail.InfoTd colSpan={3}>{endedAtLabel}</Detail.InfoTd>
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
                options={
                  metadata?.restrictedPeriodTypes?.map((type) => ({
                    value: type.value, // Enum 값 사용 (DB_MIGRATION, MAINTENANCE 등)
                    label: type.label, // 한글 라벨 사용
                  })) || []
                }
                disabled={isLoadingMetadata}
                placeholder="유형 선택"
                error={touched.banType && errors.banType ? '' : ''}
              />
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>반복 주기</S.MetaTh>
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
                          // 정기 이벤트: 자동으로 날짜 계산
                          if (nextType === '매일') {
                            setStartDate(getTodayDate());
                          } else {
                            // 매주, 매월은 나중에 요일/주 선택 시 계산
                            setStartDate('');
                          }
                        } else {
                          // 비정기 이벤트: 금지 일자 초기화
                          setStartDate('');
                          setRecurrenceWeekday('');
                          setRecurrenceWeekOfMonth('');
                        }
                      }}
                      options={
                        metadata?.recurrenceTypes
                          ? metadata.recurrenceTypes.map((type) => ({
                              value: type.label,
                              label: type.label,
                            }))
                          : [
                              { value: '매일', label: '매일' },
                              { value: '매주', label: '매주' },
                              { value: '매월', label: '매월' },
                            ]
                      }
                      disabled={isLoadingMetadata}
                      placeholder="없음"
                    />
                  </S.RecurrenceTypeSelect>

                  {recurrenceType === '매주' && (
                    <S.RecurrenceField>
                      <ScheduleCustomSelect
                        value={recurrenceWeekday}
                        onChange={(value) => {
                          const weekday = value || '';
                          setRecurrenceWeekday(weekday);
                          if (weekday) {
                            // 가장 가까운 요일 계산
                            const nextDate = getNextWeekday(weekday);
                            setStartDate(nextDate);
                          }
                        }}
                        options={
                          metadata?.recurrenceWeekdays?.map((weekday) => ({
                            value: weekday.label,
                            label: weekday.label,
                          })) || [
                            { value: '월요일', label: '월요일' },
                            { value: '화요일', label: '화요일' },
                            { value: '수요일', label: '수요일' },
                            { value: '목요일', label: '목요일' },
                            { value: '금요일', label: '금요일' },
                            { value: '토요일', label: '토요일' },
                            { value: '일요일', label: '일요일' },
                          ]
                        }
                        disabled={isLoadingMetadata}
                        placeholder="요일 선택"
                      />
                    </S.RecurrenceField>
                  )}

                  {recurrenceType === '매월' && (
                    <>
                      <S.RecurrenceField>
                        <ScheduleCustomSelect
                          value={recurrenceWeekOfMonth}
                          onChange={(value) => {
                            const weekOfMonth = value || '';
                            setRecurrenceWeekOfMonth(weekOfMonth);
                            if (weekOfMonth && recurrenceWeekday) {
                              // 가장 가까운 매월 N번째 주 N요일 계산
                              const weekNum = weekOfMonthToNumber(weekOfMonth);
                              const nextDate = getNextMonthlyWeekday(
                                weekNum,
                                recurrenceWeekday,
                              );
                              setStartDate(nextDate);
                            }
                          }}
                          options={
                            metadata?.recurrenceWeeksOfMonth?.map((week) => ({
                              value: week.label,
                              label: week.label,
                            })) || [
                              { value: '첫째 주', label: '첫째 주' },
                              { value: '둘째 주', label: '둘째 주' },
                              { value: '셋째 주', label: '셋째 주' },
                              { value: '넷째 주', label: '넷째 주' },
                              { value: '다섯째 주', label: '다섯째 주' },
                            ]
                          }
                          disabled={isLoadingMetadata}
                          placeholder="주 선택"
                        />
                      </S.RecurrenceField>
                      <S.RecurrenceField>
                        <ScheduleCustomSelect
                          value={recurrenceWeekday}
                          onChange={(value) => {
                            const weekday = value || '';
                            setRecurrenceWeekday(weekday);
                            if (weekday && recurrenceWeekOfMonth) {
                              // 가장 가까운 매월 N번째 주 N요일 계산
                              const weekNum = weekOfMonthToNumber(
                                recurrenceWeekOfMonth,
                              );
                              const nextDate = getNextMonthlyWeekday(
                                weekNum,
                                weekday,
                              );
                              setStartDate(nextDate);
                            }
                          }}
                          options={
                            metadata?.recurrenceWeekdays?.map((weekday) => ({
                              value: weekday.label,
                              label: weekday.label,
                            })) || [
                              { value: '월요일', label: '월요일' },
                              { value: '화요일', label: '화요일' },
                              { value: '수요일', label: '수요일' },
                              { value: '목요일', label: '목요일' },
                              { value: '금요일', label: '금요일' },
                              { value: '토요일', label: '토요일' },
                              { value: '일요일', label: '일요일' },
                            ]
                          }
                          disabled={isLoadingMetadata}
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
                          minDate={startDate || getTodayDate()}
                          allowedWeekdays={getAllowedWeekdays()}
                        />
                      </S.RecurrenceEndPicker>
                    </S.RecurrenceEndControls>
                  </S.RecurrenceEndSection>
                )}
              </S.RecurrenceContainerWrapper>
            </S.MetaTdRecurrence>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>
              금지 일자
              {!isRegularEvent && <RequiredAsterisk>*</RequiredAsterisk>}
            </S.MetaTh>
            <S.MetaTdDate colSpan={3}>
              <DateTimePicker
                date={startDate}
                onDateChange={(date) => {
                  handleDateChange(date);
                  if (touched.startDate) {
                    setErrors((prev) => ({
                      ...prev,
                      startDate: !isRegularEvent && !date,
                    }));
                  }
                  // 금지 일자를 선택하면 반복 주기 초기화
                  if (date) {
                    setRecurrenceType('');
                    setRecurrenceWeekday('');
                    setRecurrenceWeekOfMonth('');
                  }
                }}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, startDate: true }))
                }
                showLabel={false}
                error={touched.startDate && errors.startDate}
                disabled={!!recurrenceType && recurrenceType !== ''}
                minDate={getTodayDate()}
              />
              {touched.startDate && errors.startDate && (
                <div
                  style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}
                >
                  금지 일자를 선택해주세요
                </div>
              )}
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
                    const hasDuration = getDurationInMinutes() > 0;
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
              지속시간 <RequiredAsterisk>*</RequiredAsterisk>
            </S.MetaTh>
            <S.MetaTdRestrictedHours>
              <S.DurationInputContainer>
                <S.RestrictedHoursInputWrapper>
                  <S.RestrictedHoursInput
                    type="number"
                    min="0"
                    step="1"
                    disabled={false}
                    value={durationHours}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setDurationHours(value);
                      if (touched.time) {
                        const hasDuration = getDurationInMinutes() > 0;
                        setErrors((prev) => ({
                          ...prev,
                          time: !(startTime && hasDuration),
                        }));
                      }
                    }}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, time: true }))
                    }
                    $hasError={touched.time && errors.time}
                  />
                  <S.HoursUnit>시간</S.HoursUnit>
                </S.RestrictedHoursInputWrapper>
                <S.RestrictedHoursInputWrapper>
                  <S.RestrictedHoursInput
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    disabled={false}
                    value={durationMinutes}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      const numValue = Number.parseInt(value, 10);
                      const clampedValue =
                        Number.isFinite(numValue) && numValue > 59
                          ? '59'
                          : value;
                      setDurationMinutes(clampedValue);
                      if (touched.time) {
                        const hasDuration = getDurationInMinutes() > 0;
                        setErrors((prev) => ({
                          ...prev,
                          time: !(startTime && hasDuration),
                        }));
                      }
                    }}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, time: true }))
                    }
                    $hasError={touched.time && errors.time}
                  />
                  <S.MinutesUnit>분</S.MinutesUnit>
                </S.RestrictedHoursInputWrapper>
              </S.DurationInputContainer>
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
                      // value는 options의 value 배열 (문자열 배열)
                      const normalizedValue = Array.isArray(value)
                        ? value.map((v) => {
                            // 이미 문자열이면 그대로, 객체면 value 추출
                            return typeof v === 'string'
                              ? v
                              : v?.value || v?.label || String(v);
                          })
                        : [];
                      setSelectedServices(normalizedValue);
                      if (touched.services) {
                        setErrors((prev) => ({
                          ...prev,
                          services: normalizedValue.length === 0,
                        }));
                      }
                    }}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, services: true }))
                    }
                    options={availableServices}
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
                    {selectedServices.map((service) => {
                      // service가 문자열인지 확인, 객체인 경우 value 추출
                      const serviceName =
                        typeof service === 'string'
                          ? service
                          : service?.value || service?.label || service;
                      return (
                        <ServiceTag
                          key={serviceName}
                          service={serviceName}
                          onRemove={() =>
                            setSelectedServices((prev) => {
                              const prevArray = Array.isArray(prev) ? prev : [];
                              return prevArray.filter((s) => {
                                const sName =
                                  typeof s === 'string'
                                    ? s
                                    : s?.value || s?.label || s;
                                return sName !== serviceName;
                              });
                            })
                          }
                        />
                      );
                    })}
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

      {/* 403 권한 없음 모달 */}
      <ScheduleModal
        isOpen={showForbiddenModal}
        onClose={() => setShowForbiddenModal(false)}
        title="관리자 권한이 필요합니다."
        titleIcon={<TriangleAlert size={20} color="#EF4444" />}
        maxWidth="400px"
        footer={
          <Detail.Footer>
            <PrimaryBtn onClick={() => setShowForbiddenModal(false)}>
              확인
            </PrimaryBtn>
          </Detail.Footer>
        }
      >
        <Detail.ConfirmMessage>{forbiddenMessage}</Detail.ConfirmMessage>
      </ScheduleModal>
    </S.PageContainer>
  );
}
