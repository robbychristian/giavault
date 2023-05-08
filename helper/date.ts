import moment from "moment";
export const formatDate = (date: string) => {
  return moment(date).format("YYYY-MM-DD hh:mm a");
};

export const convertDateToIso = (dateStr: string) => {
  let localDate;
  const excelDate = excelDateToJSDate(dateStr);
  if (excelDate) {
    return moment(excelDate).format();
  }
  
  localDate = dateStr
    .replace(/([0-9]{2})(st|nd|rd|th)/g, "$1")
    .replace(/(\d{1,2})[ -](\d{1,2})[ -](\d{4})/, "$2/$1/$3")
    .replace(/([A-Za-z]{3,}) (\d{1,2}) (\d{4})/, "$1 $2, $3");
  const dateFormats = ["MM/DD/YY", "MM/DD/YYYY", "MMM DD, YY", "MMM DD, YYYY", "MM-DD-YY", "MM-DD-YYYY", "MMMM DD, YYYY", "YYYY-MM-DD"];

  for (const format of dateFormats) {
    const parsedDate = moment(localDate, format, true);
    if (parsedDate.isValid()) {
      return parsedDate.format();
    }
  }

  return null;
};

function excelDateToJSDate(date: any) {
  const parsedDate = new Date(Math.round((date - 25569) * 86400 * 1000));
  if (parsedDate.toString() !== "Invalid Date") return parsedDate;
  return null;
}
