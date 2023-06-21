export const getFormattedWeekdate = () => {
  const date = new Date().getDate();
  const suffix =
    date === 1 || date === 21 || date === 31
      ? "st"
      : date === 2 || date === 22
      ? "nd"
      : date === 3 || date === 23
      ? "rd"
      : "th";

  return `${date}${suffix}`;
};
