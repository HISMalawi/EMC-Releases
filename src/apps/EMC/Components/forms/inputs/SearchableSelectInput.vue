<template>
  <div
    style="min-height: 40px; padding: 0.5rem"
    @click="showOptions"
  >
    <span style="" v-if="input && input.label">{{ input.label }}</span>
    <span v-else style="color: #a3a3a3;">{{ placeholder }}</span>
    <ion-icon :icon="caretDown" style="color: #a3a3a3; float: right;"></ion-icon>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Option } from "@/components/Forms/FieldInterface";
import SearchableList from '@/apps/EMC/Components/modals/SearchableList.vue'
import { caretDown } from "ionicons/icons"
import { IonIcon, modalController } from '@ionic/vue'

export default defineComponent({
  name: "SearchableSelectInput",
  components: {
    IonIcon,
  },
  props: {
    modelValue: {
      type: Object as PropType<Option>,
      default: () => ({})
    },
    asyncOptions: {
      type: Function as PropType<(filter: string) => Promise<Option[]>>,
      required: false,
    },
    options: {
      type: Object as PropType<Option[]>,
      default: () => [],
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Select Items",
    },
    searchable: {
      type: Boolean,
      default: true,
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const input = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit("update:modelValue", value);
      }
    })
    const showOptions = async () => {
      const modal = await modalController.create({
        component: SearchableList,
        backdropDismiss: false,
        cssClass: 'custom-modal-backdrop ',
        componentProps: {
          asyncOptions: props.asyncOptions,
          options: props.options,
          title: props.placeholder,
          multiSelect: props.multiSelect,
          searchable: props.searchable
        }
      })

      modal.present()
      const { data } = await modal.onDidDismiss()
      if(data) input.value = data
    }
    return {
      input,
      caretDown,
      showOptions
    }
  },
})
</script>
