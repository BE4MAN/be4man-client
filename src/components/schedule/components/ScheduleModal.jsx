import Modal from '@/components/auth/Modal';

export const ScheduleModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth,
  variant,
  showCloseButton = true,
  closeOnOverlayClick = true,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      maxWidth={maxWidth}
      variant={variant}
      showCloseButton={showCloseButton}
      closeOnOverlayClick={closeOnOverlayClick}
      zIndex={101}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default ScheduleModal;
