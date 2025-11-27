// 작성자 : 이원석
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import * as S from './Modal.styles';

export const Modal = ({
  isOpen,
  onClose,
  title,
  titleIcon,
  children,
  footer,
  maxWidth,
  showCloseButton = true,
  closeOnOverlayClick = true,
  zIndex,
  ...props
}) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <S.ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.08 }}
        onClick={closeOnOverlayClick ? onClose : undefined}
        $zIndex={zIndex}
        {...props}
      >
        <S.ModalContent
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
          maxWidth={maxWidth}
          variant={props.variant}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <S.ModalHeader>
              {title && (
                <S.ModalTitle>
                  {titleIcon && (
                    <S.TitleIconWrapper>{titleIcon}</S.TitleIconWrapper>
                  )}
                  {title}
                </S.ModalTitle>
              )}
              {showCloseButton && (
                <S.CloseButton onClick={onClose} aria-label="Close modal" />
              )}
            </S.ModalHeader>
          )}

          <S.ModalBody variant={props.variant}>{children}</S.ModalBody>

          {footer && <S.ModalFooter>{footer}</S.ModalFooter>}
        </S.ModalContent>
      </S.ModalOverlay>
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
