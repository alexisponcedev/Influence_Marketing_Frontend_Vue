function convertToCSV(objArray: any) {
  let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;

  let keys = Object.keys(array[0]);

  let str = "";
  for (let i = 0; i < array.length; i++) {
    let line = "";
    let first = true;
    keys.forEach((key) => {
      if (!first) line += ",";
      if (first) first = false;
      line += array[i][key] ? '"' + array[i][key] + '"' : "";
    });
    str += line + "\r\n";
  }
  return str;
}

export default function exportCSVFile(
  headers: any,
  items: any,
  fileTitle?: string
) {
  if (headers) items.unshift(headers);

  let jsonObject = JSON.stringify(items);
  let csv = convertToCSV(jsonObject);
  let exportedFilenmae = fileTitle ? fileTitle + ".csv" : "export.csv";
  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  if ((navigator as any).msSaveBlob)
    (navigator as any).msSaveBlob(blob, exportedFilenmae);
  else {
    let link = document.createElement("a");
    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
