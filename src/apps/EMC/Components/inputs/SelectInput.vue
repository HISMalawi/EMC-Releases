<template>
  <ion-label class=" ion-padding-bottom bold" v-if="model.label"> 
    <span></span>{{ model.label }}
    <span class="ion-float-right ion-margin-end checkbox-label" v-if="allowCustom">
      Add Custom {{ model.label }}?
      <ion-checkbox v-model="isCustom" @ionChange="model.value = ''"></ion-checkbox>
    </span>
  </ion-label>
  <ion-input
    v-if="isCustom"
    class="ion-margin-top"
    :class="model.error ? 'box-input-error'  : 'box-input'"
    v-model="model.value"
    :placeholder="model.placeholder || model.label"
    :disabled="model.disabled"
    @ionFocus="() => model.error = ''"
    @ionBlur="validate"
  />
  <div v-else-if="searchable"
    class="ion-margin-top" 
    :class="model.error ? 'box-input-error'  : 'box-input'" 
    style="background-color: #fff; width: 100%; height: 2.5rem; padding: 0.5rem;" 
    @click="showOptions"
  >
    <span style="" v-if="selectedOption?.label">{{ selectedOption?.label }}</span>
    <span v-else style="color: #a0a0a0;">{{ model.placeholder || 'select item' }}</span>
    <!-- <span style="font-size: x-small; color: #a3a3a3; float: right; transform: rotate(-90deg);">&lt;</span> -->
    <ion-icon :icon="caretDown" style="color: #a3a3a3; float: right;" mode="ios"></ion-icon>
  </div>
  <select 
    v-else
    v-model="model.value" 
    class="ion-margin-top" 
    :class="model.error ? 'box-input-error'  : 'box-input'"
    style="background-color: #fff; width: 100%; height: 2.5rem;"
    :style="model.value ? {'color': '#000'} : {'color': '#a0a0a0'}"
    @focus="() => model.error = ''"
    @blur="validate"
  >
    <option :value="0" disabled selected hidden>{{ model.placeholder || 'select item' }}</option>
    <option v-for="(item, i) in options" :value="item.value" :key="i">{{ item.label }}</option>
  </select>
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonCheckbox, IonIcon, IonInput, IonLabel, IonNote, modalController } from "@ionic/vue";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { DTFormField } from "../../interfaces/dt_form_field";
import { Option } from '@/components/Forms/FieldInterface';
import { caretDown, arrowDownOutline } from "ionicons/icons"
import SearchableList from '@/apps/EMC/Components/modals/SearchableList.vue'

export default defineComponent({
  name: "SelectInput",
  props: {
    modelValue: {
      type: Object as PropType<DTFormField>,
      default: () => ({}),
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    asyncOptions: {
      type: Function as PropType<(filter: string) => Promise<Option[]>>,
      required: false,
    },
    allowCustom: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonLabel,
    IonInput,
    IonNote,
    IonIcon,
    IonCheckbox,
  },
  emits: ["update:modelValue"],
  setup(props, { emit}) {
    const isCustom = ref(false);
    const selectedOption = ref<Option>();
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    })

    const validate = async () => {
      if (model.value.required && !model.value.value) {
        return model.value.error = "This field is required";
      }
      if (model.value.validation) {
        const errors = await  model.value.validation({label: model.value.value, value: model.value.value});
        if (errors && errors.length) {
          return model.value.error += errors.toString();
        }
      }
      return model.value.error = "";
    };

    const showOptions = async () => {
      const modal = await modalController.create({
        component: SearchableList,
        backdropDismiss: false,
        cssClass: 'custom-modal-backdrop ',
        componentProps: {
          asyncOptions: props.asyncOptions,
          options: props.options,
          title: model.value.label,
          searchable: props.searchable
        }
      })

      modal.present()
      const { data } = await modal.onDidDismiss()
      if(data) {
        selectedOption.value = data
        model.value.value = data.value
        validate()
      }
    }

    onMounted(() => model.value.value = 0);

    return {
      validate,
      showOptions,
      model,
      isCustom,
      caretDown,
      arrowDownOutline,
      selectedOption,
    };
  }
});
</script>