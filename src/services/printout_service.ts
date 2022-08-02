import { Service } from "./service";
import ApiClient from "./api_client";
import usePlatform, { PrinterType, ScannerType } from "@/composables/usePlatform";
import { toastWarning } from "@/utils/Alerts";
import { EventChannels } from "@/utils/EventBus";
import EventBus from "@/utils/EventBus";

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
        const { activePlatformProfile } = usePlatform()
        if (activePlatformProfile.value.printer === PrinterType.WIRED_PRINTER) {
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
        const { activePlatformProfile } = usePlatform()
        if (activePlatformProfile.value.printer === PrinterType.WIRED_PRINTER) {
            try {
                if(showPrintImage)
                EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')                
                await this.execPrint(url)
            } catch (e) {
                toastWarning(e as any, 3000)
            }
        } else {
            toastWarning('Sorry, your Platform does not support Label printing. Bye!')
        }
    }

    async printLocation(locationId: number) {
        await this.printLbl(`labels/location?location_id=${locationId}`)
    }

    async printDrug(drugId: number, quantity: number) {
        await this.printLbl(`drugs/${drugId}/barcode?quantity=${quantity}`)
    }
}