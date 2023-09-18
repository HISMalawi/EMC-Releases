<template>
        <ion-loading
    :is-open="isLoading"
    message="Please wait..."
    >
    </ion-loading>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-thumbnail slot="start" style="margin-left: 10px;"> 
                    <ion-img :src="logo"/>
                </ion-thumbnail>
                <ion-label> 
                    <ul class="header-text-list"  style="list-style-type:none; margin-right: 20px;"> 
                        <li><b>{{ reportTitle }}</b></li>
                        <li><b>{{ reportPeriod }}</b></li>
                    </ul>
                </ion-label>
            </ion-toolbar>
        </ion-header>
        <div class="table-container" id="report-content">  
            <table id="t_id">
                <thead>
                    <tr>
                        <th style="border: none; width: 207px; background-color: white;"></th>
                        <th style="border: none; width: 118px; background-color: white;"></th>
                        <th style="width: 64px;">Out-patient</th>
                        <th colspan="2" style="width: 217px;">In-patient</th>
                    </tr>

                    <tr>
                        <th style="border: none; min-width: 50px; width: 229px; background-color: white;"></th>
                        <th style="border: none; width: 241px; background-color: white;"></th>
                        <td style="min-width: 50px; max-width: 50px; width: 207px; font-weight: bold;"> Cases </td>
                        <td style="min-width: 50px; max-width: 50px; width: 118px; font-weight: bold;"> Cases </td>
                        <td style="min-width: 50px; max-width: 50px; width: 64px; font-weight: bold;"> Deaths </td>
                    </tr>
                </thead>
                <tbody>       
                    <tr>
                        <td class="left" rowspan="2" style="width: 217px;"> Malaria &lt; 5 years </td>
                        <td class="left" style="width: 229px;"> Uncomplicated </td>
                        <td style="width: 241px;"> 0 </td>
                        <td class="disable"> </td>
                        <td class="disable"> </td>
                    </tr>
                    
                    <tr>
                        <td class="left"> Severe </td>
                        <td class="disable">  </td>
                        <td> 0 </td>
                        <td> 0 </td>
                    </tr>
                    <tr>
                        <td class="left" rowspan="2"> Malaria &gt;= 5 years </td>
                        <td class="left"> Uncomplicated </td>
                        <td>0</td>
                        <td class="disable">  </td>
                        <td class="disable"> </td>
                    </tr>
                    <tr>
                        <td class="left"> Severe </td>
                        <td class="disable"> </td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left" rowspan="2"> Malaria in Pregnant women </td>
                        <td class="left"> Uncomplicated </td>
                        <td>0</td>
                        <td class="disable">  </td>
                        <td class="disable">  </td>
                    </tr>
                    <tr>
                        <td class="left"> Severe </td>
                        <td class="disable">  </td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> In-patient malaria with severe anemia (&lt;5y) </td>
                        <td class="disable"> </td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Uncomplicated malaria &lt;5y, lab-confirmed </td>
                        <td>0</td>
                        <td class="disable">  </td>
                        <td class="disable">  </td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Uncomplicated malaria &lt;5+, lab-confirmed </td>
                        <td>0</td>
                        <td class="disable">  </td>
                        <td class="disable">  </td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Pneumonia (&lt;5 years) </td>
                        <td>0</td>
                        <td class="disable">  </td>
                        <td class="disable">  </td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Severe pneumonia (&lt;5 years) </td>
                        <td class="disable"> </td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Very severe pneumonia (&lt;5 years) </td>
                        <td class="disable">  </td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    
                    <tr>
                        <td class="left" colspan="2"> Diarrhoea with dehydration </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    
                    <tr>
                        <td class="left" colspan="2"> New AIDS cases </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Male urethral discharge </td>
                        <td>0</td>
                        <td class="disable"> </td>
                        <td class="disable">  </td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Male non-vesicular genital ulcer </td>
                        <td>0</td>
                        <td class="disable"> </td>
                        <td class="disable"> </td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Female non-vesicular genital ulcer </td>
                        <td>0</td>
                        <td class="disable"> </td>
                        <td class="disable"> </td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Diarrhoea with blood </td>
                        <td>0</td>
                        <td class="disable"> </td>
                        <td class="disable"> </td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Schistosomiasis urinary </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left" colspan="2"> Schistosomiasis intestinal </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr style="border:none;">
                        <td style="border:none;"> &nbsp; </td>
                        <td style="border:none; background-color: white;">  </td>
                        <td style="border:none; background-color: white;">  </td>
                        <td style="border:none; background-color: white;">  </td>
                        <td style="border:none; background-color: white;">  </td>
                    </tr>
                    
                    <tr>
                        <td class="bold" style="border:none; background-color: white;"> </td>
                        <td class="bold" style="background-color: #f0f0f0; font-weight: bold;"> Out-patient </td>
                        <td class="bold" style="background-color: #f0f0f0; font-weight: bold;"> In-patient </td>
                        <td class="bold" style="background-color: #f0f0f0; font-weight: bold;"> Deaths </td>
                    </tr>
                    <tr>
                        <td class="left"> AFP </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left"> Cholera </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left"> Measles </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left"> Meningitis </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left"> Neonatal tetanus </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left"> Plague </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left"> Viral Hemorrhagic Fever </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td class="left"> Diarrhoea with blood </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ion-footer>
            <ion-toolbar> 
                <ion-chip color="primary">Date Created: <b>{{ date }}</b></ion-chip>
                <ion-chip color="primary">His-Core Version: <b>{{ coreVersion }}</b></ion-chip>
                <ion-chip color="primary">API Version: <b>{{ apiVersion }}</b></ion-chip>
            </ion-toolbar>
        </ion-footer>
        <his-footer :btns="btns"></his-footer>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HisFooter from "@/components/HisDynamicNavFooter.vue";
import { IonPage, IonLoading, modalController, IonToolbar, IonHeader } from "@ionic/vue"
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import { toCsv, toPDFfromHTML } from "@/utils/Export"
    export default defineComponent({
        components: { IonPage, IonLoading, HisFooter, IonToolbar, IonHeader },
        data: () => ({
            logo: "/assets/images/login-logos/Malawi-Coat_of_arms_of_arms.png" as string,
            reportTitle: "AETC Update DHIS2",
            reportPeriod: "Jan 23 2023 - Oct 4 2023",
            btns: [] as Array<any>,
            date: HisDate.toStandardHisDisplayFormat(Service.getSessionDate()),
            apiVersion: Service.getApiVersion(),
            coreVersion: Service.getCoreVersion(), 
        }),
        created() {
            this.btns = this.getBtns()
        },
        methods: {
            exportToCsv(){
                return null;
            },
            printSpec() {
            const content = document.getElementById('report-content')
            if (content) {
                toPDFfromHTML(`
                    <html>
                        <head>
                        <title>Print Cohort</title>
                        <style> 
                            .numbers {
                            width: 2.5%;
                            text-align: center;
                            border-width: 0px 1px 0px 0px;
                            border-style: dotted;
                            }
                            .row-title {
                            width: 17.75%;
                            text-align: left;
                            padding-left: 5px;
                            border-style: dotted;
                            }
                            .signatures {
                            width: 39.875%;
                            text-align: left;
                            padding-left: 5px;
                            border-style: dotted;
                            }
                            .row-name {
                            width: 39.875%;
                            text-align: left;
                            padding-left: 5px;
                            border-style: dotted;
                            border-left-style: solid;
                            }
                            .no-borders {
                            border-width: 0px;
                            }
                            #version-row td {
                            height: 30px;
                            }
                            #version {
                            text-align: right;
                            padding-right: 5px;
                            font-size: 10px;
                            }
                            #consistency_check div {
                            color: red;
                            padding-bottom: 10px;
                            }
                            a {
                            color: black;
                            text-decoration: none;
                            }
                            table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 10px;
                            }
                            tr {
                            height: 45px;
                            }
                            .vertical-separator {
                            border-width: 0px;
                            }
                            td {
                            border-style: solid;
                            border-width: 1px;
                            padding: 1em;
                            text-align: center;
                            }
                            .section-description td {
                            border-width: 0px;
                            }
                            .horisonatl-separator td {
                            border-width: 0px;
                            }
                            .numbers {
                            width: 2.5%;
                            text-align: center;
                            border-width: 0px 1px 0px 0px;
                            border-style: dotted;
                            }
                            .sum-arrows {
                            width: 75px;
                            height: 55px;
                            }
                            .postfixes {
                            font-size: x-small;
                            font-weight: bold;
                            position: relative;
                            top: -15px;
                            left: -40px;
                            }
                            .granules {
                            width: 100%;
                            height: 32px;
                            margin: 10px;
                            display: table;
                            }
                            .granules-row {
                            display: table-row;
                            }
                            .granules-cell {
                            display: table-cell;
                            text-align: center;
                            }
                            .granules span{
                            font-size: 10px;
                            }
                            .granules-right-td {
                            border-right-style: dotted !important;
                            border-right-width: 1px;
                            }

                            @media print
                            {
                            table { page-break-after:auto }
                            tr    { page-break-inside:avoid; page-break-after:auto }
                            td    { page-break-inside:avoid; page-break-after:auto }
                            thead { display:table-header-group }
                            tfoot { display:table-footer-group }
                            }
                        </style>
                        </head>
                        <body>
                        ${content.innerHTML}
                        </body>
                    </html>
                    `)
                }
            },
            regenerate(){
                return null;
            },
            getBtns() {
            return  [
                {
                name: "CSV",
                size: "large",
                slot: "start",
                color: "primary",
                visible: true,
                onClick: () => this.exportToCsv()
                },
                {
                name: "PDF",
                size: "large",
                slot: "start",
                color: "primary",
                visible: true,
                onClick: () => this.printSpec()
                },
                {
                name: "Refresh",
                size: "large",
                slot: "end",
                color: "danger",
                visible: true,
                onClick: async () => this.regenerate()
                },
                {
                name: "Finish",
                size: "large",
                slot: "end",
                color: "success",
                visible: true,
                onClick: () => this.$router.push({ path:'/' })
                }
            ]   
        }
        }
    })
</script>
<style scoped>
    <style>
/* Add styles to the table */
#t_id {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}

/* Style the table headers */
#t_id th {
  border: 1px solid #000; /* Add a 1px border to the header cells */
  background-color: #f0f0f0; /* Background color for headers */
  padding: 8px; /* Add some padding to the header cells */
}

/* Style the table data cells */
#t_id td {
  border: 1px solid #000; /* Add a 1px border to the data cells */
  padding: 8px; /* Add some padding to the data cells */
  text-align: center; /* Center align text in data cells */
}

/* Style the cells with "Cases" and "Deaths" as gray */
#t_id td:empty {
  background-color: #f0f0f0; /* Gray background for empty cells */
}

/* Make cells in the "Out-patient" column bold */
#t_id td:nth-child(3) {
  font-weight: normal;
}

/* Make the headers slightly bolder */
#t_id th {
  font-weight: bold;
}

/* Add a little extra padding to the header row for spacing */
#t_id thead tr:first-child th {
  padding-top: 12px;
}
/* Add styles to the table container */
.table-container {
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2%;
  padding-bottom: 4%;
  max-height: 100%; /* Adjust the max height as needed */
  overflow: auto; /* Add scrollbars when the table exceeds the max height */
}

/* Add styles to the table */
#t_id {
  border-collapse: collapse;
  width: 100%;
}

/* Add a class to the specific cells that should not have a gray background */
.no-gray-bg {
  background-color: transparent !important; /* Remove gray background */
}
</style>