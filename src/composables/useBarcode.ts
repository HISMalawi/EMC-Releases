import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import onScan from "onscan.js";

export default function useBarcode() {
  const barcode = ref('');

  onMounted(() => {
    console.log("useBarcode mounted");
    onScan.attachTo(window.document, {
      reactToPaste: true,
      onScan: function (sCode: string) {
        console.log("onScan: " + sCode);
        barcode.value = sCode.replaceAll(/\$/gi, '');
      },
    })
  })

  onBeforeUnmount(() => {
    onScan.detachFrom(window.document);
  })

  return barcode;
}