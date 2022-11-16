import { TableColumnInterface } from '@uniquedj95/vtable';
import { get, isEmpty } from 'lodash';
import { Service } from '@/services/service';

function sanitize(str: string) {
  try {
    return str.replace(/<(?:.|\n)*?>/gm, " ")
      .replace(/\n/g, " ")
      .replace(/\t/g, " ")
      .replace(/\s{2,}/g, " ")
      .replace(/=/g, " ")
      .replace(/,/g, " ")
      .trim();
  } catch (error) {
    return str;
  }
}

interface CsvOptions {
  columns: TableColumnInterface[];
  rows: any[];
  filename: string;
  quarter?: {
    startDate: string;
    endDate: string;
  };
}

function convertToCsv({columns, rows, quarter}: CsvOptions) {
  let str = columns.filter((column) => column.exportable !== false)
    .map((column) => column.label)
    .join(",");

  str += "\n";
  str += rows.map((row) => columns
    .filter(column => column.exportable !== false)
    .map(column => {
      let value = get(row, column.path);
      if (typeof column.formatter === 'function' && value) value = column.formatter(value)
      return sanitize(column.drillable && Array.isArray(value) ? value.length : value);
    })
    .join(",")
  ).join("\n");

  str += "\n" + `Date Created:  ${new Date()}`;
  if (!isEmpty(quarter)) str += "\n" + `Quarter: ${quarter?.startDate} to ${quarter?.endDate}`;
  str += "\n" + `e-Mastercard Version : ${Service.getAppVersion()}`;
  str += "\n" + `API Version ${Service.getApiVersion()}`;
  str += "\n" + `Site UUID: ${Service.getSiteUUID()}`;

  return str;
}

export function exportToCSV(opts: CsvOptions) {
  const csvData = new Blob([convertToCsv(opts)], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(csvData);
  link.setAttribute("download", `${opts.filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
