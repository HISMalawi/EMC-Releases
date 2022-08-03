import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import onScan from "onscan.js";

export default function useBarcode() {
  const barcode = ref('');

  onMounted(() => {
    onScan.attachTo(document, {
      reactToPaste: true,
      minLength: 1,
      onScan: function (sCode: string) {
        barcode.value = sCode.replaceAll(/\$/gi, '');
      },
      onScanError(debug) {
        console.log("onScanError: " + JSON.stringify(debug));
      },
    })
  })

  onBeforeUnmount(() => {
    onScan.detachFrom(document);
  })

  return barcode;
}