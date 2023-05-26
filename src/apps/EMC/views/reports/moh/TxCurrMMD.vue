<template>
  <base-report-table
    title="MoH TX CURR MMD Report"
    subtitle="Clients that are alive and on treatment in the reporting period and
      the difference in days between their clinical dispensation visit and next appointment / 
      drug-runout date is: 3 months (1 - 89 days), 3-5 months (90-179 days), 6+ months (180 or more days)"
    report-icon="reports/px.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    showIndices
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
    @regenerate="onRegenerate"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { TxReportService } from "@/apps/ART/services/reports/tx_report_service";
import { Patientservice } from "@/services/patient_service";
import dayjs from "dayjs";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "TxCurrMMD",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "underThree", label: "# of clients on <3 months of ARVs", drillable: true },
      { path: "betweenThreeAndFive", label: "# of clients on 3 - 5 months of ARVs", drillable: true },
      { path: "overSix", label: "# of clients on >= 6 months of ARVs", drillable: true },
    ]

    const buildCells = (data: Record<string, any>) => {
      const patients = Object.keys(data);
      return {
        "underThree": patients.filter(id => data[id]["prescribed_days"] < 90),
        "betweenThreeAndFive": patients.filter(id => data[id]["prescribed_days"] >= 90 && data[id]["prescribed_days"] <= 150),
        "overSix": patients.filter(id => data[id]["prescribed_days"] > 150),
      }
    }

    const getMinMaxAge = (ageGroup: string) => {
      if(ageGroup === '<1 year') return [0, 0]
      if(ageGroup === '90 plus years') return [90, 1000]
      return ageGroup.split('-').map(age => parseInt(age))
    }

    const buildTotalMalesRow = (rows: Array<any>) => {
      return rows.reduce((acc, curr) => {
        if(curr.gender === "F") return acc;
        acc.underThree = [...acc.underThree, ...curr.underThree]
        acc.betweenThreeAndFive = [...acc.betweenThreeAndFive,...curr.betweenThreeAndFive]
        acc.overSix = [...acc.overSix, ...curr.overSix]
        return acc
      }, { 
        "age_group": "All", 
        gender: "M", 
        underThree: [],  
        betweenThreeAndFive: [],
        overSix: []
      });
    }

    const fetchData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TxReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      report.setOrg('moh')
      period.value = report.getDateIntervalPeriod()
      report.initArvRefillPeriod(true)
      const males: any[] = []
      const females: any[] = []
      for (const group of AGE_GROUPS) {
        const [minAge, maxAge] = getMinMaxAge(group)
        const data = await report.getTxCurrMMDReport(minAge, maxAge)
        const hasMales = !!data && "Male" in data;
        const hasFemales = !!data && "Female" in data;
        males.push({ 
          "age_group": group,
          "gender": "Male",
          ...buildCells( hasMales ? data["Male"] : {} ) 
        })

        females.push({ 
          "age_group": group,
          "gender": "Female",
          ...buildCells( hasFemales ? data["Female"] : {} ) 
        })
        report.initArvRefillPeriod(false)
      }
      rows.value = [...females, ...males]
      rows.value = [...rows.value, buildTotalMalesRow(rows.value)]
      await loader.hide();
    }

    const onRegenerate = async () => {
      const [ start, end ] = period.value.split('-')
      if(start && end ) {
        fetchData({dateRange: {
          startDate: dayjs(start).format("YYYY-MM-DD"), 
          endDate: dayjs(end).format("YYYY-MM-DD")
        }})
      }
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true, initialSortOrder: 'asc'  },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]
      const patients = data.row[data.column.path]
      const rows: any[] = []
      for(const patient of patients) {
        const data = await Patientservice.findByID(patient)
        const p = new Patientservice(data)
        rows.push({
          "arv_number": p.getArvNumber(),
          "birthdate": p.getBirthdate(),
          "gender": p.getGender(),
          "address": `${p.getCurrentVillage()}`
        })
      }

      await modal.show(DrilldownTableVue, {
        title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
        columns,
        rows,
      })
    }

    return {
      rows,
      columns,
      period,
      fetchData,
      onDrilldown,
      onRegenerate,
    }
  }
})
</script>