import { getPlatforms } from "@ionic/vue";
import { onMounted, ref, watch } from "vue";

export default function usePlatform () {
  const name = ref()

  const setPlatform = (platform: typeof name.value) => {
    name.value = platform
  }

  watch(name, (newName) => console.log(newName))
  onMounted(() => name.value = getPlatforms()[0])

  return {
    name,
    setPlatform,
  }
}