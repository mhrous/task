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

export const getFirstOfThisMonth = (m) => {
  let d = new Date();
  m = parseInt(m)


  return new Date(d.getFullYear(), m, 1, 0, 0, 0, 0)
};
export const getFirstOfNextMonth = (m) => {
  let d = new Date();

  m = parseInt(m)

  return new Date(d.getFullYear(), m + 1, 1, 0, 0, 0, 0)

};