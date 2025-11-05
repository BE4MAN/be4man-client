import axiosInstance from './axios';

/**
 * 작업 관리 목록 조회
 * @param {Object} params - 조회 파라미터
 * @param {number} params.page - 페이지 번호 (default: 0)
 * @param {number} params.size - 페이지 크기 (default: 8)
 * @param {string} params.searchQuery - 검색어
 * @param {string} params.stage - 작업 단계 (전체|계획서|배포|결과보고)
 * @param {string} params.status - 작업 상태 (전체|승인대기|진행중|취소|종료|반려|완료)
 * @param {string} params.result - 결과 (전체|성공|실패)
 * @param {string} params.sortBy - 정렬 (최신순|오래된순)
 * @returns {Promise} API 응답
 */
export const getTasks = async (params = {}) => {
  try {
    const {
      page = 0,
      size = 8,
      searchQuery = '',
      stage = '전체',
      status = '전체',
      result = '전체',
      sortBy = '최신순',
    } = params;

    // 쿼리 파라미터 구성
    const queryParams = new URLSearchParams();
    queryParams.append('page', page);
    queryParams.append('size', size);

    if (searchQuery) {
      queryParams.append('searchQuery', searchQuery);
    }

    if (stage && stage !== '전체') {
      queryParams.append('stage', stage);
    }

    if (status && status !== '전체') {
      queryParams.append('status', status);
    }

    if (result && result !== '전체') {
      queryParams.append('result', result);
    }

    if (sortBy) {
      queryParams.append('sortBy', sortBy);
    }

    const response = await axiosInstance.get(
      `/api/tasks?${queryParams.toString()}`,
    );
    return response.data;
  } catch (error) {
    console.error('작업 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 작업 상세 조회
 * @param {number} id - 작업 ID
 * @returns {Promise} API 응답
 */
export const getTaskById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('작업 상세 조회 실패:', error);
    throw error;
  }
};
