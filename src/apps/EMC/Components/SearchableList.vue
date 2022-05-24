<template>
  <ion-header>
    <ion-title class="ion-text-center ion-margin-vertical">{{ title }}</ion-title>
  </ion-header>
  <ion-content>
    <ion-grid style="width: 100%; padding: 0">
      <ion-row v-if="searchable">
        <ion-col>
          <ion-searchbar 
            class="box-input ion-no-margin ion-no-padding"
            v-model="searchText"
            placeholder="Search here"
          />
        </ion-col>
      </ion-row>
      <ion-row class="list">
        <ion-col>
          <ion-list>
            <ion-radio-group v-model="selectedItem">
              <ion-item v-for="(item, index) in filteredList" :key="index">
                <ion-label>{{ item.label }}</ion-label>
                <ion-radio :value="item" slot="start"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-list>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer class="ion-padding-horizontal">
    <ion-toolbar>
      <ion-button slot="end" :disabled="!selectedItem" @click="onConfirm">confirm</ion-button>
      <ion-button  color="danger" @click="onCancel">Cancel</ion-button>
    </ion-toolbar>
  </ion-footer>
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
    searchable: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    IonCol,
    IonRow,
    IonItem,
    IonLabel,
    IonList,
    IonRadio,
    IonRadioGroup,
  },
  setup(props) {
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
      await getFilteredList('');
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