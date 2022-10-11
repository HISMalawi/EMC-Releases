<template>
  <base-report-table
    title="MoH Cohort Disaggregated Report"
    report-icon="reports/split.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
    @regenerate="onRegenerate"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { REGIMENS } from "@/apps/ART/services/reports/regimen_report_service";
import dayjs from "dayjs";
import { DisaggregatedReportService } from "@/apps/ART/services/reports/disaggregated_service";
import { toastWarning } from "@/utils/Alerts";
import { get, isEmpty } from "lodash";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { Patientservice } from "@/services/patient_service";
import { useRoute } from "vue-router";
import { empty } from "rxjs";
import Url from "@/utils/Url";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

interface Category {
  index: number;
  gender: string;
  altGender: string;
  ageGroups: string[];
  altAgeGroup?: string;
  other?: string;
}
export default defineComponent({
  name: "CohortDisaggregated",
  components: { BaseReportTable },
  setup() {
    const report = new DisaggregatedReportService()
    let cohortData = reactive({} as Record<string, any>);
    const period = ref("-");
    let sortIndexes = reactive({} as Record<string, any[]>);
    let aggregations = reactive([] as any[]);
    
    const rows = computed(() => 
      Object.keys(sortIndexes).sort((a, b) => parseInt(a) - parseInt(b))
        .reduce((acc, key) => acc.concat(sortIndexes[key]), [] as any[])
        .map((row, i) => ({ index: i + 1, ...row, }))
    )
    
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc'}, 
      { path: "age_group", label: "Age Group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "txNew", label: "Tx new (new on ART)", drillable: true },
      { path: "txCurr", label: "TX curr (receiving ART)", drillable: true },
      { path: "txGivenIpt", label: "TX curr (received IPT)", drillable: true },
      { path: "txScreenTB", label: "TX curr (screened for TB)", drillable: true },
      ...REGIMENS.map(r => ({ 
        path: r, label: r, drillable: true
      })),
      { path: "N/A", label: "Unknown", drillable: true },
      { path: "total", label: "Total", drillable: true },
    ]

    const addAggregation = (col: string, gender: string, data = [] as any[]) => {
      aggregations.push({col, gender, data});
    }

    const getRegimenRow = async (group: string, gender: string) => {
      const row: Record<string, any> = {}
      const distribution = await report.getRegimenDistribution()
      for (const regimen of [...REGIMENS, 'N/A']) {
        const data = get(distribution, regimen, [])
        row[regimen] = data
        addAggregation(regimen, gender, data)
      }
      row.total = Object.values(row).reduce((acc, val) => acc.concat(val), [])
      addAggregation('regimenTotals', gender, row.total)
      return row
    }

    const getTotalAggregations = (column: string, gender: string) => {
      return aggregations
        .filter(a => a.col === column && a.gender === gender)
        .reduce((acc, val) => acc.concat(val.data), [])
    }

    const getTotalRegimensAggregations = (gender: string) => {
      const row: Record<string, any> = {}
      for (const regimen of [...REGIMENS, 'N/A']) {
        row[regimen] = getTotalAggregations(regimen, gender)
      }
      return row
    }

    const setTotalMalesRow = (index: number) => {
      sortIndexes[index] = [{
          'age_group': "All",
          gender: "Male",
          txNew: getTotalAggregations('txNew', 'Male'),
          txCurr: getTotalAggregations('txCurr', 'Male'),
          txGivenIpt: getTotalAggregations('txGivenIpt', 'Male'),
          txScreenTB: getTotalAggregations('txGivenIpt', 'Male'),
          ...getTotalRegimensAggregations("Male"),
          total: getTotalAggregations('regimenTotals', 'Male'),
        }]
    }

    const isPregnant = (patientID: number, column: string) => {
      return aggregations
        .filter((a: any) => a.gender.match(/fp|fbf/i) && a.col === column)
        .reduce((accum: any, cur: any) => accum.concat(cur.data || []), [])
        .includes(patientID)
    }

    const setFemaleNotPregnantRow = (index: number) => {
      const fnpTD = (column: string) => aggregations
        .filter((a: any) => a.gender === 'Female' && a.col === column)
        .reduce((accum: any, cur: any) => accum.concat(cur.data.filter((i: any) => !isPregnant(i, column))), [])

      const fnpRegimensRow = () => {
        const row: Record<string, any> = {}
        for (const regimen of [...REGIMENS, 'N/A']) {
          row[regimen] = fnpTD(regimen)
        }
        return row
      }

      sortIndexes[index] = [{
        'age_group': "All",
        gender: "FNP",
        txNew: fnpTD('txNew'),
        txCurr: fnpTD('txCurr'),
        txGivenIpt: fnpTD('txGivenIpt'),
        txScreenTB: fnpTD('txGivenIpt'),
        ...fnpRegimensRow(),
        total: fnpTD('regimenTotals'),
      }]
    }

    const buildRows = async (category: Category) => {
      report.setGender(category.altAgeGroup ? category.altAgeGroup.toLowerCase() : category.altGender.toLowerCase());
      for (const ageGroup of category.ageGroups) {
        let txNew = []
        let txCurr = []
        let txGivenIpt = []
        let txScreenTB = []
        const group = category.altAgeGroup ? category.altAgeGroup : ageGroup
        report.setAgeGroup(group);

        if(!(group in cohortData)) {
          const data = await report.getCohort()
          report.setRebuildOutcome(false)
          cohortData[group] = isEmpty(data) ? {} : data[group]
        }

        if(!isEmpty(cohortData[group])) {
          txNew = get(cohortData, `${group}.${category.gender}.tx_new`, [])
          txCurr = get(cohortData, `${group}.${category.gender}.tx_curr`, [])
          txGivenIpt = await report.getTxIpt()
          txScreenTB = await report.getTxCurrTB()
        }

        addAggregation('txNew', category.altGender, txNew)
        addAggregation('txCurr', category.altGender, txCurr)
        addAggregation('txGivenIpt', category.altGender, txGivenIpt)
        addAggregation('txScreenTB', category.altGender, txScreenTB)

        switch(report.getGender()) {
          case 'breastfeeding':
            report.setAgeGroup('All')
            report.setGender('Fbf')
            break
          case 'pregnant':
            report.setAgeGroup('All')
            report.setGender('FP')
            break
        }

        if(!sortIndexes[category.index]) sortIndexes[category.index] = []
        sortIndexes[category.index].push({
          'age_group': ageGroup,
          gender: category.altGender,
          txNew,
          txCurr,
          txGivenIpt,
          txScreenTB,
          ...await getRegimenRow(group, category.altGender),
        })
      }
    }

    const fetchData =  async ({ dateRange }: Record<string, any>, regenerate=false, quarter="Custom") => {
      await loader.show()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      report.setRebuildOutcome(regenerate)
      report.setQuarter(quarter)     
      period.value = report.getDateIntervalPeriod()
      const initialised = await report.init()
      if (!initialised) return toastWarning('Unable to initialise report')
      const categories: Category[] = [
        {index: 1, gender: "F", altGender: "Female", ageGroups: AGE_GROUPS },
        {index: 2, gender: "M", altGender: "Male", ageGroups: AGE_GROUPS },
        {index: 4, gender: "F", altGender: "FP", ageGroups: ['All'], altAgeGroup: 'Pregnant' },
        {index: 6, gender: "F", altGender: "FBf", ageGroups: ['All'], altAgeGroup: 'Breastfeeding' },
      ]

      for (const category of categories) {
        await buildRows(category)
      }
      
      setTotalMalesRow(3)
      setFemaleNotPregnantRow(5)
      
      await loader.hide();
    }

    const onRegenerate = async () => {
      sortIndexes = {}
      aggregations = []
      cohortData = {}
      const [ start, end ] = period.value.split('-')
      if(start && end ) {
        await fetchData({dateRange: {
          startDate: dayjs(start).format("YYYY-MM-DD"), 
          endDate: dayjs(end).format("YYYY-MM-DD")
        }}, true)
      }
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
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
        title: `${data.row.age_group} ${data.column.label} | ${data.row.gender}s`,
        columns,
        rows,
      })
    }

    onMounted(() => {
      const { 'start_date': startDate, 'end_date': endDate, quarter } = useRoute().query
      if(startDate && endDate && quarter) {
        const dateRange = {
          startDate: dayjs(startDate.toString()).format("YYYY-MM-DD"), 
          endDate: dayjs(endDate.toString()).format("YYYY-MM-DD")
        }
        fetchData({dateRange}, false, quarter.toString())    
      }
    })

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