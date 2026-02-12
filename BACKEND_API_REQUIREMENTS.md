# 스케줄 관리 모듈 - 백엔드 API 요구사항

## 개요

프론트엔드는 스케줄 관리 시스템을 제공하며, 배포 작업(Deployment)과 작업 금지 기간(Restricted Period)을 관리합니다.
사용자는 월간/주간 캘린더 뷰와 목록 뷰로 일정을 확인하고, 작업 금지 기간을 생성할 수 있습니다.

---

## 필요한 API 엔드포인트

### 1. 배포 작업 목록 조회 API

**목적**: 월간/주간 캘린더와 상세 모달에 배포 작업을 표시하기 위해 필요

**요구사항**:

- 특정 날짜 범위의 배포 작업을 조회할 수 있어야 함
- 최소한 날짜(date) 기준으로 필터링 지원
- 배포 작업은 날짜와 시간 순으로 정렬되어야 함

**응답 데이터 구조**:

```json
[
  {
    "id": "string",
    "title": "string",
    "service": "string",
    "status": "대기" | "진행중" | "완료" | "실패",
    "deploymentStatus": "scheduled" | "success" | "failed",
    "stage": "string",
    "date": "YYYY-MM-DD",
    "scheduledTime": "HH:mm",
    "registrant": "string",
    "registrantDepartment": "string"
  }
]
```

---

### 2. 작업 금지 기간 목록 조회 API

**목적**: 캘린더 뷰 및 목록 뷰에서 작업 금지 기간을 표시하고 필터링하기 위해 필요

**요구사항**:

- 다음 필터 조건을 지원해야 함:
  - 유형(type): "전체" | "DB 마이그레이션" | "점검" | "외부 일정" | "재난 재해"
  - 연관 서비스(services): 서비스 이름 배열 (OR 조건, 하나라도 포함되면 포함)
  - 등록자(registrantName): 등록자명 부분 일치 검색
  - 날짜 범위: 시작일 또는 종료일이 지정된 범위와 겹치는 기간
  - 검색어: 제목(title), 설명(description), 등록자(registrantName)에 포함
- 날짜 범위 기준으로 필터링 시, 기간이 겹치는 경우 모두 포함
- 시작 날짜/시간 기준으로 정렬 (오름차순)
- 기본 응답에서는 취소된 작업 금지 기간을 제외

**응답 데이터 구조**:

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "startDate": "YYYY-MM-DD",
    "startTime": "HH:mm",
    "endedAt": "YYYY-MM-DDTHH:mm" | null,
    "duration": number,
    "type": "DB 마이그레이션" | "서버 점검" | "외부 일정" | "재난 재해",
    "services": ["string"],
    "registrant": "string",
    "registrantDepartment": "string",
    "recurrenceType": "NONE" | "DAILY" | "WEEKLY" | "MONTHLY",
    "recurrenceWeekday": "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN" | null,
    "recurrenceWeekOfMonth": "FIRST" | "SECOND" | "THIRD" | "FOURTH" | null,
    "recurrenceEndDate": "YYYY-MM-DD" | null
  }
]
```

**필터 파라미터 예시**:

- `type`: "all" | "DB 마이그레이션" | "서버 점검" | "외부 일정" | "재난 재해"
- `services`: string[] (서비스 이름 배열)
- `registrantName`: "string" (등록자명 부분 일치 검색)
- `startDate`: "YYYY-MM-DD" (시작일 필터)
- `endDate`: "YYYY-MM-DD" (종료일 필터)
- `searchQuery`: "string" (제목/설명/등록자 검색)

---

### 3. 작업 금지 기간 생성 API

**목적**: 사용자가 새로운 작업 금지 기간을 등록하기 위해 필요

**요구사항**:

- 필수 필드: 제목(title), 설명(description), 시작시간(startTime), 금지 시간(duration), 연관 서비스(services)
- `startDate`는 단일 일정 기준 추천 필드지만, 반복 주기를 기준으로 생성하는 경우 생략 가능
- 등록자 정보는 인증된 사용자 정보에서 자동으로 가져옴
- 등록부서는 사용자의 부서 정보에서 가져옴
- 선택 필드: 시작일(startDate), 종료 일시(endedAt), 반복 관련 필드(recurrenceType, recurrenceWeekday, recurrenceWeekOfMonth, recurrenceEndDate)
- 반복 금지 기간 설정 시
  - `recurrenceType`이 `DAILY`인 경우 추가 입력 없음
  - `recurrenceType`이 `WEEKLY`인 경우 `recurrenceWeekday` 필수
  - `recurrenceType`이 `MONTHLY`인 경우 `recurrenceWeekOfMonth`와 `recurrenceWeekday` 필수
  - 반복 종료가 없는 경우 `recurrenceEndDate`는 `null` 또는 미전송

**요청 데이터 구조**:

```json
[
  {
    "title": "string (required)",
    "description": "string (required)",
    "startDate": "YYYY-MM-DD (optional)",
    "startTime": "HH:mm (required)",
    "duration": 4,
    "endedAt": "YYYY-MM-DDTHH:mm (optional)",
    "type": "DB 마이그레이션" | "서버 점검" | "외부 일정" | "재난 재해",
    "services": ["string"],
    "recurrenceType": "NONE" | "DAILY" | "WEEKLY" | "MONTHLY",
    "recurrenceWeekday": "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN" | null,
    "recurrenceWeekOfMonth": "FIRST" | "SECOND" | "THIRD" | "FOURTH" | null,
    "recurrenceEndDate": "YYYY-MM-DD" | null
  }
]
```

**응답**:

- 성공 시 생성된 작업 금지 기간 정보 반환
- 실패 시 적절한 에러 메시지 반환

---

### 4. 스케줄 관리 메타데이터 조회 API

**목적**: 스케줄 관리 모듈에서 필요한 모든 메타데이터(서비스 목록, enum 값 등)를 한 번에 제공하여 프론트엔드에서 드롭다운/필터 옵션으로 사용

**요구사항**:

- 서비스 목록: 모든 배포 작업에서 사용되는 고유한 서비스 목록 반환 (서비스 이름 기준 정렬)
- Enum 값: 스케줄 관리 모듈에서 사용하는 모든 enum 값을 반환
- 메타데이터는 자주 변경되지 않으므로 서버 측 캐싱 고려 가능
- 프론트엔드는 페이지 로드 시 한 번만 호출하고 메모리에 캐싱

**응답 데이터 구조**:

```json
{
  "services": [
    {
      "value": "string",
      "label": "string"
    }
  ],
  "restrictedPeriodTypes": [
    {
      "value": "DB 마이그레이션",
      "label": "DB 마이그레이션"
    },
    {
      "value": "서버 점검",
      "label": "서버 점검"
    },
    {
      "value": "외부 일정",
      "label": "외부 일정"
    },
    {
      "value": "재난 재해",
      "label": "재난 재해"
    }
  ],
  "recurrenceTypes": [
    { "value": "NONE", "label": "없음" },
    { "value": "DAILY", "label": "매일" },
    { "value": "WEEKLY", "label": "매주" },
    { "value": "MONTHLY", "label": "매월" }
  ],
  "recurrenceWeekdays": [
    { "value": "MON", "label": "월요일" },
    { "value": "TUE", "label": "화요일" },
    { "value": "WED", "label": "수요일" },
    { "value": "THU", "label": "목요일" },
    { "value": "FRI", "label": "금요일" },
    { "value": "SAT", "label": "토요일" },
    { "value": "SUN", "label": "일요일" }
  ],
  "recurrenceWeeksOfMonth": [
    { "value": "FIRST", "label": "첫째 주" },
    { "value": "SECOND", "label": "둘째 주" },
    { "value": "THIRD", "label": "셋째 주" },
    { "value": "FOURTH", "label": "넷째 주" }
  ]
}
```

**참고사항**:

- `services`는 빈 배열이어도 괜찮음
- 향후 다른 enum 값(예: DeploymentStatus 등)이 필요하면 이 API에 추가 가능
- 각 enum 항목은 `value`(백엔드에서 사용할 실제 값)와 `label`(프론트엔드 표시용)을 포함
- `value`와 `label`이 동일한 경우가 많지만, 필요시 다르게 설정 가능

---

### 5. 공휴일(국가 휴일) 조회 API

**목적**: 월간/주간 캘린더에 한국 공휴일을 표시하기 위해 필요

**요구사항**:

- Google Calendar 등 외부 API 연동은 백엔드에서 처리하고, 프론트엔드에는 정제된 데이터를 전달
- 기본 파라미터: `year`(연도) 또는 `startDate`/`endDate` 범위 — 최소 한 가지는 필수
- 타임존은 `Asia/Seoul` 기준으로 변환하여 제공
- 반복 호출을 줄이기 위해 서버 측 캐싱 권장 (예: 24시간)

**응답 데이터 구조**:

```json
[
  {
    "date": "YYYY-MM-DD",
    "name": "string"
  }
]
```

**예시**:

```json
[
  { "date": "2025-03-01", "name": "삼일절" },
  { "date": "2025-05-05", "name": "어린이날" },
  { "date": "2025-09-08", "name": "추석" }
]
```

**참고사항**:

- 동일 날짜에 여러 명칭이 있는 경우 대표 명칭 하나만 선택
- 양력/음력 공휴일 계산은 백엔드에서 처리
- 프론트엔드는 반환된 데이터를 그대로 UI에 반영

---

## 데이터 타입 상세

### DeploymentStatus

- `"scheduled"`: 예정됨
- `"success"`: 성공
- `"failed"`: 실패

### RestrictedPeriodType

- `"DB 마이그레이션"`
- `"서버 점검"`
- `"외부 일정"`
- `"재난 재해"`

### RecurrenceType

- `"NONE"`: 반복 없음
- `"DAILY"`: 매일 반복
- `"WEEKLY"`: 매주 반복
- `"MONTHLY"`: 매월 반복

### RecurrenceWeekday

- `"MON"` | `"TUE"` | `"WED"` | `"THU"` | `"FRI"` | `"SAT"` | `"SUN"`

### RecurrenceWeekOfMonth

- `"FIRST"` | `"SECOND"` | `"THIRD"` | `"FOURTH"`

### 날짜/시간 형식

- 날짜: `YYYY-MM-DD` (예: "2025-10-20")
- 시간: `HH:mm` (예: "14:00", "09:30")

---

## 추가 요구사항

1. **인증**: 모든 API는 인증된 사용자만 접근 가능해야 함
2. **등록자 정보**: 작업 금지 기간 생성 시 현재 로그인한 사용자의 이름과 부서가 자동으로 저장되어야 함
3. **권한**: 작업 금지 기간 생성 권한이 필요 (프론트엔드에서는 현재 권한 체크 없음)
4. **페이징**: 작업 금지 기간 목록 조회 시 프론트엔드에서 페이지당 10개를 표시하므로, 필요시 페이징 지원 고려
5. **날짜 범위 처리**: 기간 필터링 시 시작일 또는 종료일 중 하나만 지정될 수 있으므로, 두 경우 모두 처리 가능해야 함
6. **Enum API 캐싱**: Enum 값 조회 API는 자주 변경되지 않으므로 서버 측 캐싱 고려 가능

---

## 프론트엔드 사용 시나리오

1. **월간 캘린더 뷰**: 특정 월의 배포 작업과 작업 금지 기간을 날짜별로 표시
2. **주간 캘린더 뷰**: 특정 주의 배포 작업과 작업 금지 기간을 날짜별로 표시
3. **작업 금지 목록 뷰**: 필터링된 작업 금지 기간을 테이블로 표시 (검색, 유형, 서비스, 기간 필터 지원)
4. **작업 금지 기간 생성**: 폼을 통해 새 작업 금지 기간 등록
5. **상세 정보 보기**: 배포 작업 또는 작업 금지 기간 클릭 시 상세 정보 모달 표시

---

## 참고사항

- 배포 작업(Deployment) 데이터는 다른 모듈에서 관리될 가능성이 높음 (배포 관리 모듈)
- 작업 금지 기간(Restricted Period)은 스케줄 관리 모듈에서 직접 관리
- 프론트엔드는 현재 mock 데이터를 사용 중이며, 실제 API 연동 시 위 구조에 맞춰 데이터를 전달해야 함

---

# 문제 관리 모듈 - 백엔드 API 요구사항

## 개요

프론트엔드는 문제 관리 시스템을 제공하며, 문제 카테고리(Problem Category)와 문제(Problem)를 관리합니다.
사용자는 문제 목록을 조회하고, 문제를 생성하며, 문제와 관련된 배포(Deployment)를 연결할 수 있습니다.

---

## 필요한 API 엔드포인트

### 1. 문제 카테고리 생성 API

**목적**: 사용자가 새로운 문제 카테고리를 등록하기 위해 필요

**요구사항**:

- 필수 필드: 제목(title), 설명(description)
- 등록자 정보는 인증된 사용자 정보에서 자동으로 가져옴
- 프로젝트 ID는 현재 프로젝트 컨텍스트에서 자동으로 가져옴

**요청 데이터 구조**:

```json
{
  "title": "string (required)",
  "description": "string (required)"
}
```

**응답 데이터 구조**:

```json
{
  "id": "number",
  "projectId": "number",
  "accountId": "number",
  "title": "string",
  "description": "string"
}
```

---

### 2. 문제 생성 API

**목적**: 사용자가 새로운 문제를 등록하기 위해 필요

**요구사항**:

- 필수 필드: 카테고리 ID(categoryId), 제목(title), 설명(description), 중요도(importance)
- 설명(description)에는 발생 상황과 예방법이 포함됨
- 등록자 정보는 인증된 사용자 정보에서 자동으로 가져옴
- 선택 필드: 관련 배포 ID 목록(deploymentIds)

**요청 데이터 구조**:

```json
{
  "categoryId": "number (required)",
  "title": "string (required)",
  "description": "string (required)",
  "importance": "LOW" | "MEDIUM" | "HIGH (required)",
  "deploymentIds": ["number"] (optional)
}
```

**응답 데이터 구조**:

```json
{
  "id": "number",
  "categoryId": "number",
  "accountId": "number",
  "title": "string",
  "description": "string",
  "importance": "LOW" | "MEDIUM" | "HIGH",
  "createdAt": "YYYY-MM-DDTHH:mm:ss"
}
```

---

### 3. 문제 목록 조회 API

**목적**: 문제 목록을 조회하고 필터링하기 위해 필요

**요구사항**:

- 다음 필터 조건을 지원해야 함:
  - 카테고리(categoryId): 카테고리 ID 필터
  - 중요도(importance): LOW, MEDIUM, HIGH
  - 연관 서비스(services): 서비스 이름 배열 (OR 조건, 하나라도 포함되면 포함)
  - 검색어(search): 제목(title), 설명(description)에 포함
- 각 문제 객체에는 카테고리 정보가 포함되어야 함
- 생성일 기준 내림차순 정렬

**응답 데이터 구조**:

```json
[
  {
    "id": "number",
    "category": {
      "id": "number",
      "title": "string",
      "description": "string"
    },
    "title": "string",
    "description": "string",
    "importance": "LOW" | "MEDIUM" | "HIGH",
    "accountId": "number",
    "createdAt": "YYYY-MM-DDTHH:mm:ss",
    "deployments": [
      {
        "id": "number",
        "title": "string"
      }
    ],
    "services": ["string"]
  }
]
```

**필터 파라미터 예시**:

- `categoryId`: "number" (카테고리 ID 필터)
- `importance`: "LOW" | "MEDIUM" | "HIGH" (중요도 필터)
- `services`: string[] (서비스 이름 배열)
- `search`: "string" (제목/설명 검색)

---

### 4. 배포 목록 조회 API

**목적**: 문제 생성 시 관련 배포를 선택하기 위해 필요

**요구사항**:

- 모든 배포 목록을 반환 (필터링 없음)
- 제목 기준 오름차순 정렬
- 각 배포 객체는 id와 title만 포함

**응답 데이터 구조**:

```json
[
  {
    "id": "number",
    "title": "string"
  }
]
```

**참고사항**:

- 이 API는 문제 관리 모듈에서 사용되지만, 배포 데이터는 배포 관리 모듈에서 관리됨
- 프론트엔드에서는 문제 생성 폼에서 드롭다운으로 사용

---

## 데이터 타입 상세

### Importance

- `"LOW"`: 낮음 (하)
- `"MEDIUM"`: 보통 (중)
- `"HIGH"`: 높음 (상)

---

## 추가 요구사항

1. **인증**: 모든 API는 인증된 사용자만 접근 가능해야 함
2. **등록자 정보**: 문제 및 문제 카테고리 생성 시 현재 로그인한 사용자의 ID가 자동으로 저장되어야 함
3. **프로젝트 컨텍스트**: 문제 카테고리 생성 시 현재 프로젝트 ID가 자동으로 저장되어야 함
4. **관계 관리**: 문제와 배포는 N:N 관계이며, `problem_deployment` 테이블을 통해 관리됨

---

## 프론트엔드 사용 시나리오

1. **문제 목록 조회**: 필터링된 문제 목록을 테이블로 표시 (검색, 카테고리, 중요도, 서비스 필터 지원)
2. **문제 생성**: 폼을 통해 새 문제 등록 (카테고리 선택, 배포 연결 포함)
3. **문제 카테고리 생성**: 모달을 통해 새 문제 카테고리 등록
4. **문제 상세 보기**: 문제 클릭 시 상세 정보 표시

---

## 참고사항

- 문제(Problem) 데이터는 문제 관리 모듈에서 직접 관리
- 배포(Deployment) 데이터는 배포 관리 모듈에서 관리되며, 문제와 연결 시에만 참조
- 프론트엔드는 현재 mock 데이터를 사용 중이며, 실제 API 연동 시 위 구조에 맞춰 데이터를 전달해야 함
