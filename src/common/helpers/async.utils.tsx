
export const setTimeOutAsync = (timeOut = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timeOut);
  });
};

