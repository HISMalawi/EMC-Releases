<template>
  <ion-content fullscreen="false">
    <ion-grid style="margin: 0; padding: 0">
    <ion-row>
      <ion-col size="8">
        <ion-card-title
          style="
            text-align: center;
            font-size: 78px;
            font-weight: bold;
            margin: 8vh 1px 0;
          "
        >
          HIS APPS
        </ion-card-title>
        <ion-card-subtitle
          style="text-align: center; font-size: 24px; margin-bottom: 20px"
        >
          {{ version }}
        </ion-card-subtitle>
        <img
          src="/assets/images/report.png"
          style="display: block; width: 55%; margin: 5px auto"
        />
        <login-footer :showConfigBtn="showConfigBtn" :isPocSite="false"></login-footer>
      </ion-col>
      <ion-col
        size="4"
        style="
          background: #2839ad;
          color: #ffff;
          text-align: center;
          height: 100vh;
          padding: 38px 18px;
        "
      >
        <ion-icon :icon="avatar" style="font-size: 8vw; margin: 10vh 1px 0" />
        <h2>Welcome</h2>
        <h4>Please, log in to your account</h4>
        <ion-item style="margin: 2rem 3.5rem">
          <ion-input
            type="text"
            placeholder="Username"
            v-model="username"
            :min="5"
            required
          />
        </ion-item>
        <ion-item style="margin: 2rem 3.5rem">
          <ion-input
            type="password"
            v-model="password"
            placeholder="Password"
            @keyup.enter="login"
            :max="100"
            :min="5"
            required
          />
        </ion-item>
        <ion-button
          expand="full"
          size="large"
          style="margin: 2rem 3.5rem; text-transform: none"
          @click.prevent="login"
        >
          Login
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonRow } from "@ionic/vue";
import { person } from "ionicons/icons";
import LoginFooter from "@/components/LoginFooter.vue";

export default defineComponent({
  name: "DTLoginForm",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonInput,
    IonItem,
    IonCardTitle,
    IonCardSubtitle,
    LoginFooter
  },
  props: {
    showConfigBtn: {
      type: Boolean,
      default: false
    },
    version: {
      type: String,
      required: true,
    }
  },
  emits: ["login"],
  setup(_, { emit }) {
    const username = ref('')
    const password = ref('')
    
    const login = () => emit("login", {username: username.value, password: password.value})

    return {
      avatar: person,
      username,
      password,
      login
    }
  }
})
</script>