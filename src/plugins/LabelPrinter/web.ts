import { download } from '@/utils/files';
import { randomUUID } from '@/utils/UUID';
import { WebPlugin } from '@capacitor/core';
import type { LabelPrinterPlugin, WriteOptions } from './definitions';


export class LabelPrinterWeb extends WebPlugin implements LabelPrinterPlugin {
  async write(opts: WriteOptions): Promise<void> {
    try {
      download(opts.rawString, `${randomUUID()}.lbl`)
    } catch (e) {
      throw new Error (`Label printing failed on ${opts.deviceID}`)
    }
  }
  async discover(): Promise<{devices: string[]}> {
    return {
      devices: ["webPrinter"]
    }
  }
}
