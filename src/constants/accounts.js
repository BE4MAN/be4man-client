// Position 매핑 (한글 → 영문)
export const POSITION_MAP = {
  본부장: 'GENERAL_MANAGER',
  차장: 'DEPUTY_GENERAL_MANAGER',
  과장: 'SENIOR_MANAGER',
  대리: 'ASSISTANT_MANAGER',
  사원: 'STAFF',
};

// Position 역매핑 (영문 → 한글)
export const POSITION_REVERSE_MAP = {
  GENERAL_MANAGER: '본부장',
  DEPUTY_GENERAL_MANAGER: '차장',
  SENIOR_MANAGER: '과장',
  ASSISTANT_MANAGER: '대리',
  STAFF: '사원',
};

// Position 옵션 (Select 컴포넌트용)
export const POSITION_OPTIONS = [
  { value: '본부장', label: '본부장' },
  { value: '차장', label: '차장' },
  { value: '과장', label: '과장' },
  { value: '대리', label: '대리' },
  { value: '사원', label: '사원' },
];
