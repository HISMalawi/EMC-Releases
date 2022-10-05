import { Service } from "./service";
import ApiClient from "./api_client";
import usePlatform, { PrinterType } from "@/composables/usePlatform";
import { toastWarning } from "@/utils/Alerts";
import { EventChannels } from "@/utils/EventBus";
import EventBus from "@/utils/EventBus";
import { BluetoothSerial } from "@awesome-cordova-plugins/bluetooth-serial";
import { optionsActionSheet } from '@/utils/ActionSheets';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Printer } from "@mqn/capacitor-plugin-printer";
import { PrinterDescription } from "@/interfaces/PrintServiceInterfaces";

export class PrintoutService extends Service {
    constructor() {
        super()
    }

    private async _print(url: string) {
        const { activePlatformProfile } = usePlatform()
        const preFetch = await Service.getText(url)
        if (!preFetch) {
            throw 'Unable to print Label. Try again later'
        } 
        if (activePlatformProfile.value.printer === PrinterType.WEB) {
            this.printToBrowser(url)
        } else if (activePlatformProfile.value.printer === PrinterType.BLUETOOTH) {
            let printer = await this.getDefaultPrinter();
            if(isEmpty(printer)) {
                printer = await this.selectDefaultPrinter();
            }
            if (isEmpty(printer)) {
                throw 'No default printer selected!!!'
            } 
            switch(printer.type) {
                case 'BLUETOOTH DEVICE':
                    this.printToBluetoothDevice(printer, preFetch)
                    break
                case 'USB DEVICE':
                    this.printToUsbDevice(printer, preFetch)
                    break
            }
        } else {
            toastWarning('No printing profile for current platform')
        }
    }

    async batchPrintLbls(urls: string[], showPrintImage = true) {
        if(showPrintImage) EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')
        const errors: string[] = []
        for(const url of urls) {
            try {
                await this._print(url)
            } catch (e) {
                errors.push(e as any)
            }
        }
        if(showPrintImage) await PrintoutService.delay(2000)
        if (errors.length > 0) {
            // display unique errors only
            await toastWarning(errors.filter((value, index, self) => self.indexOf(value) === index).join(), 3000)
        } 
    }

    async printLbl(url: string, showPrintImage = true) {
        try {
            if(showPrintImage) EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')
            await this._print(url)
            if(showPrintImage) await PrintoutService.delay(2000)
        } catch (e) {
            toastWarning(e as any)
        }
    }
    //TODO: remove this.. it's not supposed to be in this service
    async printLocation(locationId: number) {
        await this.printLbl(`labels/location?location_id=${locationId}`)
    }

    //TODO: remove this.. it's not supposed to be in this service
    async printDrug(drugId: number, quantity: number) {
        await this.printLbl(`drugs/${drugId}/barcode?quantity=${quantity}`)
    }

    setDefaultPrinter(printer: PrinterDescription) {
        sessionStorage.setItem('defaultPrinter', JSON.stringify(printer))
    }

    async getDefaultPrinter() {
        const printer = sessionStorage.getItem('defaultPrinter')
        if (printer) return JSON.parse(printer)
        return {}
    }

    async selectDefaultPrinter(): Promise<PrinterDescription | {}> {
        const printers: PrinterDescription[] = await this.getAllPrinters()
        if (printers.length === 0) {
            toastWarning('No printers found. Please connect a printer.')
            return {}
        }
        const option = await optionsActionSheet(
            "Select Printer",
            "Please, select default printer",
            printers.map(p => p.id),
            [
                { name: 'Cancel', slot:'start', color: 'danger' },
                { name: 'Continue', slot: 'end', role: 'action' }
            ]
        )

        if(option.action === 'Cancel') return {}

        const printer = printers.find(p => p.id === option.selection)
        
        if (printer) {
            this.setDefaultPrinter(printer)
            return printer
        }

        return {}
    }

    async printTestLbl(printer: PrinterDescription) {
        const testLblText = `\nN\nq801\nQ329,026\nZT\nB50,180,0,1,5,15,120,N,"Barcode"\nA35,30,0,2,2,2,N,""\nA35,76,0,2,2,2,N,"Test Label Printing"\nA35,122,0,2,2,2,N,"Date: ${dayjs().format('DD/MMM/YYYY')}"\nP1\n`     
        EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')  
        if (printer.type === 'BLUETOOTH DEVICE') {
            this.printToBluetoothDevice(printer, testLblText)
        } else if (printer.type === 'USB DEVICE') {
            this.printToUsbDevice(printer, testLblText)
        }
    }

    printToBrowser(url: string) {
        ApiClient.expandPath(url).then((path: any) => {
            document.location = path
        }).catch(e => toastWarning(e))
    }

    printToBluetoothDevice(printer: PrinterDescription, labelData: string) {
        BluetoothSerial.connect(printer.address).subscribe(async () => {
            BluetoothSerial.write(labelData)
                .catch((e) => toastWarning(e))
                .finally(() => BluetoothSerial.disconnect())
        }, e => toastWarning(e))
    }

    printToUsbDevice(printer: PrinterDescription, Zpl: string) {
        Printer.printZpl({
            Zpl,
            DeviceName: printer.name,
        }).catch((e) => toastWarning(e))
    }

    async getAllPrinters(): Promise<PrinterDescription[]> {
        const allDevices: any = [];
        try {
            (await BluetoothSerial.list()).forEach((d: any) => {
                allDevices.push({
                    id: `${d.name}-${d.address} (BLUETOOTH DEVICE)`,
                    type: 'BLUETOOTH DEVICE',
                    name: d.name,
                    address: d.address
                })
            });
        } catch (e) {
            console.error('Error Fetching Bluetooth devices', e)
        }
        try {
            (await Printer.getUsbDevices())['UsbDevices'].forEach((name: string) => {
                if (!/null|undefined/.test(`${name}`)) {
                    allDevices.push({
                        name,
                        id: `${name} (USB DEVICE)`,
                        type: 'USB DEVICE',
                        address: 'N/A'
                    })
                }
            });
        } catch (e) {
            console.error('Error fetching USB devices: ', e)
        }
        return allDevices
    }
}
