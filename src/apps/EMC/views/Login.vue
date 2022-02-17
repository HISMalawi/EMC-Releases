<template>
  <ion-app style="background: #ffff">
    <ion-page>
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
              version 5.0.0
            </ion-card-subtitle>
            <img
              src="/assets/images/report.png"
              style="display: block; width: 55%; margin: 5px auto"
            />
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
                v-model="auth.username"
                :min="5"
                required
              />
            </ion-item>
            <ion-item style="margin: 2rem 3.5rem">
              <ion-input
                type="password"
                v-model="password"
                placeholder="Password"
                :max="100"
                :min="5"
                required
              />
            </ion-item>
            <ion-button
              expand="full"
              size="large"
              style="margin: 2rem 3.5rem; text-transform: none"
              @click.prevent="submit"
            >
              Login
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-page>
  </ion-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { person } from "ionicons/icons";
import { AuthService, InvalidCredentialsError } from "@/services/auth_service";
import HisApp from "@/apps/app_lib"
import { useRouter } from "vue-router";
import { toastWarning, toastDanger } from "@/utils/Alerts";
import { IonApp, IonPage, IonGrid, IonRow, IonCol, IonButton, IonItem, IonInput } from "@ionic/vue";

export default defineComponent({
  name: "Login",
  components: { IonApp, IonPage, IonGrid, IonRow, IonCol, IonButton, IonItem, IonInput },
  setup () {
    const auth = ref(new AuthService())
    const router = useRouter()
    const password = ref('')
    const submit = async () => {
      if (auth.value.username && password.value) {
        try {
          await auth.value.login(password.value)
          auth.value.startSession()
          router.push('/emc/home')
          // const app = await HisApp.selectApplication()
          // if (app) {
          //   app.isPocApp 
          //     ? router.push("/select_")
          //     : app.appLandingPage 
          //     ? router.push(app.appLandingPage)
          //     : null
          // }
        } catch (e) {
          if (e instanceof InvalidCredentialsError ) {
            toastWarning("Invalid username or password");
          } else {
            toastDanger(e)
          }
        }
      } else {
        toastWarning("Complete form to log in");
      }
    }

    return {
      password,
      auth,
      submit,
      avatar: person
    }
  },
});
</script>
