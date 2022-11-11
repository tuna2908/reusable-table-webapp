export const setTimeOutAsync = (timeOut = 1000, cb?: () => any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof cb === "function") resolve(cb());
      else resolve(true);
    }, timeOut);
  });
};
