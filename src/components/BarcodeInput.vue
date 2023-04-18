<template>
  <ion-grid>
    <ion-row>
      <ion-col :size="iconSize" @click="useCameraScanner" style="max-height: 100px;">
        <img id="barcode-img" class="clickable" src="/assets/images/barcode.svg"/>
      </ion-col>
      <ion-col :size="inputSize">
        <input 
          :readonly="activePlatformProfile.keyboard === KeyboardType.HIS_KEYBOARD_ONLY" 
          id="barcode-inputbox" 
          placeholder="Scan barcode or QR Code"
          v-model="typedBarcode"
          :autofocus="true"
          :style="{ fontSize, textShadow: 'wrap' }"
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
    const onScan = (val: string) => {
      const scanned = `${val||''}`.replace(/\$/ig, '')
      emit("onScan", scanned)
      emit("onValue", scanned)
      typedBarcode.value = ''
    }
    const { activePlatformProfile } = usePlatform()
    const scannedBarcode =  useBarcode(onScan)
    const typedBarcode = ref('')

    const useCameraScanner = () => {
      try {
        BarcodeScanner.scan().then(data => {
          scannedBarcode.value = data.text
          onScan(scannedBarcode.value)
        })
      } catch (error) {
        console.log(error)
      }
    }
    watch(() => props.clearValue, () => typedBarcode.value = '')
    watch(() => props.virtualText, (v) => typedBarcode.value = v || '')
    watch(typedBarcode, (typed) => {
      if (!typed) return
      if(typed && !typed.match(/.+\$$/i)) 
        return
      onScan(typed)
    })
    return  {
      typedBarcode,
      KeyboardType,
      activePlatformProfile,
      iconSize: computed(() => props.size === 'small' ? 3 : 2),
      inputSize: computed(() => props.size === 'small' ? 9 : 10),
      fontSize: computed(() => props.size === 'small' ? '15px' : '42px'),
      useCameraScanner,
    }
  },
});
</script>
<style scoped>
input:focus {
  outline: none !important;
  border-color: #719ECE;
}
#barcode-img {
  height: 100% !important;
}
#barcode-inputbox {
  font-weight: bold;
  padding: .5em;
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
