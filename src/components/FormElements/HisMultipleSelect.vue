<template>
  <view-port :showFull="!showKeyboard">
    <his-text-input  v-if="showKeyboard" :value="selected" @onValue="(value) => onKbValue(value, showKeyboard)" :disabled="false"/>
    <span v-for="(item, index) in checkedItems" :key="index"> 
      <ion-chip color="danger" @click="uncheck(item.label)">{{item.label}}</ion-chip>
    </span>
    <ion-list class='view-port-content'>
      <ion-item v-for="(entry, index) in filtered" :key="index" :color="entry.isChecked ? 'lightblue':''" :lines="entry.isChecked ? 'none':''">
        <ion-label> 
          <ion-text class="his-md-text">
            {{ entry.label }} 
          </ion-text>
          <ion-text
            :color="entry.description.color" 
            v-if="isDescription(entry.description, entry.isChecked)"> 
            <p><i>{{ entry.description.text }}</i></p>
          </ion-text>
        </ion-label>
        <ion-checkbox
          slot="start"
          v-model="entry.isChecked"
          @ionChange="(e) => onselect(entry, e)"
          :disabled="entry?.disabled"/>
      </ion-item>
    </ion-list>
    <!-- <ion-content style="width: 100%;" class="ion-padding-bottom">
      <div class="ion-content-scroll-host">
        
        <ion-infinite-scroll @ionInfinite="pushData($event)" :threshold="infiniteScroll.threshold" :disabled="!infiniteScroll.enabled" >
          <ion-infinite-scroll-content loading-spinner="crescent" loading-text="Loading more data..." />
        </ion-infinite-scroll>
      </div>
    </ion-content > -->
  </view-port>
  <his-keyboard v-if="showKeyboard" :kbConfig="keyboard" :onKeyPress="keypress"/>
</template>
<script lang="ts">
import { FooterBtnEvent, Option, OptionDescriptionInterface } from "../Forms/FieldInterface";
import { defineComponent } from "vue";
import { IonCheckbox, IonText, IonChip } from "@ionic/vue";
import SelectMixin from "@/components/FormElements/SelectMixin.vue"
import { isEmpty } from "lodash";

export default defineComponent({
  components: { IonCheckbox, IonText, IonChip},
  name: "HisMultipleSelect",
  mixins: [SelectMixin],
  methods: {
    async onselect(entry: Option, event: any){
      this.$nextTick(async ()=> {
        const option = {...entry}
        option.isChecked = event.target.checked
        if (typeof option?.other?.onEvent === 'function') {
          await option.other.onEvent(option.isChecked)
        } 

        if (this.onValue && option.isChecked) {
          const ok = await this.onValue(option, this.fdata, this.cdata)
          if (!ok) {
            return event.target.checked = false
          }
        }
        if (this.onValueUpdate) {
          this.listData = await this.onValueUpdate([...this.listData], option, this.fdata, this.cdata)
        }
        this.$emit('onValue', this.getChecked(this.listData))
      })
    },
    uncheck(label: string) {
      this.listData.forEach(option => {
        if (option.label === label) option.isChecked = false
      }) 
    },
    getChecked(list: Array<Option>) {
      return list.filter((item: Option) => item.isChecked)
    },
    isDescription(description: OptionDescriptionInterface, isChecked=false) {
      if (!description) 
        return false

      if (description?.show) {
          return (description.show === 'onChecked' && isChecked || description.show === 'always')
      }
      return true
    },
  },
  computed: {
    checkedItems(): Array<Option> {
      return this.getChecked(this.listData)
    }
  },
  watch: {
    clear(){
      this.listData = this.listData.map((item) => {
        item.isChecked = false
        return item
      })
    },
    footerButtonEvent: {
      async handler(event: FooterBtnEvent) {
        if (event && typeof event.onClickComponentEvents?.refreshOptions === 'function') {
          this.listData = await event.onClickComponentEvents?.refreshOptions(
            event, this.listData, this.fdata, this.cdata
          )
          this.$emit('onValue', this.getChecked(this.listData))
        }
      },
      deep: true,
      immediate: true
    }
  },
  async activated() {
    this.$emit('onFieldActivated', this)
    // Optionally Prevent from rebuilding options everytime the component is activated
    if (!isEmpty(this.listData) && this.config.buildOptionsOnce) {
      return
    }
    this.listData = await this.options(this.fdata, this.getChecked(this.listData), this.cdata, this.listData)
    this.$emit('onValue', this.getChecked(this.listData))
  }
});
</script>