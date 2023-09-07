interface IsetDataProps<T> {
  getAPICallback: () => Promise<T>;
  dispatchCallback: React.Dispatch<React.SetStateAction<T>>;
}

/**
 * @param getAPICallback - GET API 요청 callback
 * @param dispatchCallback - API 응답 값에 따라 업데이트 되는 setState callback
 */

export const setData = async <T>({ getAPICallback, dispatchCallback }: IsetDataProps<T>) => {
  try {
    const response = await getAPICallback();
    dispatchCallback(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
