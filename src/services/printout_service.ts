import { Service } from "./service";
import ApiClient from "./api_client";
import usePlatform from "@/composables/usePlatform";
import { toastWarning } from "@/utils/Alerts";
import { EventChannels } from "@/utils/EventBus";
import EventBus from "@/utils/EventBus";

export class PrintoutService extends Service {
    constructor() {
        super()
    }

    async printLbl(url: any) {
        const { platformType } = usePlatform()
        if (platformType.value === 'desktop') {
            try {
                EventBus.emit(EventChannels.SHOW_MODAL, 'zebra-modal')                
                // Do a preflight to make sure that we can print that label
                // before changing document location
                const preFetch = await Service.getText(url)

                if (!preFetch) throw 'Unable to print Label. Try again later'

                document.location = (await ApiClient.expandPath(url)) as any
            } catch (e) {
                toastWarning(e, 3000)
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