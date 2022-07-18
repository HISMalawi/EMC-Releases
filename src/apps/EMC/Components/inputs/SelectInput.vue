<template>
  <ion-label class=" ion-padding-bottom bold" v-if="model.label"> 
    <span>{{ model.label }}</span>
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
    :disabled="model.disabled"
    style="background-color: #fff; width: 100%; height: 2.5rem; padding: 0.5rem;" 
    @click="showOptions"
  >
    <span style="" v-if="selectedOption?.label">{{ selectedOption?.label }}</span>
    <span v-else style="color: #a0a0a0;">{{ model.placeholder || 'select item' }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" style="float: right; margin: 0.3rem;">
      <path
        d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
      />
    </svg>
  </div>
  <select 
    v-else
    v-model="model.value" 
    class="ion-margin-top"
    :class="model.error ? 'box-input-error'  : 'box-input'"
    style="background-color: #fff; width: 100%; height: 2.5rem;"
    :style="model.value ? {'color': '#000'} : {'color': '#a0a0a0'}"
    :disabled="model.disabled"
    @focus="() => model.error = ''"
    @blur="validate"
  >
    <option :value="0" disabled selected hidden>{{ model.placeholder || 'select item' }}</option>
    <option v-for="(item, i) in options" :value="item.value" :key="i">{{ item.label }}</option>
  </select>
  <ion-note v-if="model.error" color="danger">{{ model.error }}</ion-note>
</template>
<script lang="ts">
import { IonCheckbox, IonInput, IonLabel, IonNote, modalController } from "@ionic/vue";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { DTForm, DTFormField } from "../../interfaces/dt_form_field";
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
    form: {
      type: Object as PropType<DTForm>,
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  components: {
    IonLabel,
    IonInput,
    IonNote,
    // IonIcon,
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
        const errors = await model.value.validation({label: model.value.value, value: model.value.value}, props.form);
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

    onMounted(() => {
      if (model.value.value) {
        const defaultOption = props.options.find(option => option.value === model.value.value)
        if (defaultOption) {
          selectedOption.value = defaultOption
        }else {
          selectedOption.value = {
            label: model.value.value,
            value: model.value.value
          }
        }
      } else {
        model.value.value = 0
      }
    });

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

<style>
  path {
    fill: #a3a3a3;
  }
</style>