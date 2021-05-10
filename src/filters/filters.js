export const formatTime = (time) => {
  let date;
  if (typeof time === "number") {
    const milliseconds = time * 1000;
    date = new Date(milliseconds);
  }
  if (typeof time === "string") {
    date = new Date(time);
  }
  if (!date) return time;

  const locale = "en";
  const options = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString(locale, options);
};
