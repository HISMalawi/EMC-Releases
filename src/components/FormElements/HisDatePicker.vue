<template>
  <view-port>
    <div class="view-port-content">
      <ion-grid>
        <ion-row>
          <ion-col size="8">
            <DatePicker 
              is-expanded
              color="blue"
              ref="calendar"
              modelValue=""
              :min-date="minDate"
              :max-date="maxDate"
              :attributes="[
                {
                  highlight: true,
                  dates: [date]
                }
              ]"
              disable-page-swipe
              class="custom-calendar"
            >
              <template v-slot:day-content="{ day }">
                <div
                  v-bind:class="{
                    selected: day.id === date,
                    isDisabled: day.isDisabled
                  }"
                  class="his-md-text"
                  @click="!day.isDisabled && select(day.id)"
                >
                  <span><b>{{ day.day }}</b></span>
                  <sup v-if="dateSupValues[day.id]" class="sup-value">
                    <b>{{ dateSupValues[day.id] }}</b>
                  </sup>
                </div>
              </template>
            </DatePicker>
          </ion-col>
          <ion-col size="4">
            <ion-list class="his-card">
              <ion-item class="his-sm-text" v-for="(item, index) in (dateInfoItems[date] || [])" :key="index"> 
                <ion-label class="ion-text-wrap">
                  <b>{{item.label}}</b>
                  <p/>
                  <span>{{item.value}}</span>
                </ion-label>
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
    minDate: '' as string,
    maxDate: '' as string,
    dateInfoItems: {} as Record<string, Option[]>,
    dateSupValues: {} as Record<string, number | string>
  }),
  async created() {
    if (!this.date && typeof this.defaultValue === 'function') {
      this.select((await this.defaultValue()))
    }
    if (typeof this.config.minDate === 'function') {
      this.minDate = this.config.minDate(this.fdata)
    }
    if (typeof this.config.maxDate === 'function') {
      this.maxDate = this.config.maxDate(this.fdata)
    }
  },
  methods: {
    async select(date: string) {
      this.date = HisDate.toStandardHisFormat(date)

      if (typeof this.onValue === 'function') {
        if (!(await this.onValue(this.date, this))) {
          this.date = ''
          return
        } 
      }

      this.$emit('onValue', this.date)
      const calendar: any = this.$refs.calendar
      calendar.move(this.date).then(() => { calendar.focusDate(this.date); })

      if (typeof this.config.infoItems === 'function') {
        if (!this.dateInfoItems[this.date]) {
          this.dateInfoItems[this.date] = await this.config.infoItems(this.date) || []
        }
      }
      if (typeof this.config.supValue === 'function') {
        if (!this.dateSupValues[this.date]) {
          this.dateSupValues[this.date] = await this.config.supValue(this.date, this.fdata)
        }
      }
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
  --day-border: 1px solid #414142;
  --day-border-highlight: 1px solid #93979b;
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
.custom-calendar.vc-container .vc-day-content {
  padding: 50px;
  background: none;
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
.selected{
  font-size: 3vh;
  height: 100%;
  margin-top: 0 !important;
  color: white;
  text-align: center;
}
.sup-value {
  position: absolute;
  top: 15px;
  right: 5px;
  color: greenyellow;
}
</style>

