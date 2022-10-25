export interface PrinterDevice {
  deviceID: string;
}

export interface WriteOptions {
  deviceID: string;
  rawString: string;
}

export interface LabelPrinterPlugin {
  test(device: PrinterDevice): Promise<void>;
  discover(): Promise<PrinterDevice[]>;
  write(opts: WriteOptions): Promise<void>;
}
