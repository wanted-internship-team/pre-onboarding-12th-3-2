import { isEmptyArray } from './isEmptyArray';

interface IsetDataProps<T> {
  getCacheCallback: () => Promise<T>;
  setCacheCallback: (data: T) => Promise<void>;
  getAPICallback: () => Promise<T>;
  dispatchCallback: React.Dispatch<React.SetStateAction<T>>;
}

/**
 * 캐시에 특정 값의 유무에 따라 값이 있다면 캐시에서 가져온 값을 저장하고, 없다면 API 요청 후, 응답 값을 저장하는 함수
 * @param getCacheCallback - 캐시 값을 가져오는 callback
 * @param setCacheCallback - 캐시 값을 설정하는 callback
 * @param getAPICallback - GET API 요청 callback
 * @param dispatchCallback - API 응답 값에 따라 업데이트 되는 setState callback
 */

export const setData = async <T>({
  getCacheCallback,
  setCacheCallback,
  getAPICallback,
  dispatchCallback,
}: IsetDataProps<T>) => {
  const cacheResponse: T = await getCacheCallback();
  if (!isEmptyArray(cacheResponse)) {
    dispatchCallback(cacheResponse);
  } else {
    try {
      const response = await getAPICallback();
      await setCacheCallback(response);
      dispatchCallback(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
