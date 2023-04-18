import { onBeforeUnmount, onMounted, ref } from 'vue';
import onScan from "onscan.js";

export default function useBarcode(scanEvent=null as any) {
  const barcode = ref('');
  const keyBuffer = ref<string[]>([]);

  const updateScanEvent = (val: string) => {
    if (typeof scanEvent === 'function') {
      scanEvent(val)
    }
  }

  onMounted(() => {
    onScan.attachTo(document, {
      reactToPaste: true,
      minLength: 1,
      onScan: function (sCode: string) {
        if(keyBuffer.value.length) {
          if(keyBuffer.value.includes('$')) {
            barcode.value = keyBuffer.value.join('').replaceAll(/\$/gi, '');
            keyBuffer.value = [];
            updateScanEvent(barcode.value)
          }
          return
        }
        barcode.value = sCode.replaceAll(/\$/gi, '');
        updateScanEvent(barcode.value)
      },
      onScanError(debug) {
        console.log("onScanError: " + JSON.stringify(debug));
      },
      onKeyDetect(keyCode, event) {
        if(event.key.match(/backspace/i) && keyBuffer.value.length) {
          keyBuffer.value.pop();
          return
        }
        if(event.key.match(/enter/i)) keyBuffer.value.push('$');
        if(event.key.length === 1) keyBuffer.value.push(event.key);
        console.log("onKeyDetect: " + keyCode, event.key);
      },
    })
  })

  onBeforeUnmount(() => {
    onScan.detachFrom(document);
  })

  return barcode;
}