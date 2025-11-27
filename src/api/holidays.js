// 작성자 : 이원석
import axios from 'axios';

/**
 * 공공데이터 포털 한국천문연구원_특일 정보 API
 * XML 응답을 파싱하여 공휴일 데이터를 반환합니다.
 */

const API_KEY = import.meta.env.VITE_HOLIDAYS_API_KEY;
const API_URL =
  import.meta.env.VITE_HOLIDAYS_API_URL ||
  'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';

const CACHE_PREFIX = 'holidays_';
const CACHE_EXPIRES_PREFIX = 'holidays_expires_';
const CACHE_DURATION = 365 * 24 * 60 * 60 * 1000; // 1년 (밀리초)

/**
 * XML 응답을 파싱하여 공휴일 배열로 변환
 * @param {string} xmlString - XML 응답 문자열
 * @returns {Array<{date: string, name: string}>} 공휴일 배열
 */
const parseHolidaysXML = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  // 에러 체크
  const errorNode = xmlDoc.querySelector('error');
  if (errorNode) {
    const errorMsg = errorNode.textContent;
    throw new Error(`API Error: ${errorMsg}`);
  }

  const items = xmlDoc.querySelectorAll('item');
  const holidays = [];

  items.forEach((item) => {
    const locdate = item.querySelector('locdate')?.textContent;
    const dateName = item.querySelector('dateName')?.textContent;
    const isHoliday = item.querySelector('isHoliday')?.textContent;

    // 공공기관 휴일만 필터링 (isHoliday === 'Y')
    if (locdate && dateName && isHoliday === 'Y') {
      // locdate 형식: 20150301 -> YYYY-MM-DD 형식으로 변환
      const year = locdate.substring(0, 4);
      const month = locdate.substring(4, 6);
      const day = locdate.substring(6, 8);
      const formattedDate = `${year}-${month}-${day}`;

      holidays.push({
        date: formattedDate,
        name: dateName.trim(),
      });
    }
  });

  return holidays;
};

/**
 * 특정 연도의 특정 월 공휴일 데이터 조회
 * @param {number} year - 연도 (예: 2025)
 * @param {number} month - 월 (1-12)
 * @returns {Promise<Array<{date: string, name: string}>>} 공휴일 배열
 */
const fetchHolidaysForMonth = async (year, month) => {
  if (!API_KEY) {
    throw new Error('공공데이터 포털 API 키가 설정되지 않았습니다.');
  }

  const solYear = String(year);
  const solMonth = String(month).padStart(2, '0');

  const params = new URLSearchParams({
    serviceKey: API_KEY,
    solYear,
    solMonth,
  });

  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Accept: 'application/xml',
      },
      timeout: 10000, // 10초 타임아웃
    });

    return parseHolidaysXML(response.data);
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API 호출 실패: ${error.response.status} ${error.response.statusText}`,
      );
    }
    if (error.request) {
      throw new Error('API 서버에 연결할 수 없습니다.');
    }
    throw error;
  }
};

/**
 * 특정 연도의 전체 공휴일 데이터 조회 (1-12월 병렬 호출)
 * @param {number} year - 연도 (예: 2025)
 * @returns {Promise<Array<{date: string, name: string}>>} 공휴일 배열 (날짜순 정렬)
 */
export const fetchHolidaysForYear = async (year) => {
  // 1-12월 병렬 호출
  const monthPromises = Array.from({ length: 12 }, (_, i) =>
    fetchHolidaysForMonth(year, i + 1),
  );

  try {
    const monthResults = await Promise.all(monthPromises);
    // 모든 월 데이터를 하나의 배열로 합치기
    const allHolidays = monthResults.flat();

    // 중복 제거 (같은 날짜가 여러 번 나올 수 있음)
    const uniqueHolidays = Array.from(
      new Map(allHolidays.map((h) => [h.date, h])).values(),
    );

    // 날짜순 정렬
    uniqueHolidays.sort((a, b) => a.date.localeCompare(b.date));

    return uniqueHolidays;
  } catch (error) {
    throw new Error(`연도 ${year} 공휴일 데이터 조회 실패: ${error.message}`);
  }
};

/**
 * localStorage에서 특정 연도 공휴일 데이터 조회
 * @param {number} year - 연도
 * @returns {Array<{date: string, name: string}>|null} 캐시된 데이터 또는 null
 */
const getCachedHolidays = (year) => {
  try {
    const cacheKey = `${CACHE_PREFIX}${year}`;
    const expiresKey = `${CACHE_EXPIRES_PREFIX}${year}`;

    const cachedData = localStorage.getItem(cacheKey);
    const expiresAt = localStorage.getItem(expiresKey);

    if (!cachedData || !expiresAt) {
      return null;
    }

    // 만료 시간 확인
    const now = Date.now();
    if (now > Number(expiresAt)) {
      // 만료된 캐시 삭제
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(expiresKey);
      return null;
    }

    return JSON.parse(cachedData);
  } catch {
    return null;
  }
};

/**
 * localStorage에 특정 연도 공휴일 데이터 저장
 * @param {number} year - 연도
 * @param {Array<{date: string, name: string}>} holidays - 공휴일 배열
 */
const setCachedHolidays = (year, holidays) => {
  try {
    const cacheKey = `${CACHE_PREFIX}${year}`;
    const expiresKey = `${CACHE_EXPIRES_PREFIX}${year}`;

    const expiresAt = Date.now() + CACHE_DURATION;

    localStorage.setItem(cacheKey, JSON.stringify(holidays));
    localStorage.setItem(expiresKey, String(expiresAt));
  } catch {
    // 캐시 저장 실패 시 무시
  }
};

/**
 * 특정 연도의 공휴일 데이터 조회 (캐시 우선)
 * @param {number} year - 연도
 * @returns {Promise<Array<{date: string, name: string}>>} 공휴일 배열
 */
export const getHolidays = async (year) => {
  // 1. 캐시 확인
  const cached = getCachedHolidays(year);
  if (cached) {
    return cached;
  }

  // 2. API 호출
  const holidays = await fetchHolidaysForYear(year);

  // 3. 캐시 저장
  setCachedHolidays(year, holidays);

  return holidays;
};
