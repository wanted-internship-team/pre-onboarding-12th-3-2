export const debounce = <T extends any[]>(callback: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};
