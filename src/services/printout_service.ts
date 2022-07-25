import { Service } from "./service";
import ApiClient from "./api_client";
import usePlatform from "@/composables/usePlatform";
import { toastWarning } from "@/utils/Alerts";
import { EventChannels } from "@/utils/EventBus";
import EventBus from "@/utils/EventBus";
import { BluetoothSerial } from "@awesome-cordova-plugins/bluetooth-serial";
import { optionsActionSheet } from '@/utils/ActionSheets';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

export class PrintoutService extends Service {
    constructor() {
        super()
    }

    private async _print(url: string) {
        const preFetch = await Service.getText(url)
        if (!preFetch) throw 'Unable to print Label. Try again later'
        if (usePlatform().platformType.value === 'desktop') {
            document.location = (await ApiClient.expandPath(url)) as any
        } else {
            let printer = await this.getDefaultPrinter();
            if(isEmpty(printer)) printer = await this.selectDefaultPrinter();
            if (!printer) throw 'No default printer selected!!!'
            BluetoothSerial.connect(printer.address).subscribe(async () => {
                BluetoothSerial.write(preFetch)
                    .then(() => BluetoothSerial.disconnect())
                    .catch((err) => { throw err })
            }, (err) => { throw err })
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

    async printLocation(locationId: number) {
        await this.printLbl(`labels/location?location_id=${locationId}`)
    }

    async printDrug(drugId: number, quantity: number) {
        await this.printLbl(`drugs/${drugId}/barcode?quantity=${quantity}`)
    }

    setDefaultPrinter(printer: Record<string, any>) {
        sessionStorage.setItem('defaultPrinter', JSON.stringify(printer))
    }

    async getDefaultPrinter() {
        const printer = sessionStorage.getItem('defaultPrinter')
        if (printer) return JSON.parse(printer)
        return {}
    }

    async selectDefaultPrinter(): Promise<Record<string, any>> {
        const printers: any[] = await this.getAllPrinters()
        if (printers.length === 0) {
            toastWarning('No printers found. Please connect a printer.')
            return {}
        }
        const option = await optionsActionSheet(
            "Select Printer",
            "Please, select default printer",
            printers.map(p => p.name + ` (${p.address})`),
            [
                { name: 'Cancel', slot:'start', color: 'danger' },
                { name: 'Continue', slot: 'end', role: 'action' }
            ]
        )

        if(option.action === 'Cancel') return {}

        const printer = printers.find(p => p.name +` (${p.address})` === option.selection)
        
        this.setDefaultPrinter(printer)

        return printer
    }

    async printTestLbl(printerAddress: string) {
        const testLblText = `
            N
            q801
            Q329,026
            ZT
            B50,180,0,1,5,15,120,N,"Barcode"
            A35,30,0,2,2,2,N,""
            A35,76,0,2,2,2,N,"Test Label Printing"
            A35,122,0,2,2,2,N,"Date: ${dayjs().format('DD/MMM/YYYY')}"
            P1`

        EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')  
        BluetoothSerial.connect(printerAddress).subscribe(async () => {
            BluetoothSerial.write(testLblText)
                .catch(async (err) => await toastWarning(err))
                .finally(() => BluetoothSerial.disconnect())
        }, async (err) => await toastWarning(err))
    }

    async getAllPrinters() {
        return BluetoothSerial.list()
    }

}