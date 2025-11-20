import { useState, useEffect } from 'react';

import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';
import Button from '@/components/auth/Button';
import CustomSelect from '@/components/auth/CustomSelect';
import Input from '@/components/auth/Input';
import Modal from '@/components/auth/Modal';
import Textarea from '@/components/common/Textarea';
import { useAuthStore } from '@/stores/authStore';

import * as S from './ProblemTypeModal.styles';

export function ProblemTypeModal({ isOpen, onClose, onSave }) {
  const { user } = useAuthStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);

  const [errors, setErrors] = useState({
    title: '',
    projectId: '',
  });

  const [touched, setTouched] = useState({
    title: false,
    projectId: false,
  });

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const loadProjects = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.PROJECTS);
        if (cancelled) return;

        const options =
          Array.isArray(res.data) && res.data.length > 0
            ? res.data.map((project) => ({
                value: String(project.id),
                label:
                  project.serviceName ||
                  project.service ||
                  project.name ||
                  `#${project.id}`,
              }))
            : [];

        setProjectOptions(options);
      } catch (error) {
        console.error('프로젝트 목록 조회 실패:', error);
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const validateField = (field, value) => {
    switch (field) {
      case 'title':
        return !value || value.trim() === ''
          ? '문제 유형 이름을 입력해주세요'
          : '';
      case 'projectId':
        return !value || value === '' ? '프로젝트를 선택해주세요' : '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field, value) => {
    if (field === 'title') {
      setTitle(value);
    } else if (field === 'description') {
      setDescription(value);
    } else if (field === 'projectId') {
      setProjectId(value);
    }

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field) => {
    let fieldValue = '';
    if (field === 'title') fieldValue = title;
    else if (field === 'description') fieldValue = description;
    else if (field === 'projectId') fieldValue = projectId;

    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, fieldValue),
    }));
  };

  const handleSave = () => {
    const newErrors = {
      title: validateField('title', title),
      projectId: validateField('projectId', projectId),
    };

    setErrors(newErrors);
    setTouched({
      title: true,
      projectId: true,
    });

    if (newErrors.title || newErrors.projectId) {
      return;
    }

    if (!user?.id) {
      alert('로그인 정보가 없습니다. 다시 로그인 후 시도해주세요.');
      return;
    }

    const categoryData = {
      title: title.trim(),
      description: description.trim() || '',
      projectId: Number.parseInt(projectId, 10),
      accountId: user.id,
    };

    onSave(categoryData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setProjectId('');
    setErrors({ title: '', projectId: '' });
    setTouched({ title: false, projectId: false });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="문제 유형 추가"
      maxWidth="500px"
    >
      <S.ModalContent>
        <S.FormGroup>
          <Input
            label="문제 유형 이름"
            type="text"
            value={title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            placeholder="예: 배포 순서 오류"
            error={touched.title ? errors.title : ''}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <label
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            프로젝트 <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <CustomSelect
            value={projectId}
            onChange={(value) => handleFieldChange('projectId', value)}
            onBlur={() => handleBlur('projectId')}
            options={projectOptions}
            placeholder="문제 유형이 속한 프로젝트를 선택하세요"
          />
          {touched.projectId && errors.projectId && (
            <p
              style={{
                color: '#ef4444',
                marginTop: 4,
                fontSize: 12,
              }}
            >
              {errors.projectId}
            </p>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <Textarea
            label="설명"
            value={description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="문제 유형에 대한 설명을 입력하세요"
            rows={4}
          />
        </S.FormGroup>

        <S.ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave}>
            생성
          </Button>
        </S.ModalFooter>
      </S.ModalContent>
    </Modal>
  );
}
