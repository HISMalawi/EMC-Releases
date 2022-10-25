import { Service } from "./service";
import ApiClient from "./api_client";
import { toastWarning } from "@/utils/Alerts";
import { EventChannels } from "@/utils/EventBus";
import EventBus from "@/utils/EventBus";
import { BluetoothSerial } from "@awesome-cordova-plugins/bluetooth-serial";
import { optionsActionSheet } from '@/utils/ActionSheets';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { PrinterDevice, LabelPrinter } from "@/plugins/LabelPrinter";

export class PrintoutService extends Service {
    constructor() {
        super()
    }

    private async _print(url: string) {
        const rawString = await Service.getText(url)
        if (!rawString) {
            throw 'Unable to print Label. Try again later'
        }
        let deviceID = await this.getDefaultPrinter()
        if(!deviceID) deviceID = await this.selectDefaultPrinter()
        if(!deviceID) throw new Error ("No printer device found")
        LabelPrinter.write({ deviceID, rawString })
        // if (activePlatformProfile.value.printer === PrinterType.WEB) {
        //     this.printToBrowser(url)
        // } else if (activePlatformProfile.value.printer === PrinterType.BLUETOOTH) {
        //     let printer = await this.getDefaultPrinter();
        //     if(isEmpty(printer)) {
        //         printer = await this.selectDefaultPrinter();
        //     }
        //     if (isEmpty(printer)) {
        //         throw 'No default printer selected!!!'
        //     } 
        //     switch(printer.type) {
        //         case 'BLUETOOTH DEVICE':
        //             this.printToBluetoothDevice(printer, preFetch)
        //             break
        //         case 'USB DEVICE':
        //             this.printToUsbDevice(printer, preFetch)
        //             break
        //     }
        // } else {
        //     toastWarning('No printing profile for current platform')
        // }
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

    async getDefaultPrinter(): Promise<string> {
        return localStorage.getItem('defaultPrinter') || ""
    }

    async getAllPrinters () {
        return LabelPrinter.discover()
    }

    async selectDefaultPrinter(): Promise<string> {
        const printers = await this.getAllPrinters()
        if (printers.length === 0) {
            toastWarning('No printers found. Please connect a printer.')
            return ""
        }
        const option = await optionsActionSheet(
            "Select Printer",
            "Please, select default printer",
            printers.map(p => p.deviceID),
            [
                { name: 'Cancel', slot:'start', color: 'danger' },
                { name: 'Continue', slot: 'end', role: 'action' }
            ]
        )

        if(option.action === 'Cancel') return ""
        this.setDefaultPrinter(option.selection)
        return option.selection
    }

    setDefaultPrinter (printer: string) {
        localStorage.setItem('defaultPrinter', printer)
    }

    async printTestLbl(printer: string) {
        try {
            EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')
            await LabelPrinter.test({ deviceID: printer})
        } catch (error) {
            toastWarning(`${error}`)
        }
    }

    // printToBrowser(url: string) {
    //     ApiClient.expandPath(url).then((path: any) => {
    //         document.location = path
    //     }).catch(e => toastWarning(e))
    // }

    // printToBluetoothDevice(printer: PrinterDescription, labelData: string) {
    //     BluetoothSerial.connect(printer.address).subscribe(async () => {
    //         BluetoothSerial.write(labelData)
    //             .catch((e) => toastWarning(e))
    //             .finally(() => BluetoothSerial.disconnect())
    //     }, e => toastWarning(e))
    // }

}
