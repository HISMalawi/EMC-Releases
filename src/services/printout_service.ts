import { Service } from "./service";
import { getPlatforms, modalController } from "@ionic/vue";
import ZebraPrinterComponent from "@/components/ZebraPrinterImage.vue"
import { delayPromise } from "@/utils/Timers";
import ApiClient from "./api_client";
import usePlatform from "@/composables/usePlatform";
import { toastWarning } from "@/utils/Alerts";

enum PrintOutVariable {
    ZEBRA_MODAL = 'zebra-modal'
}

export class PrintoutService extends Service {
    constructor() {
        super()
    }

    static async zebraModalActive() {
        const modal = await modalController.getTop()
        return modal && modal.id === PrintOutVariable.ZEBRA_MODAL
    }

    static async showPrinterImage() {
        /** 
         * Prevent showing multiple modals when printing.
         * From experience when multiple modals appear, the modal becomes
         * undismissable
        */
        if (!(await this.zebraModalActive())) {
            const modal = await modalController.create({
                id: PrintOutVariable.ZEBRA_MODAL,
                component: ZebraPrinterComponent,
                backdropDismiss: false
            })
            modal.present()
        }
    }

    async printLbl(url: any) {
        const { platformType } = usePlatform()
        if (platformType.value === 'desktop') {
            await PrintoutService.showPrinterImage()
            try {
                // Do a preflight to make sure that we can print that label
                // before changing document location
                const preFetch = await Service.getText(url)
                if (!preFetch) {
                    throw 'Unable to print Label. Try again later'
                } 
                document.location = (await ApiClient.expandPath(url)) as any
                await delayPromise(2500)
            } catch (e) {
                toastWarning(e, 3000)
            }
            if ((await PrintoutService.zebraModalActive())) {
                modalController.dismiss({}, undefined, PrintOutVariable.ZEBRA_MODAL)
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