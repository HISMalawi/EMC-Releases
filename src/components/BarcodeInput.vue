<template>
  <ion-grid>
    <ion-row>
      <ion-col :size="iconSize">
        <img id="barcode-img" src="/assets/images/barcode.svg"/>
      </ion-col>
      <ion-col :size="inputSize">
        <input 
          :readonly="activePlatformProfile.keyboard === KeyboardType.HIS_KEYBOARD_ONLY" 
          id="barcode-inputbox" 
          placeholder="Scan barcode or QR Code"
          v-model="barcodeText"
        />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import {IonCol,IonRow} from "@ionic/vue";
import usePlatform, { KeyboardType } from '@/composables/usePlatform';
import useBarcode from '@/composables/useBarcode';

export default defineComponent({
  name: 'BarcodeInput',
  components: {
    IonRow,
    IonCol,
  },
  props: {
    clearValue: String, 
    virtualText: String,
    size: {
      type: String as PropType<"small" | "medium" | "Large">,
      default: "large"
    }
  },
  emits: ['onScan', 'onValue'],
  setup(props) {
    const { activePlatformProfile } = usePlatform()
    const barcode =  useBarcode()
    return  {
      barcode,
      KeyboardType,
      activePlatformProfile,
      iconSize: computed(() => props.size === 'small' ? 3 : 1),
      inputSize: computed(() => props.size === 'small' ? 9 : 11)
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
      this.barcodeText = val
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
  outline: 1px solid #ccc !important;
  border-color: #719ECE;
}
#barcode-img {
  height: 80%;
}
#barcode-inputbox {
  font-weight: bold;
  padding: 5px;
  font-size: 22px;
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
