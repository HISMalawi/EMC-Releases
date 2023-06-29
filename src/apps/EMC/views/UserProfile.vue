<template>
  <ion-grid>
    <ion-row>
      <ion-col size="8">
        <div class="his-card">
          <ion-col size="12" class="ion-margin-vertical">
            <h2>User Profile</h2>
          </ion-col>
          <ion-row>
            <ion-col size="12" class="ion-margin-vertical">
              <text-input v-model="userForm.username" />
            </ion-col>
            <ion-col size="12" class="ion-margin-vertical">
              <SelectInput v-model="userForm.roles" :options="roles" multiple :key="refreshRoles" />
            </ion-col>
            <ion-col size="12" class="ion-margin-vertical">
              <TextInput v-model="userForm.givenName" />
            </ion-col>
            <ion-col size="12" class="ion-margin-vertical">
              <TextInput v-model="userForm.familyName" />
            </ion-col>
            <ion-col size="12" class="ion-margin-vertical">
              <IonButton class="ion-margin-end ion-margin-vertical ion-float-right" @click="updateProfile">Save</IonButton>
            </ion-col>
          </ion-row>
        </div>
      </ion-col>
       <ion-col size="4">
        <div class="his-card">
          <ion-col size="12" class="ion-margin-vertical">
            <h2>Change Password</h2>
          </ion-col>
          <ion-row>
            <ion-col size="12" class="ion-margin-vertical ">
              <TextInput v-model="passwordForm.password" password />
            </ion-col>
            <ion-col size="12" class="ion-margin-vertical">
              <TextInput v-model="passwordForm.confirmPassword" :form="passwordForm" password />
            </ion-col>
            <ion-col size="12" class="ion-margin-vertical">
              <IonButton class="ion-margin-end ion-margin-vertical ion-float-right" @click="updatePassword">Save</IonButton>
            </ion-col>
          </ion-row>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/vue";
import TextInput from "@/apps/EMC/Components/inputs/TextInput.vue";
import SelectInput from "@/apps/EMC/Components/inputs/SelectInput.vue";
import { DTForm } from "@/apps/EMC/interfaces/dt_form_field";
import get from "lodash/get";
import { Option } from "@/components/Forms/FieldInterface";
import { UserService } from "@/services/user_service";
import { Role } from "@/interfaces/role";
import { submitForm } from "@/apps/EMC/utils/form";
import { toastSuccess } from "@/utils/Alerts";
import { User } from "@/interfaces/user";

export default defineComponent({
  name: "UserModal",
  components: {
    IonButton,  
    IonGrid,
    IonRow,
    IonCol,  
    TextInput,
    SelectInput,
  },

  setup(){
    const roles = ref<Option[]>([]);
    const userId = ref<number>(-1);
    const refreshRoles = ref(1)

    const passwordForm = reactive<DTForm>({
      password: {
        value: "",
        label: 'New Password',
        required: true,
        validation:async ({value}) => {
          if(value && `${value}`.length < 6){
            return ['Password must be at least 6 characters long']
          }
          return null
        }
      },
      confirmPassword: {
        value: "",
        label: 'Confirm New Password',
        required: true,
        validation: async ({value}, form) => {
          if (value && value !== form.password.value) {
            return ["Passwords do not match"];
          }
          return null;
        }
      },
    });

    const userForm = reactive<DTForm>({
      givenName: {
        value: '',
        label: 'First Name',
        required: true,
      },
      familyName: {
        value: '',
        label: 'Last Name',
        required: true,
      },
      username: {
        value: '',
        label: 'Username',
        disabled: true,
      },
      roles: {
        value: [],
        label: 'Roles',
        required: true,
      },
    });

    const initUser = async () => {
      const authUser = await UserService.getCurrentUser();
      if(authUser){
        userId.value = authUser.user_id;
        userForm.username.value = authUser.username;
        userForm.givenName.value = get(authUser, 'person.names[0].given_name', '')
        userForm.familyName.value = get(authUser, 'person.names[0].family_name', '')
        userForm.roles.value = authUser.roles.map(r => ({
          value: r.role,
          label: r.role,
          other: r,
        }))
      }
    }

    const updateProfile = () => submitForm(userForm, async (user) => {
      const u: User = await UserService.updateUser(userId.value, {...user, roles: user.roles.map((r: Option) => r.label)});
      sessionStorage.setItem("username", u.username);
      sessionStorage.setItem("userRoles", JSON.stringify(u.roles));
      toastSuccess('User profile has been updated successfully', 3000);
      initUser()
    })

    const updatePassword = () => submitForm(passwordForm, async (password) => {
      await UserService.updateUser(userId.value, password);
      toastSuccess('Password updated successfully', 3000);
      for (const k in passwordForm) passwordForm[k].value = ''
    })

    onMounted(async () => {
      await UserService.getAllRoles().then((userRoles: Role[]) => {
        roles.value =  userRoles.map(r => ({
          value: r.role,
          label: r.role,
          other: r,
        }));
      });
      await initUser()
      refreshRoles.value++;
    })

    return {
      userForm,
      passwordForm,
      roles,
      refreshRoles,
      updateProfile,
      updatePassword,
    }
  }
})
</script>