// Position 매핑 (한글 → 영문)
export const POSITION_MAP = {
  사원: 'STAFF',
  대리: 'ASSISTANT_MANAGER',
  과장: 'SENIOR_MANAGER',
  차장: 'DEPUTY_GENERAL_MANAGER',
  부장: 'GENERAL_MANAGER',
  임원: 'EXECUTIVE',
};

// Position 역매핑 (영문 → 한글)
export const POSITION_REVERSE_MAP = {
  STAFF: '사원',
  ASSISTANT_MANAGER: '대리',
  SENIOR_MANAGER: '과장',
  DEPUTY_GENERAL_MANAGER: '차장',
  GENERAL_MANAGER: '부장',
  EXECUTIVE: '임원',
};

// Position 옵션 (Select 컴포넌트용)
export const POSITION_OPTIONS = [
  { value: '사원', label: '사원' },
  { value: '대리', label: '대리' },
  { value: '과장', label: '과장' },
  { value: '차장', label: '차장' },
  { value: '부장', label: '부장' },
  { value: '임원', label: '임원' },
];

// Department 매핑 (한글 → 영문)
export const DEPARTMENT_MAP = {
  기획: 'PLANNING',
  법무: 'LEGAL',
  영업: 'SALES',
  인사: 'HR',
  재무: 'FINANCE',
  IT: 'IT',
};

// Department 역매핑 (영문 → 한글)
export const DEPARTMENT_REVERSE_MAP = {
  PLANNING: '기획',
  LEGAL: '법무',
  SALES: '영업',
  HR: '인사',
  FINANCE: '재무',
  IT: 'IT',
};

// Department 옵션 (Select 컴포넌트용)
export const DEPARTMENT_OPTIONS = [
  { value: '기획', label: '기획' },
  { value: '법무', label: '법무' },
  { value: '영업', label: '영업' },
  { value: '인사', label: '인사' },
  { value: '재무', label: '재무' },
  { value: 'IT', label: 'IT' },
];
