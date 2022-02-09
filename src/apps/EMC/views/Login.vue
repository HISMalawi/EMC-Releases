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
              :src="logo"
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
            <ion-icon
              :icon="avatar"
              style="font-size: 8vw; margin: 10vh 1px 0"
            />
            <h2>Welcome back!</h2>
            <h4>Please, log in to your account</h4>
            <ion-item style="margin: 2rem 3.5rem">
              <ion-input
                type="text"
                inputmode="text"
                v-model="username"
                placeholder="Username"
                :max="100"
                :min="5"
              />
            </ion-item>
            <ion-item style="margin: 2rem 3.5rem">
              <ion-input
                type="password"
                inputmode="text"
                v-model="password"
                placeholder="Password"
                :max="100"
                :min="5"
              />
            </ion-item>
            <ion-button
              expand="full"
              size="large"
              style="margin: 2rem 3.5rem; text-transform: none"
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
import { defineComponent } from "vue";
// import Form from "@/components/Forms/DesktopForms/DesktopForm.vue";
import { DtFieldInterface } from "@/components/Forms/DesktopForms/DTFieldInterface";
import { DTFieldType } from "@/components/Forms/DesktopForms/DTFormElements";
import Validation from "@/components/Forms/validations/StandardValidations";
import { Option } from "@/components/Forms/FieldInterface";
import { person } from "ionicons/icons";

export default defineComponent({
  name: "Login",
  data: () => ({
    fields: [] as DtFieldInterface[],
    logo: "/assets/images/report.png",
    avatar: person,
    username: "",
    password: "",
  }),
  methods: {
    onfinish(f: any, c: any) {
      console.log(f, c);
    },
  },
  created() {
    this.fields = [
      {
        id: "username",
        helpText: "Username",
        type: DTFieldType.DT_TEXT,
        validation: (val: Option | Option[] | null) => Validation.isName(val),
        required: true,
      },
      {
        id: "password",
        type: DTFieldType.DT_TEXT,
        helpText: "Password",
        required: true,
        validation: (val: Option | Option[] | null) => Validation.isName(val),
      },
    ];
  },
});
</script>
