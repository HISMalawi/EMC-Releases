<template>
<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="end">
        <IonButton slot="end" @click="modal.hide()" icon-only>
          <IonIcon :icon="close"></IonIcon>
        </IonButton>
      </IonButtons>
      <IonTitle>{{ title }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <ion-grid>
      <ion-row>
        <ion-col size="12" class="ion-margin-vertical">
          <text-input v-model="form.username" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <TextInput v-model="form.password" password />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <TextInput v-model="form.confirmPassword" :form="form" password />
        </ion-col>
        <ion-col size="12" class="ion-margin-vertical">
          <SelectInput v-model="form.roles" :options="roles" multiple searchable />
        </ion-col>
        <ion-col size="12" class="ion-margin-vertical">
          <TextInput v-model="form.givenName" />
        </ion-col>
        <ion-col size="12" class="ion-margin-vertical">
          <TextInput v-model="form.familyName" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </IonContent>
  <IonFooter>
    <IonButton class="ion-margin-end ion-margin-vertical ion-float-end" @click="submit">Save</IonButton>
    <IonButton class="ion-margin-vertical ion-float-end" color="light" @click="modal.hide()">Close</IonButton>
  </IonFooter>
</IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { IonButton, IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonFooter, IonTitle, IonIcon } from "@ionic/vue";
import { close } from "ionicons/icons";
import { modal } from "@/utils/modal";
import { User } from "@/interfaces/user";
import TextInput from "../inputs/TextInput.vue";
import SelectInput from "../inputs/SelectInput.vue";
import { DTForm } from "../../interfaces/dt_form_field";
import get from "lodash/get";
import { Option } from "@/components/Forms/FieldInterface";
import { UserService } from "@/services/user_service";
import { Role } from "@/interfaces/role";
import { isValidForm, resolveFormValues } from "../../utils/form";
import { loader } from "@/utils/loader";
import { isEmpty } from "lodash";
import { toastSuccess } from "@/utils/Alerts";

export default defineComponent({
  name: "UserModal",
  components: {
    IonButton,
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonButtons,
    IonFooter,
    IonTitle,
    IonIcon,
    TextInput,
    SelectInput
  },
  props: {
    user: {
      type: Object as PropType<User>,
      default: () => ({}),
    },
  },
  setup(props){
    const roles = ref<Option[]>([]);
    const title = computed(() => {
      return isEmpty(props.user) ? "Add New User" : "Edit User"
    })

    const form = reactive<DTForm>({
      givenName: {
        value: get(props.user, 'person.names[0].given_name', ''),
        label: 'First Name',
        required: true,
      },
      familyName: {
        value: get(props.user, 'person.names[0].family_name', ''),
        label: 'Last Name',
        required: true,
      },
      username: {
        value: get(props.user, 'username', ''),
        label: 'Username',
        required: true,
        disabled: !isEmpty(props.user),
        validation:async (username) => {
          if(`${username.value}`.length < 4){
            return ['Username must be at least 4 characters long']
          }
          return null
        }
      },
      password: {
        value: "",
        label: 'Password',
        required: isEmpty(props.user),
        validation:async ({value}) => {
          if(value && `${value}`.length < 6){
            return ['Password must be at least 6 characters long']
          }
          return null
        }
      },
      confirmPassword: {
        value: "",
        label: 'Confirm Password',
        required: isEmpty(props.user),
        validation: async ({value}, form) => {
          if (value && value !== form.password.value) {
            return ["Passwords do not match"];
          }
          return null;
        }
      },
      roles: {
        value: props.user?.roles?.map((r) => ({ label: r.role, value: r.role, other: r})) || [],
        label: 'Roles',
        placeholder: "Select Roles",
        required: true,
      },
    });

    const submit = async () => {
      if(!(await isValidForm(form))) return
      loader.show();
      const { formData } = resolveFormValues(form, true);
      const user = {...formData, roles: formData.roles.map((r: Option) => r.label)} 
      console.log(formData, user)
      if(isEmpty(props.user)){
        await UserService.createUser(user);
        toastSuccess('User created successfully');
      } else {
        await UserService.updateUser(props.user['user_id'], user);
        toastSuccess('User updated successfully');
      }
      loader.hide();
      modal.hide();
    }

    onMounted(() => {
      UserService.getAllRoles().then((userRoles: Role[]) => {
        roles.value = userRoles.map(r => ({
          value: r.role,
          label: r.role,
          other: r,
        }));
      });
    })

    return {
      form,
      close,
      modal,
      roles,
      title,
      submit,
    }
  }
})
</script>