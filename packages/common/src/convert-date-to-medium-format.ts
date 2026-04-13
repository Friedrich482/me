export const convertDateToMediumFormat = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);

  return formattedDate;
};
