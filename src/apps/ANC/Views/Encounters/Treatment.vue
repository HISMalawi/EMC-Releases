<template>
    <ion-page> 
        <ion-header> 
            <ion-toolbar> 
                <ion-title>Treatment</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid> 
                <ion-row class="his-card section drug-section-style">
                    <ion-col> 
                        <table> 
                            <thead> 
                                <tr> 
                                    <th>Drug</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr> 
                                    <td> Edrophonium chloride (1ml amp injection) </td>
                                    <td> 
                                        <ion-input 
                                            class="dosage-input"
                                            placeholder="Add frequency.."
                                        /> </td>
                                    <td> 
                                        <ion-input 
                                            placeholder="Add duration.."
                                            class="dosage-input"/> 
                                        </td>
                                    <td> 
                                        <ion-button color="danger">
                                            Remove
                                        </ion-button> 
                                    </td>
                                </tr>
                                <tr> 
                                    <td> Edrophonium chloride (1ml amp injection) </td>
                                    <td> 
                                        <ion-input 
                                            class="dosage-input"
                                            placeholder="Add frequency.."
                                        /> </td>
                                    <td> 
                                        <ion-input 
                                            placeholder="Add duration.."
                                            class="dosage-input"/> 
                                        </td>
                                    <td> 
                                        <ion-button color="danger">
                                            Remove
                                        </ion-button> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ion-col>
                </ion-row>
                <ion-row class="his-card section">
                    <ion-col> 
                        <ion-list>
                            <ion-item button>
                                Add Anc Drug set
                            </ion-item>
                            <ion-item button>
                                Add Some test drug set
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ion-footer> 
            <ion-toolbar color="dark">
                <ion-button slot="start" size="large" color="danger">
                    Cancel
                </ion-button>
                <ion-button slot="end" size="large"> 
                    Add Drug
                </ion-button>
                <ion-button slot="end" size="large" color="warning"> 
                    Clear
                </ion-button>
                <ion-button slot="end" size="large" color="success"> 
                    Finish
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
    IonHeader,
    IonPage,
    IonContent,
    IonTitle,
    IonRow,
    IonGrid,
    IonInput,
    IonCol,
    IonFooter,
    IonList,
    IonItem,
    IonToolbar,
    IonButton
} from "@ionic/vue"
export default defineComponent({
    components: {
        IonHeader,
        IonRow,
        IonGrid,
        IonCol,
        IonPage,
        IonContent,
        IonTitle,
        IonInput,
        IonButton,
        IonFooter,
        IonToolbar,
        IonList,
        IonItem,
    }
})
</script>
<style scoped>
    .dosage-input {
        text-align: center;
        border: solid 1px #ccc;
        height: 50px;
        width: 100%;
        background-color: rgb(252, 252, 241);  
    }
    table {
        width: 100%;
    }
    .drug-section-style {
        padding: 0;
        background: #f6f2ca;
    }
    td, th {
        border: solid 1px #3333;
    }
    th {
        padding: 0.8em;
    }
    td {
        padding: 0.4em;
        font-size: 0.9rem; 
    }
    .section {
        margin-top: 10px;
        height: 40vh;
    }
</style>
