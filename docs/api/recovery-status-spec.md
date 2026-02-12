# 복구현황 상태 관리 API 스펙

## 개요

복구현황(Recovery Status)은 배포 작업 실패 후 복구 진행 상황을 나타내는 상태값입니다.

## 상태값 정의

### 상태 종류

복구현황은 다음 3가지 상태를 가집니다:

| 상태값 (Enum) | 상태명 (한글) | 설명                       |
| ------------- | ------------- | -------------------------- |
| `PENDING`     | 대기          | 복구 작업이 대기 중인 상태 |
| `IN_PROGRESS` | 진행중        | 복구 작업이 진행 중인 상태 |
| `COMPLETED`   | 완료          | 복구 작업이 완료된 상태    |

## API 엔드포인트

### 1. 복구현황 목록 조회

**GET** `/api/recovery`

#### Query Parameters

| 파라미터   | 타입    | 필수 | 설명                                              |
| ---------- | ------- | ---- | ------------------------------------------------- |
| `page`     | integer | 선택 | 페이지 번호 (기본값: 1)                           |
| `pageSize` | integer | 선택 | 페이지당 항목 수 (기본값: 5)                      |
| `status`   | enum    | 선택 | 상태 필터 (`PENDING`, `IN_PROGRESS`, `COMPLETED`) |

#### Response

```json
{
  "data": [
    {
      "id": 1,
      "title": "결제 서비스 DB 마이그레이션 작업",
      "service": "결제 서비스",
      "cause": "DB 마이그레이션 실패",
      "status": "COMPLETED",
      "duration": "42분",
      "failedAt": "2025-10-29T15:22:00",
      "recoveredAt": "2025-10-29T16:04:00",
      "registrant": "홍길동",
      "registrantDepartment": "DevOps팀"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "pageSize": 5,
    "totalPages": 3
  }
}
```

#### Response 필드 설명

| 필드                   | 타입     | 필수 | 설명                                                                |
| ---------------------- | -------- | ---- | ------------------------------------------------------------------- |
| `id`                   | integer  | 필수 | 복구현황 고유 ID                                                    |
| `title`                | string   | 필수 | 배포작업명                                                          |
| `service`              | string   | 필수 | 서비스명                                                            |
| `cause`                | string   | 필수 | 복구 사유                                                           |
| `status`               | enum     | 필수 | 상태값 (`PENDING`, `IN_PROGRESS`, `COMPLETED`)                      |
| `duration`             | string   | 선택 | 소요시간 (예: "42분") - `status`가 `COMPLETED`일 때만 제공          |
| `failedAt`             | datetime | 필수 | 실패 발생 시각 (ISO 8601 형식)                                      |
| `recoveredAt`          | datetime | 선택 | 복구 완료 시각 (ISO 8601 형식) - `status`가 `COMPLETED`일 때만 제공 |
| `registrant`           | string   | 선택 | 등록자 이름                                                         |
| `registrantDepartment` | string   | 선택 | 등록 부서명                                                         |

### 2. 복구현황 상세 조회

**GET** `/api/recovery/{id}`

#### Path Parameters

| 파라미터 | 타입    | 필수 | 설명        |
| -------- | ------- | ---- | ----------- |
| `id`     | integer | 필수 | 복구현황 ID |

#### Response

```json
{
  "id": 1,
  "title": "결제 서비스 DB 마이그레이션 작업",
  "service": "결제 서비스",
  "cause": "DB 마이그레이션 실패",
  "status": "COMPLETED",
  "duration": "42분",
  "failedAt": "2025-10-29T15:22:00",
  "recoveredAt": "2025-10-29T16:04:00",
  "registrant": "홍길동",
  "registrantDepartment": "DevOps팀",
  "description": "상세 설명 (선택)"
}
```

### 3. 복구현황 상태 업데이트

**PATCH** `/api/recovery/{id}/status`

#### Path Parameters

| 파라미터 | 타입    | 필수 | 설명        |
| -------- | ------- | ---- | ----------- |
| `id`     | integer | 필수 | 복구현황 ID |

#### Request Body

```json
{
  "status": "IN_PROGRESS",
  "description": "복구 작업 진행 중 (선택)"
}
```

#### Request Body 필드

| 필드          | 타입   | 필수 | 설명                                                  |
| ------------- | ------ | ---- | ----------------------------------------------------- |
| `status`      | enum   | 필수 | 변경할 상태값 (`PENDING`, `IN_PROGRESS`, `COMPLETED`) |
| `description` | string | 선택 | 상태 변경 시 메모                                     |

#### Response

```json
{
  "id": 1,
  "status": "IN_PROGRESS",
  "updatedAt": "2025-10-29T16:00:00"
}
```

## 상태 전이 규칙

복구현황 상태는 다음 순서로 전이됩니다:

```
PENDING → IN_PROGRESS → COMPLETED
```

- **대기 (`PENDING`)**: 복구 작업이 요청되었지만 아직 시작되지 않은 상태
- **진행중 (`IN_PROGRESS`)**: 복구 작업이 현재 진행 중인 상태
- **완료 (`COMPLETED`)**: 복구 작업이 완료된 상태 (최종 상태)

### 상태 전이 제약사항

- `COMPLETED` 상태는 최종 상태이므로 다른 상태로 변경할 수 없습니다.
- 상태는 이전 상태에서만 다음 상태로 전이할 수 있습니다 (역방향 불가).

## 프론트엔드 표시 규칙

### 상태 표시 색상

프론트엔드에서는 각 상태를 다음과 같이 표시합니다:

| 상태                   | 텍스트 색상 | 배경 색상 | 설명                       |
| ---------------------- | ----------- | --------- | -------------------------- |
| `PENDING` (대기)       | `#ef4444`   | `#fee2e2` | 빨간색 배경, 빨간색 텍스트 |
| `IN_PROGRESS` (진행중) | `#eab308`   | `#fef9c3` | 노란색 배경, 노란색 텍스트 |
| `COMPLETED` (완료)     | `#16a34a`   | `#dcfce7` | 초록색 배경, 초록색 텍스트 |

### 소요시간 (`duration`) 표시 규칙

- `status`가 `COMPLETED`인 경우에만 `duration` 값을 표시합니다.
- `status`가 `PENDING` 또는 `IN_PROGRESS`인 경우 `duration`은 `null`이거나 제공되지 않습니다.

### 복구 완료 시각 (`recoveredAt`) 표시 규칙

- `status`가 `COMPLETED`인 경우에만 `recoveredAt` 값을 표시합니다.
- `status`가 `PENDING` 또는 `IN_PROGRESS`인 경우 `recoveredAt`은 `null`이거나 제공되지 않습니다.

## 에러 응답

### 400 Bad Request

```json
{
  "error": "INVALID_STATUS",
  "message": "유효하지 않은 상태값입니다. 허용된 값: PENDING, IN_PROGRESS, COMPLETED"
}
```

### 404 Not Found

```json
{
  "error": "RECOVERY_NOT_FOUND",
  "message": "복구현황을 찾을 수 없습니다."
}
```

### 409 Conflict

```json
{
  "error": "INVALID_STATUS_TRANSITION",
  "message": "유효하지 않은 상태 전이입니다. 현재 상태에서 요청한 상태로 변경할 수 없습니다."
}
```

## 예시

### 복구현황 생성 및 상태 전이 예시

1. **초기 상태**: 복구 작업 요청 시 `PENDING` 상태로 생성

```json
{
  "id": 1,
  "title": "결제 서비스 DB 마이그레이션 작업",
  "service": "결제 서비스",
  "cause": "DB 마이그레이션 실패",
  "status": "PENDING",
  "failedAt": "2025-10-29T15:22:00"
}
```

2. **상태 변경**: 복구 작업 시작 시 `IN_PROGRESS`로 변경

```json
PATCH /api/recovery/1/status
{
  "status": "IN_PROGRESS"
}
```

3. **완료**: 복구 작업 완료 시 `COMPLETED`로 변경

```json
PATCH /api/recovery/1/status
{
  "status": "COMPLETED"
}
```

최종 응답:

```json
{
  "id": 1,
  "title": "결제 서비스 DB 마이그레이션 작업",
  "service": "결제 서비스",
  "cause": "DB 마이그레이션 실패",
  "status": "COMPLETED",
  "duration": "42분",
  "failedAt": "2025-10-29T15:22:00",
  "recoveredAt": "2025-10-29T16:04:00"
}
```




