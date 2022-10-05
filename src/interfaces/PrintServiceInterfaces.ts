export interface PrinterDescription {
    id: string;
    name: string;
    address: string;
    type: 'BLUETOOTH DEVICE' | 'USB DEVICE';
}