import { sortRows, TableColumnInterface, TableFilterInterface } from '@uniquedj95/vtable';
import { get } from 'lodash';
import { Service } from '@/services/service';
import dayjs from 'dayjs';

export function sanitize(str: string) {
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

interface ExportOptions {
  columns: TableColumnInterface[];
  rows: any[];
  filename: string;
  quarter?: string;
  period?: string;
  filters?: TableFilterInterface;
  encryption?: object;
  canHorizontalPageBreak?: boolean;
}

function getExportableHeadings(columns: Array<TableColumnInterface>): Array<string> {
  return columns.filter(c => c.exportable !== false).map(c => c.label);
}

function getExportableRows(columns: Array<TableColumnInterface>, rows: Array<any>): Array<Array<string>> {
  return rows.map(row => {
    return columns.filter(column => column.exportable !== false)
      .map(column => {
        let value = get(row, column.path);
        if (typeof column.formatter === 'function' && value) value = column.formatter(value, row)
        return sanitize(column.drillable && Array.isArray(value) ? value.length : value);
      })
  })
}

function toCsvString(opts: ExportOptions) {
  const {columns, rows, quarter, period, filters} = opts;
  const exportableColumns = getExportableHeadings(columns);
  const exportableRows = getExportableRows(columns, sortRows(rows, filters?.sort || []));
  let str = exportableColumns.join(",") + "\n"
  str += exportableRows.map(row => row.join(",")).join("\n");
  str += "\n" + `Date Created:  ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}`;
  if (quarter) str += "\n" + `Quarter: ${quarter}`;
  if (period) str += "\n" + `Quarter: ${period}`;
  str += "\n" + `e-Mastercard Version : ${Service.getAppVersion()}`;
  str += "\n" + `API Version ${Service.getApiVersion()}`;
  str += "\n" + `Site UUID: ${Service.getSiteUUID()}`;
  return str;
}

export function exportToCSV(opts: ExportOptions) {
  const csvData = new Blob([toCsvString(opts)], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(csvData);
  link.setAttribute("download", `${opts.filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
