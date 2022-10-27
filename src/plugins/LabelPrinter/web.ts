import ApiClient from '@/services/api_client';
import { WebPlugin } from '@capacitor/core';
import type { LabelPrinterPlugin, WriteOptions } from './definitions';


export class LabelPrinterWeb extends WebPlugin implements LabelPrinterPlugin {
  async write(opts: WriteOptions): Promise<void> {
    if(opts.url) {
      return ApiClient.expandPath(opts.url).then(path => {
        document.location = path as any
      })
    }
    throw new TypeError ("Undefined url")
  }
  async discover(): Promise<{devices: string[]}> {
    return {
      devices: ["webPrinter"]
    }
  }
}
