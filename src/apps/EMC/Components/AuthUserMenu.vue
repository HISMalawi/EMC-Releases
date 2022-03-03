<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item detail button>
        <ion-label>View Profile</ion-label>
      </ion-item>
      <ion-item detail button>
        <ion-label>Edit Profile</ion-label>
      </ion-item>
      <ion-item detail button>
        <ion-label>Change Password</ion-label>
      </ion-item>
      <ion-item lines="none" detail button>
        <ion-label>Logout</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthUserMenu',
  components: { IonContent }
});
</script>