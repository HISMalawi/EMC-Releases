<template>
  <ion-row>
    <ion-col size="2">
      <img id="barcode-img" src="/assets/images/barcode.svg"/>
    </ion-col>
    <ion-col size="10">
      <input 
        :readonly="activePlatformProfile.keyboard === KeyboardType.HIS_KEYBOARD_ONLY" 
        id="barcode-inputbox" 
        placeholder="Scan barcode or QR Code"
        v-model="barcodeText"
        :autofocus="true"
      />
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import {IonCol,IonRow} from "@ionic/vue";
import handleVirtualInput from "@/components/Keyboard/KbHandler"
import usePlatform, { KeyboardType } from '@/composables/usePlatform';
import useBarcode from '@/composables/useBarcode';

export default defineComponent({
  name: 'BarcodeInput',
  components: {
    IonRow,
    IonCol,
  },
  props: ['clearValue', 'virtualText'],
  emits: ['onScan', 'onValue'],
  setup(_props, { emit }) {
    const { activePlatformProfile } = usePlatform()
    const barcode =  useBarcode()
    
    return  {
      barcode,
      KeyboardType,
      activePlatformProfile,
    }
  },
  data: () => ({
    barcodeText: '',
  }),
  methods: {
    checkForbarcode(){
      if(this.barcodeText.match(/.+\$$/i) != null){
        const text = this.barcodeText.replace(/\$/ig, '');
        this.$emit('onScan', text)
        this.$emit('onValue', text)
        this.barcodeText = ''
      }
    }
  },
  watch: {
    clearValue() {
      this.barcodeText = ''
    },
    virtualText(val) {
      this.barcodeText = handleVirtualInput(val, this.barcodeText)
    },
    barcode(code) {
      if(this.barcodeText) {
        this.checkForbarcode()
        return
      }
      this.$emit('onScan', code)
      this.$emit('onValue', code)
    }
  }
});
</script>
<style scoped>
input:focus {
  outline: none !important;
  border-color: #719ECE;
  box-shadow: 0 0 5px #202020;
}
#barcode-img {
  width: 70%;
}
#barcode-inputbox {
  font-weight: bold;
  padding: 5px;
  font-size: 2.9em;
  border-style: solid;
  border-width: 0px 0px 2px 0px;
  border-color: #ccc;
  background-color: white;
  width: 100%;
  height: 90%;
}
@media (min-width: 200px) and (max-width: 900px) { 
  #barcode-img {
    width: 350px;
  }
}
</style>
