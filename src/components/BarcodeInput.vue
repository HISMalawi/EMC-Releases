<template>
  <ion-grid>
    <ion-row>
      <ion-col :size="iconSize" @click="useCameraScanner">
        <img id="barcode-img" src="/assets/images/barcode.svg"/>
      </ion-col>
      <ion-col :size="inputSize">
        <input 
          :readonly="activePlatformProfile.keyboard === KeyboardType.HIS_KEYBOARD_ONLY" 
          id="barcode-inputbox" 
          placeholder="Scan barcode or QR Code"
          v-model="typedBarcode"
        />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import {IonCol,IonGrid,IonRow} from "@ionic/vue";
import usePlatform, { KeyboardType } from '@/composables/usePlatform';
import useBarcode from '@/composables/useBarcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export default defineComponent({
  name: 'BarcodeInput',
  components: { IonRow,  IonCol, IonGrid },
  props: {
    clearValue: String, 
    virtualText: String,
    size: {
      type: String as PropType<"small" | "medium" | "Large">,
      default: "large"
    }
  },
  emits: ['onScan', 'onValue'],
  setup(props, { emit }) {
    const { activePlatformProfile } = usePlatform()
    const scannedBarcode =  useBarcode()
    const typedBarcode = ref('')

    const useCameraScanner = () => {
      try {
        BarcodeScanner.scan().then(data => {
          scannedBarcode.value = data.text
        })
      } catch (error) {
        console.log(error)
      }
    }

    watch(() => props.clearValue, () => typedBarcode.value = '')
    watch(() => props.virtualText, (v) => typedBarcode.value = v || '')
    watch(scannedBarcode, (scannedCode) => {
      if(typedBarcode.value && !typedBarcode.value.match(/.+\$$/i)) return
      const finalCode = typedBarcode.value 
        ? typedBarcode.value.replace(/\$/ig, '')
        : scannedCode

      emit("onScan", finalCode)
      emit("onValue", finalCode)
      typedBarcode.value = ''
    })
    return  {
      typedBarcode,
      KeyboardType,
      activePlatformProfile,
      iconSize: computed(() => props.size === 'small' ? 3 : 2),
      inputSize: computed(() => props.size === 'small' ? 9 : 10),
      useCameraScanner,
    }
  },
});
</script>
<style scoped>
input:focus {
  outline: 1px solid #ccc !important;
  border-color: #719ECE;
}
#barcode-img {
  max-height: 10vh !important;
  width: 100% !important;
}
#barcode-inputbox {
  font-weight: bold;
  margin-top: .2em;
  font-size: var(--his-lg-text);
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: #ccc;
  background-color: white;
  width: 100%;
  height: 85%;
}
@media (min-width: 200px) and (max-width: 900px) { 
  #barcode-img {
    width: 350px;
  }
}
</style>
