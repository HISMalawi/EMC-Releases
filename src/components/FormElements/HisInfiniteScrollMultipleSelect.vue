<template>
  <view-port :showFull="!showKeyboard">
    <his-text-input v-if="showKeyboard" :value="selected" @onValue="onKBValue"/>
    <ion-chip color="danger" v-for="(item, index) in checkedItems" :key="index" @click="unCheck(item)">
      {{ item.label }}
    </ion-chip>
    <ion-content style="width: 100%;" class="ion-padding-bottom">
      <div class="ion-content-scroll-host" :class="{'ion-margin-bottom ion-padding-bottom': disableScroll}">
        <ion-list class='view-port-content' :class="{'ion-margin-bottom': disableScroll}">
          <ion-item v-for="(entry, index) in listData" :key="index" :color="entry.isChecked ? 'lightblue':''" :lines="entry.isChecked ? 'none':''">
            <ion-label> 
              <ion-text class="his-md-text">{{ entry.label }} </ion-text>
              <ion-text :color="entry.description?.color" v-if="entry.description && entry.isChecked"> 
                <p><i>{{ entry.description.text }}</i></p>
              </ion-text>
            </ion-label>
            <ion-checkbox
              slot="start"
              v-model="entry.isChecked"
              @ionChange="onSelect(entry, $event)"
              :disabled="entry.disabled"
            />
          </ion-item>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="pushData($event)" threshold="100px" :disabled="disableScroll" >
          <ion-infinite-scroll-content loading-spinner="crescent" loading-text="Loading more data..." />
        </ion-infinite-scroll>
      </div>
    </ion-content >
  </view-port>
  <his-keyboard v-if="showKeyboard" :kbConfig="keyboard" :onKeyPress="keypress"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Option } from "../Forms/FieldInterface";
import { QWERTY } from "../Keyboard/HisKbConfigurations";
import ViewPort from "../DataViews/ViewPort.vue";
import handleVirtualInput from "@/components/Keyboard/KbHandler"
import HisTextInput from "@/components/FormElements/BaseTextInput.vue";
import FieldMixinVue from './FieldMixin.vue';
import HisKeyboard from "@/components/Keyboard/HisKeyboard.vue"
import { clone, cloneDeep, isEmpty } from "lodash";
import { 
  IonCheckbox, 
  IonText, 
  IonChip, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInfiniteScroll, 
  IonInfiniteScrollContent 
} from "@ionic/vue";

export default defineComponent({
  name: "HisInfiniteScrollMultipleSelect",
  mixins: [FieldMixinVue],
  components: { 
    IonCheckbox, 
    IonText, 
    IonChip,
    ViewPort,
    HisTextInput,
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    HisKeyboard,
    IonInfiniteScroll, 
    IonInfiniteScrollContent 
  },
  data: () => ({
    showKeyboard: false,
    keyboard: QWERTY,
    listData: [] as Array<Option>,
    disableScroll: false,
    filter: '',
    selected: '',
    page: 1,
    limit: 10,
  }),
  watch: {
    checkedItems: {
      handler(newValue) {
        this.$emit("onValue", newValue);
      },
      deep: true,
    },
    listData: {
      handler(newValue: Array<Option>) {
        this.checkedItems = newValue.filter(item => item.isChecked);
      },
      deep: true,
      immediate: true,
    },
    filter: {
      async handler() {
        this.page = 1;
        this.disableScroll = false;
        const checkedItems = new Array(...this.checkedItems);
        const data = await this.getListData();
        for (const checkedItem of checkedItems) {
          const index = data.findIndex(i => checkedItem.value === i.value);
          if (index > -1) {
            data[index].isChecked = true;
          } else {
            data.push({...checkedItem});
          }
        }
        this.listData = data
      },
      deep: true,
    },
  },
  computed: {
    checkedItems() {
      return this.listData.filter(item => item.isChecked);
    },
  },
  methods: {
    async getListData(): Promise<Array<Option>> {
      console.log('getListData using filters: ', this.filter, this.page, this.limit);
      return await this.options(this.fdata, this.filter, this.page, this.limit);
    },
    async keypress(value: string) {
      if (!this.filter) this.selected = ''
      this.filter = handleVirtualInput(value, this.selected)
      this.selected = this.filter
    },
    async onKBValue(value: string) {
      if (!this.listData || this.selected === value) return
      this.filter = value
      this.selected = this.filter
    },
    async pushData(event: any) {
      this.page++;
      const data = await this.getListData();
      console.log('pushData: ', data);
      if (data.length > 0) {
        this.listData.push(...data);
      } else {
        this.disableScroll = true;
      }
      event.target.complete();
    },
    onSelect(entry: Option, event: Event) {
      if ((event.target as HTMLInputElement).checked) {
        this.listData = this.listData.map(item => item.value === entry.value ? {...item, isChecked: true} : item)
      } else {
        this.unCheck(entry)
      }
    },
    unCheck(entry: Option) {
      this.listData = this.listData.map(item => item.value === entry.value ? {...item, isChecked: false} : item)
    },
  },
  created() {
    this.showKeyboard = this.config?.showKeyboard ?? false;
    this.keyboard = this.config?.keyboard ?? QWERTY;
    this.page = this.config?.page ?? 1;
    this.limit = this.config?.limit ?? 10;
  },
  async activated() {
    this.$emit('onFieldActivated', this);
    this.listData = await this.getListData();
  }
});
</script>