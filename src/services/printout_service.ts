import { Service } from "./service";
import { getPlatforms, modalController } from "@ionic/vue";
import ZebraPrinterComponent from "@/components/ZebraPrinterImage.vue"
import { delayPromise } from "@/utils/Timers";
import ApiClient from "./api_client";
import usePlatform from "@/composables/usePlatform";
import { toastWarning } from "@/utils/Alerts";

export class PrintoutService extends Service {
    constructor() {
        super()
    }

    static async showPrinterImage() {
        const modal = await modalController.create({
            component: ZebraPrinterComponent,
            backdropDismiss: false
        })
        modal.present()
    }

    async printLbl(url: any) {
        const { platformType } = usePlatform()
        if (platformType.value === 'desktop') {
            await PrintoutService.showPrinterImage()
            try {
                // Do a preflight to make sure that we can print that label
                // before changing document location
                const preFetch = await Service.getText(url)
                if (!preFetch) throw 'Unable to print Label. Try again later'
                document.location = (await ApiClient.expandPath(url)) as any
                await delayPromise(1500)
            } catch (e) {
                toastWarning(e, 3000)
            }
        } else {
            toastWarning('Sorry, your Platform does not support Label printing. Bye!')
        }
        return modalController.dismiss({})
    }

    async printLocation(locationId: number) {
        await this.printLbl(`labels/location?location_id=${locationId}`)
    }
    async printDrug(drugId: number, quantity: number) {
        await this.printLbl(`drugs/${drugId}/barcode?quantity=${quantity}`)
    }
}