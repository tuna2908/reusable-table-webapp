export const shallowObjSelector = (data) => JSON.parse(JSON.stringify(data));

export const totalSelector = (total) => {
  if (total < 0) return 0;
  return total;
};
