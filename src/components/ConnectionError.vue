<template>
    <div id="api-error" class="his-card">
      <p>
        Unable to connect to BHT-API. 
        Please check: 
        <ul :style="{listStyle:'none'}"> 
          <li> Check the HIS-Core configuration file </li>
          <li> Your configuration </li>
          <li> The service is running </li>
          <li> Your network cable is ok </li>
        </ul> 
      </p>
      <ion-button 
        @click="goToSettings"
        color="warning"> 
        New Config
      </ion-button>
      <ion-button @click="refresh" color="warning"> 
        Refresh
      </ion-button>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { IonButton } from "@ionic/vue"
import usePlatform from '@/composables/usePlatform'
import { useRouter } from 'vue-router'

export default defineComponent({
    components: { IonButton },
    setup() {
      const router = useRouter()
      const { platformType } = usePlatform()

      const goToSettings = () => {
        console.log('goToSettings')
        const url = platformType.value === 'desktop' 
          ? '/settings/network_settings' 
          : '/settings/host'
        console.log(platformType.value, url)
        router.push(url)
      }
      const refresh = () => location.reload()
      
      return {
          refresh,
          goToSettings,
      }
    }
})
</script>
<style scoped>
  #api-error {
    bottom: 0;
    position: absolute;
    background: red;
    color: white;
    font-weight: bold;
    width: 50vw;
    bottom: 30px; /* Position Y halfway in */
    left: 50%; /* Position X halfway in */
    transform: translate(-50%,-50%); /* Move it halfway back(x,y) */
    text-align: center;
    z-index: 40;
  }
</style>