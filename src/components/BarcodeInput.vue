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
      />
    </ion-col>
  </ion-row>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import {IonCol,IonRow} from "@ionic/vue";
import handleVirtualInput from "@/components/Keyboard/KbHandler"
import usePlatform, { ScannerType, KeyboardType } from '@/composables/usePlatform';
import useBarcode from '@/composables/useBarcode';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BarcodeInput',
  components: {
    IonRow,
    IonCol,
  },
  props: ['clearValue', 'virtualText'],
  emits: ['onScan', 'onValue'],
  setup(_props, { emit }) {
    const router = useRouter();
    const { activePlatformProfile } = usePlatform()

    const barcode =  useBarcode()

    watch(barcode, (newValue) => {
      if (newValue) {
        emit('onScan', newValue)
        emit('onValue', newValue)
      }
    })
    
    return  {
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
    barcodeText: function(text) {
      if (text) {
        this.checkForbarcode();
        this.$emit('onValue', text)
      }
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
