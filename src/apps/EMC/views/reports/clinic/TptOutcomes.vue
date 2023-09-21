<template>
  <base-report-table 
    :title="title" 
    report-icon="reports/stats.png" 
    report-type="Clinic"
    :columns="columns" 
    :rows="rows" 
    :period="period" 
    :show-indices="true"
    useDateRangeFilter 
    @custom-filter="getData"
    @drilldown="onDrilldown"
    @regenerate="getData"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { ClinicReportService } from "@/apps/ART/services/reports/clinic_report_service";
import { Patientservice } from "@/services/patient_service";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { modal } from "@/utils/modal";
import { toGenderString } from "@/utils/Strs";
import HisDate from "@/utils/Date";
import { sortByARV } from "@/apps/EMC/utils/common"; 
import { sortBy } from "@/utils/Arrays";
import { toastWarning } from "@/utils/Alerts";
import { isEmpty } from "lodash";

export default defineComponent({
  name: "TptOutcomes",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const report = new ClinicReportService()
    const title = ref("TPT Outcomes Clinic Report");
    const rows = ref<any[]>([]);
    const indicators = {
      "started_tpt_new": "Started TPT (New on ART)",
      "started_tpt_prev": "Started TPT (Previous on ART)",
      "completed_tpt_new": "Completed TPT(New on ART)",
      "completed_tpt_prev": "Completed TPT(Previous on ART)",
      "not_completed_tpt": "Not completed TPT",
      "died": "Died",
      "defaulted": "Defaulted",
      "stopped": "Stopped ART",
      "transfer_out": "Transfered Out",
      "confirmed_tb": "Confirmed TB",
      "pregnant": "Pregnant",
      "breast_feeding": "Breastfeeding",
      "skin_rash": "Skin rash",
      "peripheral_neuropathy": "Peripheral neuropathy",
      "yellow_eyes": "Yellow eyes",
      "nausea": "Nausea",
      "dizziness": "Dizziness"
    }

    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age Group" },
      { path: "tpt_type", label: "TPT Type" },
      ...Object.entries(indicators).map(([path, label]: any) => ({
        path, 
        label,  
        drillable: true, 
        sortable: false 
      })),
    ]

    const getData = async (config?: Record<string, any>) => {
      if(config && "dateRange" in config) {
        const { startDate, endDate } = config.dateRange;
        report.setStartDate(startDate)
        report.setEndDate(endDate)
        period.value = report.getDateIntervalPeriod()
      }
      if(!period.value) return toastWarning("Select report period");
      await loader.show();
      try {
        const data: any[] = await report.getTtpOutcomes() || []
        rows.value = sortBy(data, 'tpt_type');
        const aggregatedData = agregateByGender(data);
        rows.value.push({ age_group: "All", tpt_type: "Male", ...aggregatedData.males })
        rows.value.push(...getTotalFemaleRows(aggregatedData.females));
      } catch (e) {
        toastWarning("Failed to load report data");
        console.error(e);
      }
      loader.hide();
    }

    const getTotalFemaleRows = (allFemales: any) => {
      return ["FP", "FNP", "FBf"].map(gender => {
        const row: Record<string, any> = { age_group: "All", tpt_type: gender }
        for (const i in indicators) {
          row[i] = allFemales[i].filter((patient: number) => {
            if(gender === "FP") return allFemales.pregnant.includes(patient);
            if(gender === "FBf") return allFemales.breast_feeding.includes(patient);
            return !([...allFemales.pregnant, allFemales.breast_feeding].includes(patient));
          })
        } 
        return row;
      }); 
    }

    const agregateByGender = (data: Array<any>) => {
      return data.reduce((acc: any, curr: any) => {
        for (const i in indicators) {
          if(!(i in acc.males)) acc.males[i] = []
          if(!(i in acc.females)) acc.females[i] = []
          if(isEmpty(curr[i])) continue;
          curr[i].forEach((d: any) => {
            if (d.gender === "F") acc.females[i].push(d.patient_id);
            else acc.males[i].push(d.patient_id)
          });
        }
        return acc
      }, {males: {}, females: {}});
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arvNumber", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" },
        { path: "artStartDate", label: "Art Start Date", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "tptStartDate", label: "TPT Initiation Date", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "tptCompleteDate", label: "TPT Completion Date", formatter: HisDate.toStandardHisDisplayFormat },
      ]
      
      const patients = data.row[data.column.path].map((p: any) => {
        if (typeof p === 'object' && "patient_id" in p) return p.patient_id;
        return p
      });

      const rows = ref<Array<any>>([])
      for(const patient of patients) {
        Patientservice.findByID(patient).then(data => {
          const p = new Patientservice(data)
          rows.value.push({
            "arvNumber": p.getArvNumber(),
            "birthdate": p.getBirthdate(),
            "gender": p.getGender(),
            "address": `${p.getCurrentVillage()}`,
            artStartDate: data.art_start_date,
            tptStartDate: data.tpt_status?.tpt_init_date,
            tptCompleteDate: data.tpt_status?.tpt_complete_date,
          })
        })
      }

      await modal.show(DrilldownTableVue, {
        title: `${data.row.age_group} ${data.column.label} (${data.row.tpt_type})`,
        columns,
        rows: rows.value,
      })
    }

    return {
      rows,
      title,
      columns,
      period,
      getData,
      onDrilldown,
    }
  }
})
</script>
