<template>
    <div class="his-md-text side-title">
        Barcode ID: 
        <ion-text :color="accessionNumber ? 'success' : 'dark'">
            <b>{{ accessionNumber || 'None' }}</b>
        </ion-text>
    </div>
    <div class="his-card"> 
        <BarcodeInput size="small" @onScan="(barcode) => onScanEIDbarcode(barcode)"/>
    </div>
</template>
<script lang="ts">
import { loadingController } from "@ionic/vue";
import { defineComponent } from "vue";
import { toastDanger, toastWarning } from "@/utils/Alerts"
import { OrderService } from "@/services/order_service";
import BarcodeInput from "@/components/BarcodeInput.vue"
import FieldMixinVue from './FieldMixin.vue'

export default defineComponent({
    mixins: [FieldMixinVue],
    components: {
        BarcodeInput
    },
    data() {
        return {
        verifyingBarcode: false,
        accessionNumber: '' as any,
        };
    },
 
    methods: {
        async emitsBarcode(text: string) {
            if (this.onValue) {
                const ok = await this.onValue(text)
                if (!ok) {
                    return
                }
            }
            this.$emit('onValue', text)
        },
        async onScanEIDbarcode(barcode: string) {
            this.verifyingBarcode = !this.verifyingBarcode;
            if (this.verifyingBarcode) return
            (await loadingController.create({ message: `Checking ${barcode}`})).present()
            this.accessionNumber = null
            // Expected barcode examples: L5728043 or 57280438
            const barcodeOk = /^([A-Z]{1})?[0-9]{7,8}$/i.test(`${barcode}`.trim())
            if (!barcodeOk) {
                toastWarning("Invalid Barcode")
                this.emitsBarcode('')
                this.verifyingBarcode = false
                loadingController.getTop().then(v => v && loadingController.dismiss())
                return ;
            }
            /**
             * Verify with API if barcode was already used:
             */
            try {
                if (!(await OrderService.accessionNumExists(barcode))) {
                this.accessionNumber = barcode
                this.emitsBarcode(barcode)
                } else {
                toastWarning(`Barcode ${barcode} was already used`)
                }
            } catch (e) {
                toastDanger("Failed to confirm barcode " + barcode + ", Please try again later", 8000)  
            }
            this.verifyingBarcode = false
            loadingController.getTop().then(v => v && loadingController.dismiss())
        }
    }
});
</script>
<style scoped>
    .side-title {
        width: 100%;
        padding: 0.3em;
        text-align: center;
        background: rgb(233, 232, 232);
    }
    .his-card {
        margin: 2%;
    }
</style>