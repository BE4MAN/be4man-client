import axiosInstance from './axios';

/**
 * 문제 관리 관련 API 함수 모음
 */
export const problemAPI = {
  /**
   * 문제 카테고리 생성
   * @param {Object} categoryData - 문제 카테고리 데이터
   * @param {number} categoryData.projectId - 프로젝트 ID (필수)
   * @param {string} categoryData.title - 제목 (필수)
   * @param {string} categoryData.description - 설명 (필수)
   * @returns {Promise<{
   *   id: number,
   *   projectId: number,
   *   accountId: number,
   *   title: string,
   *   description: string
   * }>}
   */
  createProblemCategory: async (categoryData) => {
    const { data } = await axiosInstance.post(
      '/api/problems/categories',
      categoryData,
    );
    return data;
  },

  /**
   * 문제 생성
   * @param {Object} problemData - 문제 데이터
   * @param {number} problemData.categoryId - 카테고리 ID (필수)
   * @param {string} problemData.title - 제목 (필수)
   * @param {string} problemData.description - 설명 (발생 상황 및 예방법 포함, 필수)
   * @param {string} problemData.importance - 중요도 (LOW, MEDIUM, HIGH, 필수)
   * @param {number[]} [problemData.deploymentIds] - 관련 배포 ID 목록 (선택)
   * @returns {Promise<{
   *   id: number,
   *   categoryId: number,
   *   accountId: number,
   *   title: string,
   *   description: string,
   *   importance: string
   * }>}
   */
  createProblem: async (problemData) => {
    const { data } = await axiosInstance.post('/api/problems', problemData);
    return data;
  },

  /**
   * 문제 목록 조회
   * @param {Object} [filters] - 필터 조건 (모두 선택사항)
   * @param {string} [filters.search] - 검색어 (제목 또는 설명에 포함)
   * @param {number} [filters.categoryId] - 카테고리 ID 필터
   * @param {string} [filters.importance] - 중요도 필터 (LOW, MEDIUM, HIGH)
   * @returns {Promise<Array<{
   *   id: number,
   *   category: {
   *     id: number,
   *     title: string,
   *     description: string
   *   },
   *   title: string,
   *   description: string,
   *   importance: string,
   *   accountId: number,
   *   createdAt: string
   * }>>}
   */
  getProblems: async (filters = {}) => {
    const params = {};

    if (filters.search) {
      params.search = filters.search;
    }

    if (filters.categoryId) {
      params.categoryId = filters.categoryId;
    }

    if (filters.importance) {
      params.importance = filters.importance;
    }

    const { data } = await axiosInstance.get('/api/problems', {
      params,
    });
    return data;
  },

  /**
   * 배포 목록 조회 (문제와 연결할 배포 목록)
   * @returns {Promise<Array<{
   *   id: number,
   *   title: string
   * }>>}
   */
  getDeployments: async () => {
    const { data } = await axiosInstance.get('/api/deployments');
    return data;
  },

  /**
   * 문제 수정
   * @param {number} problemId - 문제 ID
   * @param {Object} problemData - 수정할 문제 데이터
   * @param {number} [problemData.categoryId] - 카테고리 ID
   * @param {string} [problemData.title] - 제목
   * @param {string} [problemData.description] - 설명
   * @param {string} [problemData.importance] - 중요도 (LOW, MEDIUM, HIGH)
   * @param {number[]} [problemData.deploymentIds] - 관련 배포 ID 목록
   * @returns {Promise<{
   *   id: number,
   *   categoryId: number,
   *   accountId: number,
   *   title: string,
   *   description: string,
   *   importance: string
   * }>}
   */
  updateProblem: async (problemId, problemData) => {
    const { data } = await axiosInstance.put(
      `/api/problems/${problemId}`,
      problemData,
    );
    return data;
  },

  /**
   * 문제 삭제
   * @param {number} problemId - 문제 ID
   * @returns {Promise<void>}
   */
  deleteProblem: async (problemId) => {
    await axiosInstance.delete(`/api/problems/${problemId}`);
  },
};
