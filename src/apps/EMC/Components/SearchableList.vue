<template>
  <ion-grid style="width: 100%; padding: 0">
    <ion-row>
      <ion-col>
        <ion-title class="ion-text-center ion-margin-vertical">{{ title }}</ion-title>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-input
          class="box-input"
          v-model="searchText"
          type="text"
          placeholder="Search here"
        ></ion-input>
      </ion-col>
    </ion-row>
    <ion-row class="list">
      <ion-col>
        <ion-list>
          <ion-radio-group v-model="selectedItem">
            <ion-item v-for="(item, index) in filteredList" :key="index">
              <ion-label>{{ item.label }}</ion-label>
              <ion-radio :value="item"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row style="border-top: 1px solid #a3a3a3; ">
      <ion-col>
        <ion-button class="ion-float-end ion-margin-end" :disabled="!selectedItem" @click="onConfirm">confirm</ion-button>
        <ion-button  color="danger" @click="onCancel">Cancel</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { Option } from "@/components/Forms/FieldInterface";
import {
  IonCol,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonRadioGroup,
  IonRadio,
  modalController,
} from "@ionic/vue";
export default defineComponent({
  name: "SearchableList",
  props: {
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
    title: {
      type: String,
      default: "Select Items",
    },
  },
  components: {
    IonCol,
    IonRow,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonRadio,
    IonRadioGroup,
  },
  emits: ["onSelect"],
  setup(props, { emit }) {
    const filteredList = ref<Option[]>();
    const searchText = ref("");
    const selectedItem = ref<Option>();

    const getFilteredList = async (filter = "") => {
      const tmpList = (typeof props.asyncOptions === "function")
        ? await props.asyncOptions(filter)
        : props.options.filter((item) =>
            item.label.toLowerCase().includes(filter.toLowerCase())
          );
      filteredList.value = tmpList.filter(item => item.label)
    };

    watch(searchText, (text) => getFilteredList(text));

    const onConfirm = () => {
      modalController.dismiss(selectedItem.value)
    }

    const onCancel = () => {
      modalController.dismiss()
    }

    onMounted(async () => {
      await getFilteredList('a');
    });

    return {
      filteredList,
      searchText,
      selectedItem,
      onConfirm,
      onCancel,
    };
  },
});
</script>

<style scoped>
.list {
  height: 420px;
  overflow-y: scroll;
}
</style>y