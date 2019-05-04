export const getStartDate = () => {
  const date = new Date();
  if (date.getHours() < 6) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(6, 0, 0, 0);
  return date;
};
export const getEndDate = () => {
  const date = new Date();

  if (date.getHours() < 6) {
    return date.setHours(6, 0, 0, 0);
  }
  date.setDate(date.getDate() + 1);

  date.setHours(6, 0, 0, 0);
  return date;
};

export const getFirstOfThisMonth = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m, 1);
};
export const getFirstOfNextMonth = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m + 1, 1);
};
