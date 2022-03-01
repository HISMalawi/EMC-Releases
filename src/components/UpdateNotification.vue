<template>
    <div id="update-notification" v-if="hasUpdate"> 
      {{newVersion}} <br/>
      New Updates and fixes are available
      <br/>
      <ion-button @click="onVersionUpdate" color="success" size="large">
        Update Now!!
      </ion-button>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { IonButton } from "@ionic/vue"
import { AuthService } from '@/services/auth_service'

export default defineComponent({
    components: { IonButton },
    props: {
        checkInterval: {
            type: Number,
            default: 30000
        }
    },
    setup(props) {
        const hasUpdate = ref(false)
        const newVersion = ref('')
        const auth = new AuthService()

        setInterval(async () => {
            if (!hasUpdate.value) {
                const headVersion = await auth.getHeadVersion()
                const activeVersion = auth.getActiveCoreVersion()
                if (headVersion != '-' && headVersion != activeVersion) {
                    newVersion.value = headVersion
                    hasUpdate.value = true
                }
            }
        }, props.checkInterval)

        function onVersionUpdate () {
            auth.setActiveVersion(newVersion.value)
            location.reload()
        }

        return {
            onVersionUpdate,
            newVersion,
            hasUpdate
        }
    }
})
</script>
<style scoped>
  #update-notification {
    opacity: 0.95;
    position: absolute;
    font-weight: bold;
    background: #e1fef2;
    color: black;
    width: 100vw;
    margin: auto;
    padding: 1.6em;
    font-size: 1.8rem;
    top: 10%;/* Position Y halfway in */
    left: 50%; /* Position X halfway in */
    transform: translate(-50%,-50%); /* Move it halfway back(x,y) */
    text-align: center;
    z-index: 40;
  }
</style>