<template>
    <ion-page>
      <report-template
        :title="title"
        :rows="rows"
        :fields="fields"
        :columns="columns"
        :itemsPerPage="10"
        :period="period"
        :customFilter="customFilter"
        :onReportConfiguration="init"
        :customBtns="customBtns"
        :showPerPageFilter="false"
        showVLFilter
        report-prefix="Clinic"
      ></report-template>
    </ion-page>
  </template>
  
  <script lang='ts'>
  import { defineComponent } from 'vue'
  import { ArtReportService } from "@/apps/ART/services/reports/art_report_service"
  import ReportTemplate from "@/views/reports/BaseTableReport.vue"
  import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
  import HisDate from '@/utils/Date'
  import ReportMixin from '@/apps/ART/views/reports/ReportMixin.vue'
  import { IonPage } from "@ionic/vue";
  import { optionsActionSheet } from '@/utils/ActionSheets'
  
  export default defineComponent({
    components: { ReportTemplate, IonPage },
    mixins: [ReportMixin],
    data: () => ({
      reportFilter: '',
      title: 'Viral Load Register',
      reportData: [] as any,
      totalTAT: [] as any,
      modalData: {} as any,
      columns: [[
        table.thTxt('ARV #'),
        table.thTxt('Accession #'),
        table.thTxt('Status'),
        table.thTxt('Order Date'),
        table.thTxt('Result'),
        table.thTxt('Date received'),
        table.thTxt('Mode of Delivery'),
        table.thTxt('Test reason'),
        table.thTxt('TAT(Days)'),
      ]] as ColumnInterface[][],
      customBtns: [] as any
    }),
    created(){
      this.fields = this.getDateDurationFields()
      this.customBtns.push({
        name: "High level view",
        size: "large",
        slot: "start",
        color: "primary",
        visible: true,
        onClick: async () => this.showModal()
      }) 
      
    },
    computed: {
      rows() {
        if (this.reportFilter) {
          return this.buildRows(
            this.reportData.filter((data: any) => {
              if (this.reportFilter === 'All') {
                return true
              }
              if (this.reportFilter === 'No results' &&
                !data.result) {
                  return true
                }
              if (this.reportFilter === 'With Results' && 
                  data.result) {
                    return true
                  }
              if (this.reportFilter === 'Rejected' && 
                  data.order_status ==='test-rejected') {
                    return true
                  }
              if (this.reportFilter === 'Drawn' && 
                  data.order_status ==='drawn') {
                    return true
                  }
              if (this.reportFilter === 'Pending' && 
                  data.order_status ==='pending') {
                    return true
                  }
              if (this.reportFilter === 'Started' && 
                  data.order_status ==='started') {
                    return true
                  }
              if (this.reportFilter === 'Failed' && 
                  data.order_status ==='failed') {
                    return true
                  }
              if (this.reportFilter === 'Not-done' && 
                  data.order_status ==='not-done') {
                    return true
                  }
              if (this.reportFilter === 'Completed' && 
                  data.order_status ==='completed') {
                    return true
                  }
              return false
            })
          )
        }
        return this.buildRows(this.reportData)
      }
    },
    methods: {
      async init(_: any, config: any){
        this.reportFilter = ''
        const reportService = new ArtReportService()
        reportService.setStartDate(config.start_date)
        reportService.setEndDate(config.end_date)
        this.period = reportService.getDateIntervalPeriod()
        this.reportData  = await reportService.getClinicElectronicAlerts()
        this.buildHighLevelView()
      },
      buildRows(data: any[]): RowInterface[][] {
        if(!data.length) return []
        return data.map((record: any) =>{
          let tat: any = HisDate.dateDiffInDays(record.date_received,record.date_ordered)
          tat ? this.totalTAT.push(tat) : tat = ''
         
          return [
          table.td(record.arv_number),
          table.td(record.accession_number),
          table.td(record.order_status),
          table.tdDate(record.date_ordered),
          table.td(record.result ? record.result.replace(/</g, '&lt;') : ""),
          table.tdDate(record.date_received),
          table.td(record.result_delivery_mode == 'test_results_delivered_to_site_electronically' ? 'Electronic' : 
          record.result_delivery_mode == 'test_results_delivered_to_site_manually' ?
          'Manual' : ''),
          table.td(record.test_reason),
          table.td(tat),
        ]
      })
      },
      async customFilter() {
        const modal = await optionsActionSheet(
          `Select report filter`,
          '',
          [ 
              'All', 
              'Rejected',
              'With Results',
              'No results',
              'Drawn',
              'Pending',
              'Started',
              'Failed',
              'Not-done',
              'Completed'
          ],
          [
            { name: 'Cancel', slot:'start' },
            { name: 'Select', slot: 'end', role: 'action' }
          ]
        )
        this.reportFilter = modal?.selection||''
        return this.reportFilter
      },
      buildHighLevelView(){
        this.modalData ={
          'withResults':[],
          'noResults':[],
          'rejected':[],
          'targeted':[],
          'targetedWithResult':[],
          'drawn':[],
          'pending':[],
          'started':[],
          'failed':[],
          'notDone':[],
          'completed':[]
        }
        
        this.reportData.map((record: any) =>{
          if(record.result) this.modalData.withResults.push(record.accession_number)
          if(!record.result) this.modalData.noResults.push(record.accession_number)
          if(record.order_status){
            if(record.order_status=='test-rejected') this.modalData.rejected.push(record.accession_number)
            if(record.order_status=='drawn') this.modalData.drawn.push(record.accession_number)
            if(record.order_status=='pending') this.modalData.pending.push(record.accession_number)
            if(record.order_status=='started') this.modalData.started.push(record.accession_number)
            if(record.order_status=='failed') this.modalData.failed.push(record.accession_number)
            if(record.order_status=='not-done') this.modalData.notDone.push(record.accession_number)
            if(record.order_status=='completed') this.modalData.completed.push(record.accession_number)
          }
          if(record.test_reason){
            if(record.test_reason.match(/target/i)) this.modalData.targeted.push(record.accession_number)
            if(record.test_reason.match(/target/i) && record.result) this.modalData.targetedWithResult.push(record.accession_number)
          }
        })

      },
      async showModal() {
       
        const columns = [
            [
                table.thTxt('Indicator'),
                table.thTxt('Count')
            ]
        ]
        const row = [
          [
            table.td( "Total Orders"),
            table.td( this.reportData.length)
          ],
          [
            table.td( "Total Orders With Results"),
            table.td(this.modalData.withResults.length)
          ],
          [
            table.td( "Total Orders No Results"),
            table.td(this.modalData.noResults.length)
          ],
          [
            table.td( "Total Orders Rejected"),
            table.td( this.modalData.rejected.length)
          ],
          [
            table.td( "Total Targeted Orders"),
            table.td( this.modalData.targeted.length)
          ],
          [
            table.td( "Total Targeted Orders With Results"),
            table.td(this.modalData.targetedWithResult.length)
          ],
          [
            table.td( "Total Orders Drawn"),
            table.td(this.modalData.drawn.length)
          ],
          [
            table.td( "Total Orders Pending"),
            table.td(this.modalData.pending.length)
          ],
          [
            table.td( "Total Orders Started"),
            table.td(this.modalData.started.length)
          ],
          [
            table.td( "Total Orders Failed"),
            table.td(this.modalData.failed.length)
          ],
          [   
            table.td( "Total Orders Not-done"),
            table.td(this.modalData.notDone.length)
          ],
          [
            table.td( "Total Orders Completed"),
            table.td(this.modalData.completed.length)
          ],
          [
            table.td( "Average TAT (days)"),
            table.td( Math.floor(this.totalTAT.reduce((accumulator:any, currentValue:any) => accumulator + currentValue, 0)/ this.totalTAT.length))
          ]
        ]

        this.drilldownData('Register Summary', columns, row, false)
      
      },
    },
  })
  </script>



  