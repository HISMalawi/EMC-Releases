export interface PrinterDevice {
  deviceID: string;
  name?: string;
  port?: "BLUETOOTH" | "USB";
  address?: string;
}

export interface WriteOptions {
  deviceID: string;
  rawString: string;
  url?: string;
}

export interface LabelPrinterPlugin {
  discover(): Promise<{devices: string[]}>;
  write(opts: WriteOptions): Promise<void>;
}
