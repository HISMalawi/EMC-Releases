import { download } from '@/utils/files';
import { randomUUID } from '@/utils/UUID';
import { WebPlugin } from '@capacitor/core';
import dayjs from 'dayjs';
import type { PrinterDevice, LabelPrinterPlugin, WriteOptions } from './definitions';

const TEST_LABEL_TEXT = `\nN\nq801\nQ329,026\nZT\nB50,180,0,1,5,15,120,N,"Barcode"\nA35,30,0,2,2,2,N,""\nA35,76,0,2,2,2,N,"Test Label Printing"\nA35,122,0,2,2,2,N,"Date: ${dayjs().format('DD/MMM/YYYY')}"\nP1\n`

export class LabelPrinterWeb extends WebPlugin implements LabelPrinterPlugin {
  async write(opts: WriteOptions): Promise<void> {
    try {
      download(opts.rawString, `${randomUUID()}.lbl`)
    } catch (e) {
      throw new Error (`Label printing failed on ${opts.deviceID}`)
    }
  }
  async test(printer: PrinterDevice): Promise<void> {
    try {
      download(TEST_LABEL_TEXT, 'test_label.lbl')
    } catch (e) {
      throw new Error(`Test label printed failed on ${printer.deviceID}`)
    }
  }
  async discover(): Promise<{devices: string[]}> {
    return {
      devices: ["webPrinter"]
    }
  }
}
