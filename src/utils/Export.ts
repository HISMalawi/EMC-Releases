import jsPDF from "jspdf"
import autoTable from 'jspdf-autotable'
import { Filesystem, Directory } from "@capacitor/filesystem"
import platform from "@/composables/usePlatform"
import { toastDanger, toastSuccess, toastWarning } from "./Alerts"
import writeBlob from "capacitor-blob-writer"; 
import { PDFGenerator } from '@ionic-native/pdf-generator'

function convertToCsv(list: Array<any>) {
  return list.reduce((accum: string, row: Array<any>) => {
    return accum + row.map(d => `"${d}"`).join(',') + '\n'
  }, '')
}

function exportMobile(file: string, data: any, type: 'blob' | 'text') {
  let promiseObj: any = null
  const path = `HIS-Core/${file.replaceAll('/', '_')}`
  toastSuccess(`Exporting file to "Documents/${path}"...`)
  if (type === 'blob') {
    promiseObj = writeBlob({
      path,
      blob: data,
      directory: Directory.Documents,
      recursive: true
    })
  } else {
    promiseObj = Filesystem.writeFile({
      path,
      data,
      directory: Directory.Documents,
      recursive: true
    })
  }
  if (promiseObj != null) { 
    promiseObj.then(() => toastSuccess(`File exported to "Documents/${path}"!`, 3000))
      .catch((e: any) => toastDanger(e))
  }
}

export function toPDFfromHTML(html: string) {
  const { platformType } = platform()
  if (platformType.value === 'mobile') {
    PDFGenerator.fromData(html, {
      documentSize: 'a4',
      type: 'share'
    }).catch((e) => toastDanger(e))
  } else if (platformType.value === 'desktop') {
    const printW = open('', '', 'width:1024px, height:768px')
    if (printW) {
      printW?.document.write(html)
      setTimeout(() => { printW.print(); printW.close() }, 3500)
    }
  } else {
    toastWarning('Platform not supported')
  }
}

export function toCsv(header: Array<any>, rows: Array<any>, fileName='document') {
  const csvContent = convertToCsv(header.concat(rows))
  const { platformType } = platform()
  const fileWithExt = `${fileName}.csv`

  if (platformType.value === 'desktop') {
    const csvData = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute('id', 'csv')
    link.href = window.URL.createObjectURL(csvData);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } else if (platformType.value === 'mobile') {
    exportMobile(fileWithExt, csvContent, 'text')
  } else {
    toastWarning('Platform not supported')
  }
}

export function toTablePDF(
  tableColumns: Array<any>, 
  tableRows: Array<any>, 
  fileName='document',
  canHorizontalPageBreak=false) {
    const doc = new jsPDF()
    const title = doc.splitTextToSize(fileName, 180)
    const tableMarginStartY = title.length <= 1 ? 20 : title.length * 10
    doc.text(title, 14, 10)
    // Important note: only rendering the last array of headers. was experiencing bugs 
    // rendering multiple headers... maybe this can be improved later
    const config: any = {
      startY: tableMarginStartY,
      head: [tableColumns[tableColumns.length-1]],
      body: tableRows
    }
    if (canHorizontalPageBreak) {
      config.tableWidth = 'wrap'
      config.horizontalPageBreak = true
      config.horizontalPageBreakRepeat = 0
    }
    autoTable(doc, config)
    const { platformType } = platform()
    const path = `${fileName}.pdf`
    if (platformType.value === 'desktop') { 
      doc.save(path)
    } else if (platformType.value === 'mobile') {
      exportMobile(path, doc.output(), 'blob')
    } else {
      toastDanger('Platform not supported') 
    }
}
