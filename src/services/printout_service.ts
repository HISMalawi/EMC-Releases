import { Service } from "./service";
import ApiClient from "./api_client";
import usePlatform from "@/composables/usePlatform";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { EventChannels } from "@/utils/EventBus";
import EventBus from "@/utils/EventBus";
import { BluetoothSerial } from "@awesome-cordova-plugins/bluetooth-serial";
import { optionsActionSheet } from '@/utils/ActionSheets';
import dayjs from 'dayjs';

export class PrintoutService extends Service {
    constructor() {
        super()
    }

    async execPrint(url: string) {
        const preFetch = await Service.getText(url)
        if (!preFetch) throw 'Unable to print Label. Try again later'
        document.location = (await ApiClient.expandPath(url)) as any
    }

    async batchPrintLbls(urls: string[], showPrintImage = true) {
        const { platformType } = usePlatform()
        if (platformType.value === 'desktop') {
            const errors: string[] = []
            if(showPrintImage) EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')
            for(const url of urls) {
                try {
                    await this.execPrint(url)
                } catch (e) {
                    errors.push(e as any)
                }
            }
            if(showPrintImage) await PrintoutService.delay(2000)
            if (errors.length > 0) {
                // display unique errors only
                await toastWarning(errors.filter((value, index, self) => self.indexOf(value) === index).join(), 3000)
            }           
        } else {
            toastWarning('Sorry, your Platform does not support Label printing. Bye!')
        }
    }

    async printLbl(url: any, showPrintImage = true) {
        try {
            const preFetch = await Service.getText(url)
            if (!preFetch) throw 'Unable to print Label. Try again later'
            await toastSuccess(preFetch, 30000)
            const { platformType } = usePlatform()
            if (platformType.value === 'desktop') {
                if(showPrintImage) EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')
                document.location = (await ApiClient.expandPath(url)) as any
            } else {
                const printer = await this.getDefaultPrinter();
                if (!printer) return
                if(showPrintImage) EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')  
                BluetoothSerial.connect(printer.address).subscribe(async () => {
                    BluetoothSerial.write(preFetch)
                        .then(() => BluetoothSerial.disconnect())
                })
            }
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

    setDefaultPrinter(printer: {name: string; address: string}) {
        sessionStorage.setItem('defaultPrinter', JSON.stringify(printer))
    }

    async getDefaultPrinter() {
        const printer = sessionStorage.getItem('defaultPrinter')
        if (printer) return JSON.parse(printer)
        return this.selectDefaultPrinter()
    }

    async selectDefaultPrinter(): Promise<Record<string, any>> {
        const printers: any[] = await BluetoothSerial.list()
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
        
        this.setDefaultPrinter({name: printer.name, address: printer.address})

        return printer
    }

    async printTestLbl() {
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

        const printer = await this.getDefaultPrinter();
        if (!printer) return
        EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')  
        BluetoothSerial.connect(printer.address).subscribe(async () => {
            BluetoothSerial.write(testLblText)
                .then(() => BluetoothSerial.disconnect())
        })
    }

}