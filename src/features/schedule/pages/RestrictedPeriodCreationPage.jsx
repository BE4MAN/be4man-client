import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomSelect from '@/components/auth/CustomSelect';
import Modal from '@/components/auth/Modal';
import DateTimeRangePicker from '@/components/common/DateTimeRangePicker';
import ServiceTag from '@/components/common/ServiceTag';
import { useAuthStore } from '@/stores/authStore';
import { PrimaryBtn, SecondaryBtn } from '@/styles/modalButtons';

import { mockDeployments } from '../mockData';

import * as S from './RestrictedPeriodCreationPage.styles';

export default function RestrictedPeriodCreationPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    dateTime: false,
  });
  const [touched, setTouched] = useState({
    title: false,
    dateTime: false,
  });

  // 서비스 목록 추출
  const availableServices = [
    ...new Set(mockDeployments.map((deployment) => deployment.service)),
  ].sort();

  const handleSaveClick = () => {
    // 필수 필드 검증
    const titleError = !title.trim();
    const dateTimeError = !(startDate && endDate && startTime && endTime);

    setErrors({
      title: titleError,
      dateTime: dateTimeError,
    });

    setTouched({
      title: true,
      dateTime: true,
    });

    // 모든 필드가 유효한 경우에만 모달 열기
    if (!titleError && !dateTimeError) {
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
            <S.MetaTd>
              <S.Input value={user?.name || ''} readOnly />
            </S.MetaTd>
            <S.MetaTh>등록부서</S.MetaTh>
            <S.MetaTd>
              <S.Input value={user?.department || '없음'} readOnly />
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>제목 *</S.MetaTh>
            <S.MetaTd colSpan={3}>
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
              {touched.title && errors.title && (
                <div
                  style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}
                >
                  제목을 입력해주세요
                </div>
              )}
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>기간 *</S.MetaTh>
            <S.MetaTd>
              <DateTimeRangePicker
                startDate={startDate}
                endDate={endDate}
                startTime={startTime}
                endTime={endTime}
                onDateChange={(start, end) => {
                  handleDateRangeChange(start, end);
                  if (touched.dateTime) {
                    setErrors((prev) => ({
                      ...prev,
                      dateTime: !(start && end && startTime && endTime),
                    }));
                  }
                }}
                onTimeChange={(start, end) => {
                  handleTimeChange(start, end);
                  if (touched.dateTime) {
                    setErrors((prev) => ({
                      ...prev,
                      dateTime: !(startDate && endDate && start && end),
                    }));
                  }
                }}
                showLabel={false}
                error={touched.dateTime && errors.dateTime}
              />
              {touched.dateTime && errors.dateTime && (
                <div
                  style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}
                >
                  기간을 입력해주세요
                </div>
              )}
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>연관 서비스</S.MetaTh>
            <S.MetaTd colSpan={3}>
              <div style={{ marginBottom: '8px', width: '50%' }}>
                <CustomSelect
                  value={
                    Array.isArray(selectedServices) ? selectedServices : []
                  }
                  onChange={(value) => {
                    setSelectedServices(Array.isArray(value) ? value : []);
                  }}
                  options={availableServices.map((service) => ({
                    value: service,
                    label: service,
                  }))}
                  multiple
                  placeholder="전체"
                />
              </div>
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
            </S.MetaTd>
          </S.MetaRow>

          <S.MetaRow>
            <S.MetaTh>설명</S.MetaTh>
            <S.MetaTd colSpan={3} data-bb>
              <S.Textarea
                placeholder="금지 기간에 대한 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </S.MetaTd>
          </S.MetaRow>
        </S.MetaTable>
      </S.Panel>

      {/* 취소 확인 모달 */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="등록 취소"
        showCloseButton={false}
        closeOnOverlayClick={false}
        footer={
          <>
            <SecondaryBtn onClick={() => setCancelModalOpen(false)}>
              돌아가기
            </SecondaryBtn>
            <PrimaryBtn onClick={confirmCancel}>확인</PrimaryBtn>
          </>
        }
      >
        작성 중인 내용이 저장되지 않은 채 취소됩니다.
      </Modal>

      {/* 등록 확인 모달 */}
      <Modal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title="작업 금지 기간 등록"
        showCloseButton={false}
        closeOnOverlayClick={false}
        footer={
          <>
            <SecondaryBtn onClick={() => setRegisterModalOpen(false)}>
              돌아가기
            </SecondaryBtn>
            <PrimaryBtn onClick={confirmRegister}>확인</PrimaryBtn>
          </>
        }
      >
        본 작업 금지를 등록하시겠습니까?
      </Modal>
    </S.PageContainer>
  );
}
