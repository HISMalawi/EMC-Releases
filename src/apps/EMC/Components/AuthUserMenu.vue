<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item button @click="$router.push('/emc/profile')">
        <ion-label>Profile</ion-label>
      </ion-item>
      <ion-item lines="none" button @click="signOut">
        <ion-label>Logout</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { AuthService } from '@/services/auth_service';
import { alertConfirmation } from '@/utils/Alerts';
import { IonContent, popoverController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";

export default defineComponent({
  name: 'AuthUserMenu',
  components: { IonContent },
  setup() {
    const router = useRouter()
    const signOut = async () => {
      const ok = await alertConfirmation('Are you sure you want to logout ?')
      if (!ok) return
      const auth = new AuthService()
      if((await GLOBAL_PROP.portalEnabled())) {
        const portalLocation = await GLOBAL_PROP.portalProperties();
        window.location = portalLocation;
      } else {
        router.push("/login");
      }
      auth.clearSession();
      popoverController.dismiss();
    }

    return {
      signOut,
    }
  }
});
</script>