import { X } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/auth/Button';
import Input from '@/components/auth/Input';
import Modal from '@/components/auth/Modal';
import Textarea from '@/components/common/Textarea';

import * as S from './ProblemTypeModal.styles';

export function ProblemTypeModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    title: '',
  });
  const [touched, setTouched] = useState({
    title: false,
  });

  const validateField = (field, value) => {
    switch (field) {
      case 'title':
        return !value || value.trim() === ''
          ? '문제 유형 이름을 입력해주세요'
          : '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field, value) => {
    if (field === 'title') {
      setTitle(value);
    } else if (field === 'description') {
      setDescription(value);
    }

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, field === 'title' ? title : description),
    }));
  };

  const handleSave = () => {
    const newErrors = {
      title: validateField('title', title),
    };
    setErrors(newErrors);
    setTouched({
      title: true,
    });

    if (newErrors.title) {
      return;
    }

    // TODO: 실제 API 연동 시 problemAPI.createProblemCategory() 사용
    const categoryData = {
      title: title.trim(),
      description: description.trim() || '',
    };

    onSave(categoryData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setErrors({ title: '' });
    setTouched({ title: false });
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
