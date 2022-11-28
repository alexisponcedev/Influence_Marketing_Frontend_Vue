const moment = require("moment-jalaali");

export default function formatDate(
  date: string,
  format: string = "YYYY/MM/DD",
  inputFormat: string = "YYYY/MM/DD"
) {
  return moment(date, inputFormat).format(format);
}
