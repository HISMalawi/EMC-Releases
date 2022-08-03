import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import onScan from "onscan.js";

export default function useBarcode() {
  const barcode = ref('');

  onMounted(() => {
    onScan.attachTo(document, {
      reactToPaste: true,
      onScan: function (sCode) {
        barcode.value = sCode.replaceAll(/\$/gi, '');
      },
    })
  })

  onBeforeUnmount(() => {
    onScan.detachFrom(document);
  })

  return barcode;
}