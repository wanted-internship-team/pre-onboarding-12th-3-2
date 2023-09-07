export const BASE_URL = 'http://localhost:4000' as const;

export const API_PATH = Object.freeze({
  SICK: '/sick',
});

export const CACHE_RESET_TIME = 1000 * 60 * 2; // 2분으로 설정, 맨 뒤의 숫자만 바꾸면 됩니다.

export const DEBOUNCE_TIME = 1000; // 1초로 설정
