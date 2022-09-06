<template>
  <view-port>
    <div class="view-port-content">
      <table class="his-sm-text">
        <tr>
          <th>Accession #</th>
          <th>Test Name</th>
          <th>Specimen</th>
          <th>Ordered</th>
          <th>Result</th>
          <th>Released</th>
          <th>Given</th>
        </tr>
        <tr v-for="(data, index) in rows" :key="index">
          <td><ion-button color="light" fill="none" @click="printOrder(data)">{{ data.accession_number }}</ion-button></td>
          <td>{{ data.test_name }}</td>
          <td>{{ data.specimen }}</td>
          <td>{{ data.ordered }}</td>
          <td>
            <span v-for="(d, i) in data.result" :key="i"> {{ d }} <br /></span>
          </td>
          <td>{{ data.released }}</td>
          <td> 
            <span :style="`color: ${data.result_given === 'Yes' ? 'green;' : 'black;'}`"> 
              {{ data.result_given }} 
            </span>
          </td>
        </tr>
      </table>
    </div>
  </view-port>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ViewPort from "@/components/DataViews/ViewPort.vue";
import { modalController } from "@ionic/vue";
import LabOrderModal from "@/components/DataViews/LabOrderModal.vue"
import { isEmpty } from "lodash";
import FieldMixinVue from "./FieldMixin.vue";
import HisDate from "@/utils/Date"
import { IonButton } from "@ionic/vue"
import { alertConfirmation } from "@/utils/Alerts";
export default defineComponent({
  components: { ViewPort, IonButton },
  mixins: [FieldMixinVue],
  data: () => ({
    HisDate,
    rows: [] as Array<any>,
  }),
  methods: {
    async init() {
      this.$emit('onFieldActivated', this)
        const items = await this.options(this.fdata);
        const rows = items[0].other.values;
        this.rows = rows.map((o: any) => {
          o.id = o.order_id
          if (o.ordered) {
            o.ordered = HisDate.toStandardHisDisplayFormat(o.ordered)
          }
          if (o.released) {
            o.released = HisDate.toStandardHisDisplayFormat(o.released)
          }
          return o
      })
    },
    async printOrder(data: any) {
      if (typeof this.config?.printOrder === 'function') {
        const ok = await alertConfirmation(`Do you want to print order with accession number ${data.accession_number}?`)
        if (ok) this.config.printOrder(data.id)
      }
    },
    formatOrders(rawOrders: Array<any>) {
      return rawOrders.map((d: any) => ({
          'id': d.order_id,
          'encounter_id': d.encounter_id,
          'result_given': d.result_given,
          'accession_number': d.accession_number,
          'test_name': d.tests[0].name,
          'specimen': d.specimen.name,
          'ordered': HisDate.toStandardHisDisplayFormat(d.order_date),
          'result': [],
          'release': ''
      }))
    },
    async launchOrderSelection(filters=null) {
      const modal = await modalController.create({
        component: LabOrderModal,
        backdropDismiss: false,
        cssClass: 'large-modal',
        componentProps: {
          testFilters: filters
        }
      })
      modal.present()
      const { data } = await modal.onDidDismiss()
      if (!isEmpty(data)) {
        this.rows = [...this.formatOrders(data), ...this.rows]
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
   this.init()
  }
})
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>