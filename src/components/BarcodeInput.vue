<template>
  <ion-row>
    <ion-col size="2">
      <img id="barcode-img" src="/assets/images/barcode.svg"/>
    </ion-col>
    <ion-col size="10">
      <input 
        :readonly="activePlatformProfile.keyboard === 'CAMERA_SCANNER'" 
        ref="barcode"
        id="barcode-inputbox" 
        v-model="barcodeText"
      />
    </ion-col>
  </ion-row>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {IonCol,IonRow} from "@ionic/vue";
import handleVirtualInput from "@/components/Keyboard/KbHandler"
import usePlatform, { ScannerType } from '@/composables/usePlatform';

export default defineComponent({
  name: 'BarcodeInput',
  components: {
    IonRow,
    IonCol,
  },
  props: ['clearValue', 'virtualText'],
  setup() {
    const barcode = ref(null)
    const { activePlatformProfile } = usePlatform() 
    if (activePlatformProfile.value.scanner === ScannerType.BARCODE_SCANNER) {
      setInterval(() => {
        try {
          barcode.value.focus()
        } catch(e) {
          //No focus
        }
      }, 1500)
    }
    return  {
      barcode,
      activePlatformProfile
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
