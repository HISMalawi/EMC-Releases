<template>
  <base-report-table
    title="MoH TX CURR MMD Report"
    subtitle="Clients that are alive and on treatment in the reporting period and
      the difference in days between their clinical dispensation visit and next appointment / 
      drug-runout date is: 3 months (1 - 89 days), 3-5 months (90-179 days), 6+ months (180 or more days)"
    report-icon="reports/px.png"
    report-type="MOH"
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
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { uniq } from "lodash";

export default defineComponent({
  name: "TxCurrMMD",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const report = new TxReportService()
    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender" },
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

    const getAggregatedData = (rows: Array<any>, gender: string) => {
      return rows.reduce((acc, curr) => {
        if(curr.gender !== gender) return acc;
        acc.underThree = [...acc.underThree, ...curr.underThree]
        acc.betweenThreeAndFive = [...acc.betweenThreeAndFive,...curr.betweenThreeAndFive]
        acc.overSix = [...acc.overSix, ...curr.overSix]
        return acc
      }, { 
        underThree: [],  
        betweenThreeAndFive: [],
        overSix: []
      });
    }


    const buildTotalMalesRow = (rows: Array<any>) => {
      return  { 
        "age_group": "All", 
        gender: "Male", 
        ...getAggregatedData(rows, "Male")
      }
    }

    const buildMaternityRows = async (rows: Array<any>) => {
      const aggregatedFemales = getAggregatedData(rows, "Female");
      const indicators = ['underThree', 'betweenThreeAndFive', 'overSix'];
      const femaleCategories = ['FP', 'FNP', 'FBf'];
      const allFemales = uniq<number>(indicators.map(i => aggregatedFemales[i]).flat())
      const maternalStatus = await report.getMaternalStatus(allFemales)
      const allFPs = maternalStatus.FBf.concat(maternalStatus.FP);        
      const maternityRows: any[] = []
      femaleCategories.forEach(category => {
        const row: Record<string, any> = { "age_group": "All", "gender": category }
        indicators.forEach(indicator => {
          row[indicator] = aggregatedFemales[indicator].filter((id: number) => {
            return category === 'FNP' ? !allFPs.includes(id) : maternalStatus[category].includes(id)
          })
        })
        maternityRows.push(row)
      })
      return maternityRows;
    }

    const fetchData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
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
        rows.value = [...females, ...males]
      }
      rows.value.push(buildTotalMalesRow(rows.value))
      rows.value = [...rows.value, ...await buildMaternityRows(rows.value)]
      loader.hide();
    }

    const onRegenerate = async () => {
      const [ start, end ] = period.value.split('-')
      if(start && end ) {
        fetchData({dateRange: {
          startDate: HisDate.toStandardHisFormat(start), 
          endDate: HisDate.toStandardHisFormat(end)
        }})
      }
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true, initialSortOrder: 'asc'  },
        { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]
      const rows = ref<any[]>([])
      const loadPatients = async () => {
        for(const patient of data.row[data.column.path]) {
          const data = await Patientservice.findByID(patient)
          const p = new Patientservice(data)
          rows.value.push({
            "arv_number": p.getArvNumber(),
            "birthdate": p.getBirthdate(),
            "gender": p.getGender(),
            "address": `${p.getCurrentVillage()}`
          })
        }
      }

      loadPatients();      

      await modal.show(DrilldownTableVue, {
        title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
        rows: rows.value,
        columns,
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