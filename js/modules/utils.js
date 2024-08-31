export const debounce = (func, waitTime) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, waitTime);
  };
};
