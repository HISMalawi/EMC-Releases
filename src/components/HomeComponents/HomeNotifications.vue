<template>
    <div v-if="!hasNotifications"
        class="his-card ion-text-center his-lg-text"> 
        No notifications
    </div>
    <div class="button-container" v-if="hasNotifications">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-button
            class="custom-button"
            :class="{ active: isActive('highvl') }"
            @click="onselect('highvl')"
          >
            <span class="button-text">High VL</span>
            <ion-badge class="badge" color="danger">{{ sortedNotifications[0]['vlMessageObs']['highVL'].length}}</ion-badge>
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button
            class="custom-button"
            :class="{ active: isActive('rejected') }"
            @click="onselect('rejected')"
          >
            <span class="button-text">Rejected</span>
            <ion-badge class="badge" color="danger">{{ sortedNotifications[0]['vlMessageObs']['rejectedVL'].length}}</ion-badge>
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button
            class="custom-button"
            :class="{ active: isActive('normal') }"
            @click="onselect('normal')"
          >
            <span class="button-text">Normal Results</span>
            <ion-badge class="badge" color="success">{{ sortedNotifications[0]['vlMessageObs']['normalVL'].length}}</ion-badge>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
    <div class="result-container" v-if="hasNotifications">
        <table> 
            <thead v-if="!rejected"> 
                <tr class="his-sm-text"> 
                    <th>ARV #</th>
                    <th>Accession #</th>
                    <th>Order Date</th>
                    <th>Result</th>
                    <th>Result Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <thead v-if="rejected"> 
                <tr class="his-sm-text"> 
                    <th>ARV #</th>
                    <th>Accession #</th>
                    <th>Order Date</th>
                    <th>Rejection Reason</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-if="normal || highvl"> 
                <tr 
                    :color="!item.read ? 'light': ''" 
                    class="his-md-text"
                    v-for="(item, index) in normal ? sortedNotifications[0]['vlMessageObs']['normalVL'] : sortedNotifications[0]['vlMessageObs']['highVL']"
                    :key="index"> 
                        <td><small>{{ item['arv'] }}</small></td>
                        <td> <small>{{ item['accession'] }}</small></td>
                        <td> <small>{{ item['order_date'] }}</small></td>
                        <td> <small>{{ item['results'] }}</small></td>
                        <td><small>{{ item['results_date'] }}</small> </td>
                        <td> 
                            <ion-buttons slot="end">
                                <ion-button
                                    @click="openNotification(item)"
                                    fill="solid"
                                    color="success">
                                    View
                                </ion-button>
                                <ion-button 
                                    @click="clearNotification(item.id)"
                                    fill="solid"
                                    color="warning">
                                    Clear
                                </ion-button>
                            </ion-buttons>
                        </td>
                </tr>
            </tbody> 
            <tbody v-if="rejected"> 
                <tr 
                    :color="!item.read ? 'light': ''" 
                    class="his-md-text"
                    v-for="(item, index) in sortedNotifications[0]['vlMessageObs']['rejectedVL']"
                    :key="index"> 
                        <td><small>{{ item['arv']}}</small></td>
                        <td> <small>{{ item['accession'] }}</small></td>
                        <td> <small>{{ item['order_date'] }}</small></td>
                        <td> <small>{{ item['rejection_reason'] }}</small></td>
                        <td> 
                            <ion-buttons slot="end">
                                <ion-button
                                    @click="openNotification(item)"
                                    fill="solid"
                                    color="success">
                                    View
                                </ion-button>
                                <ion-button 
                                    @click="clearNotification(item.id)"
                                    fill="solid"
                                    color="warning">
                                    Clear
                                </ion-button>
                            </ion-buttons>
                        </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Notification } from "@/composables/notifications"
import { 
    IonButtons,
    IonButton
} from "@ionic/vue";
export default defineComponent({
    components: {
        IonButtons,
        IonButton
    },
    data() {
        return {
            activeButton: 'highvl',
            highvl: true,
            rejected: false,
            normal: false,
        };
    },
    methods: {
    
    onselect(button: any) {
      this.activeButton = button;
      // Perform additional actions as needed
        button == 'highvl' ? this.highvl =true : this.highvl =false;
        button == 'rejected' ? this.rejected = true : this.rejected =false;
        button == 'normal' ? this.normal = true : this.normal =false;
        
    },
    isActive(button:any) {
      return this.activeButton === button;
    },
       
    },
    setup() {
        return Notification()
    }
})
</script>
<style scoped>
ion-col {
  display: flex;
  justify-content: center;
  margin: 0 4%; /* Adjust the margin value to increase or decrease the space between buttons */
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #C8C8C8; 
  border-radius: 10px; 
}
.result-container {
  margin-top:5px;
  align-items: center;
  border: 1px solid #C8C8C8; 
  border-radius: 10px; 
  max-height: 47vh;
  min-height: 47vh;
  overflow: scroll;
}
ion-button.active{
    --ion-color-primary: #A6B7E2 !important;
    --ion-color-primary-rgb: 201, 203, 210;
    --ion-color-primary-contrast: #000000;
    --ion-color-primary-contrast-rgb: 0, 0, 0;
    --ion-color-primary-shade: #b6b8bf;
    --ion-color-primary-tint: #d6d8df;
    --ion-button-round-border-radius: 5px;
    --ion-button-border-radius: 5px;
    --ion-border-radius: 5px;
    --border-radius: 5px;
    height: 50px;
}
ion-grid {
  width: 100%;
}
ion-button {
  width: 100%;
}
ul {
    list-style: none;
}

ion-button.custom-button {
    --ion-color-primary: #c9cbd2;
    --ion-color-primary-rgb: 201, 203, 210;
    --ion-color-primary-contrast: #000000;
    --ion-color-primary-contrast-rgb: 0, 0, 0;
    --ion-color-primary-shade: #b6b8bf;
    --ion-color-primary-tint: #d6d8df;
    --ion-button-round-border-radius: 5px;
    --ion-button-border-radius: 5px;
    --ion-border-radius: 5px;
    --border-radius: 5px;
    height: 50px;
}


.badge {
  position: relative;
  top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  padding: 4px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}
table {
        width: 100%;
    }
.drug-section-style {
    padding: 0;
    background: #f6f2ca;
}
td, th {
    border: solid 1px rgba(131, 131, 131, 0.2);
}
th {
    padding: 0.2em;
}
td {
    padding: 0.2em;
}
.section {
    margin-top: 10px;
    overflow-y: scroll;
}
</style>
