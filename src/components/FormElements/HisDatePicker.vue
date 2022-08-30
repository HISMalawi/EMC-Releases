<template>
  <view-port>
    <div class="view-port-content">
      <ion-grid>
        <ion-row>
          <ion-col size="9">
            <DatePicker 
              color="blue"
              ref="calendar"
              is-expanded  
              v-model="date"
              :max-date="maxDate"
              class="custom-calendar"
            />
          </ion-col>
          <ion-col size="3">
            <ion-list>
              <ion-item class="his-sm-text" v-for="(item, index) in infoItems" :key="index"> 
                <ion-label>{{item.label}}</ion-label>
                <b>{{item.value}}</b>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </view-port>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ViewPort from "@/components/DataViews/ViewPort.vue";
import { IonGrid, IonCol, IonRow, IonList, IonItem, IonLabel } from "@ionic/vue";
import { DatePicker } from "v-calendar";
import HisDate from "@/utils/Date"
import FieldMixinVue from "./FieldMixin.vue";
import { Option } from "@/components/Forms/FieldInterface"

export default defineComponent({
  components: { 
    DatePicker, 
    ViewPort, 
    IonGrid, 
    IonCol, 
    IonRow,
    IonLabel,
    IonList, 
    IonItem 
  },
  mixins: [FieldMixinVue],
  data: () => ({
    date: '',
    infoItems: [] as Option[],
    selectedDates: {} as Record<string, Option[]>
  }),
  watch: {
    date: {
      async handler(date: string) {
        if (date) {
          const formatedDate: string = HisDate.toStandardHisFormat(date)
          if (this.onValue) {
            const ok = await this.onValue(formatedDate, this)
            if (!ok) return
          }
          this.$emit('onValue', formatedDate)
          if (typeof this.config.infoItems === 'function') {
            if (this.selectedDates[formatedDate]) {
              this.infoItems = this.selectedDates[formatedDate]
            } else {
              this.infoItems = await this.config.infoItems(formatedDate) || []
              this.selectedDates[formatedDate] = this.infoItems
            }
          }
        }
      },
      immediate: true
    }
  },
  async created() {
    if (!this.date && typeof this.defaultValue === 'function') {
      this.date = await this.defaultValue()
    }
  },
  mounted() {
    this.$emit('onFieldActivated', this)
  },
  activated(){
    this.$emit('onFieldActivated', this)
  }
})
</script>
<style>
.view-port-content {
  background: #fff;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}

.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 80px;
  --day-height: 82px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0 !important;
  width: 100%;
}
.custom-calendar.vc-container .vc-header {
  background-color: #f1f5f8;
  padding: 10px 0;
}
.custom-calendar.vc-container .vc-weeks {
  padding: 0;
}
.custom-calendar.vc-container .vc-weekday {
  background-color: var(--weekday-bg);
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px;
}
.custom-calendar.vc-container .vc-day {
    padding: 30px 5px 3px 5px;
    text-align: center;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
  }
.custom-calendar.vc-container .vc-day.weekday-1,
    .custom-calendar.vc-container .vc-day.weekday-7 {
      background-color: #eff8ff;
    }
.custom-calendar.vc-container .vc-day:not(.on-bottom) {
      border-bottom: var(--day-border);
    }
.custom-calendar.vc-container .vc-day:not(.on-bottom).weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
.custom-calendar.vc-container .vc-day:not(.on-right) {
      border-right: var(--day-border);
    }
.custom-calendar.vc-container .vc-day-dots {
    margin-bottom: 5px;
  }
.custom-calendar.vc-container .vc-highlight,
.custom-calendar.vc-container .vc-highlights .vc-day-layer {
  border-radius: 0 !important;
  padding: 0 !important;
  background: #3182ce !important;
  color: #ffffff;
}
.selected{
  font-size: 3vh;
  height: 100%;
  margin-top: 0 !important;
  color: white;
  text-align: center;
}
.appointments {
  position: absolute;
  top: 15px;
  right: 5px;
  color: greenyellow;
}
</style>
