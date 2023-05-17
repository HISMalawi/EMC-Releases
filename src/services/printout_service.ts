import { Service } from "./service";
import { toastWarning } from "@/utils/Alerts";
import { EventChannels } from "@/utils/EventBus";
import EventBus from "@/utils/EventBus";
import { BluetoothSerial } from "@awesome-cordova-plugins/bluetooth-serial";
import { optionsActionSheet } from '@/utils/ActionSheets';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { PrinterDevice, LabelPrinter } from "@/plugins/LabelPrinter";
import nprogress from "nprogress";


export class PrintoutService extends Service {
    constructor() {
        super()
    }

    private async _print(url: string) {
        const rawString = await Service.getText(url)
        if (!rawString) {
            throw 'Unable to print Label. Try again later'
        }
        let printer = await this.getDefaultPrinter()
        if(isEmpty(printer)) printer = await this.selectDefaultPrinter()
        if(isEmpty(printer)) throw new Error ("No printer device found")
        if(printer?.port === "USB") return LabelPrinter.write({ deviceID: printer.deviceID, rawString, url })
        return this.printToBluetoothDevice(printer, rawString)
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
    //TODO: remove this.. it's not supposed to be in this service.
    async printLocation(locationId: number) {
        await this.printLbl(`labels/location?location_id=${locationId}`)
    }

    //TODO: remove this.. it's not supposed to be in this service
    async printDrug(drugId: number, quantity: number) {
        await this.printLbl(`drugs/${drugId}/barcode?quantity=${quantity}`)
    }

    async getDefaultPrinter(): Promise<PrinterDevice | undefined> {
        const p = localStorage.getItem('defaultPrinter')
        try {
            return p && JSON.parse(p)
        } catch (error) {
            toastWarning(`${error}` , )
        }
    }

    async getUsbPrinters (): Promise<PrinterDevice[]> {
        try {
            const { devices } = await LabelPrinter.discover()
            return devices.map(printer => ({
                deviceID: printer,
                name: printer,
                port: "USB"
            }))
        } catch (error) {
            console.log(error)
        }
        return []
    }

    async getBluetoothPrinters (): Promise<PrinterDevice[]> {
       try {
            const devices: any[] = await BluetoothSerial.list();
            return devices .map((p: any) => ({
                deviceID: p.name,
                name: `${p.name} (${p.address})`,
                port: "BLUETOOTH",
                address: p.address
            }))
       } catch (error) {
            console.log(error)
       }
       return []
    }

    async getAllPrinters () {
        nprogress.start()
        const uPrinters = await this.getUsbPrinters();
        const bPrinters = await this.getBluetoothPrinters()
        nprogress.done()
        return [...uPrinters, ...bPrinters]
    }

    async selectDefaultPrinter(): Promise<PrinterDevice | undefined> {
        let defualtPrinter: PrinterDevice | undefined  = undefined;

        const printers = await this.getAllPrinters()
        if (printers.length === 0) {
            toastWarning('No printers found. Please connect a printer or make sure a bluetooth printer is paired')
            return
        }
        if(printers.every(p => p.deviceID === "webPrinter")) {
            defualtPrinter = printers[0];
        }
        if(isEmpty(defualtPrinter)){
            const option = await optionsActionSheet(
                "Select Printer",
                "Please, select default printer",
                printers.map(p => p.name || p.deviceID),
                [
                    { name: 'Cancel', slot:'start', color: 'danger' },
                    { name: 'Continue', slot: 'end', role: 'action' }
                ]
            )
    
            if(option.action === 'Cancel') return
    
            defualtPrinter = printers.find(p => {
                return p.name === option.selection || 
                    p.deviceID === option.selection
            }) as PrinterDevice
        }
        
        if(defualtPrinter) this.setDefaultPrinter(defualtPrinter)

        return defualtPrinter
    }

    setDefaultPrinter (printer: PrinterDevice) {
        if(!isEmpty(printer)) {
            localStorage.setItem('defaultPrinter', JSON.stringify(printer))
        }
    }

    async printTestLbl(printer: PrinterDevice) {
        const rawString = `\nN\nq801\nQ329,026\nZT\nB50,180,0,1,5,15,120,N,"Barcode"\nA35,30,0,2,2,2,N,""\nA35,76,0,2,2,2,N,"Test Label Printing"\nA35,122,0,2,2,2,N,"Date: ${dayjs().format('DD/MMM/YYYY')}"\nP1\n`
        try {
            EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')
            if(printer?.port === "USB") return LabelPrinter.write({ deviceID: printer.deviceID, rawString })
            return this.printToBluetoothDevice(printer, rawString)
        } catch (error) {
            toastWarning(`${error}`)
        }
    }

    printToBluetoothDevice(printer: PrinterDevice, labelData: string) {
        BluetoothSerial.connect(printer?.address || '').subscribe(async () => {
            BluetoothSerial.write(labelData)
                .catch((e) => toastWarning(e))
                .finally(() => BluetoothSerial.disconnect())
        }, e => toastWarning(e))
    }

}
