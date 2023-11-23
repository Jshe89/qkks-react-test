export const convertTimeToHours = time => {
  const [numericValue, unit] = time.match(/\d+|\D+/g);

  if (unit.trim() === 'minutes') {
    return `${(numericValue / 60).toFixed(1)} hours`;
  }
  return time;
};
