import EventBus from '@/utils/EventBus';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';


export default function useBarcode() {
  
  const barcodeBuffer = ref<string[]>([]);
  
  watch(barcodeBuffer, (newValue) => {
    if (newValue.length > 1 && newValue[newValue.length - 2] === 'Shift' && newValue[newValue.length - 1] === '4') {
      const barcode = newValue
        .map((v, i) => i > 0 && newValue[i - 1] === 'Shift' ? v.toUpperCase() : v)
        .slice(0, newValue.length - 2)
        .filter(v => v !== 'Shift')
        .join('') + '$';
      
      EventBus.emit('barcode', barcode);

    }
  }, { immediate: true, deep: true });


  onMounted(() => {
    window.addEventListener('keyup', (e: KeyboardEvent) =>  {
      barcodeBuffer.value.push(e.key);
    })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', () => {
      barcodeBuffer.value = [];
    });
  })
}