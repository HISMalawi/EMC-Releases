<template>
  <div
    style="min-height: 40px; padding: 0.5rem"
    :value="value"
    @click="showOptions"
  >
    <span style="" v-if="value">{{ value }}</span>
    <span v-else style="color: #a3a3a3;">{{ placeholder }}</span>
    <ion-icon :icon="caretDown" style="color: #a3a3a3; float: right;"></ion-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Option } from "@/components/Forms/FieldInterface";
import SearchableList from '@/apps/EMC/Components/SearchableList.vue'
import { caretDown } from "ionicons/icons"
import { IonIcon, modalController } from '@ionic/vue'

export default defineComponent({
  name: "SearchableSelectInput",
  components: {
    IonIcon,
  },
  props: {
    value: {
      type: String,
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
  emits: ["onSelect"],
  setup(props, { emit }) {
    const showOptions = async () => {
      const modal = await modalController.create({
        component: SearchableList,
        backdropDismiss: false,
        cssClass: '',
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
      if(data) emit("onSelect", data)
    }
    return {
      caretDown,
      showOptions
    }
  },
})
</script>
