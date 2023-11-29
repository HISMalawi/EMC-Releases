<template>
  <base-report-table
    title="PEPFAR Disaggregated Report"
    report-icon="reports/split.png"
    report-type="PEPFAR"
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
import { computed, defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import dayjs from "dayjs";
import { DisaggregatedReportService } from "@/apps/ART/services/reports/disaggregated_service";
import { difference, get, isEmpty } from "lodash";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { REGIMENS } from "@/apps/ART/services/reports/regimen_report_service"
import { Patientservice } from "@/services/patient_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { swapAdjacentItems } from "@/utils/Arrays";

export default defineComponent({
  name: "CohortDisaggregated",
  components: { BaseReportTable },
  setup() {
    const report = new DisaggregatedReportService()
    let cohortData = {} as Record<string, any>;
    const period = ref("-");
    const females = ref<Array<any>>([]);
    const males = ref<Array<any>>([]);
    const maternals = ref<Array<any>>([]);
    const rows = computed(() => [...females.value, ...males.value, ...maternals.value]);
    
    const columns: TableColumnInterface[] = [
      { path: "ageGroup", label: "Age Group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "txCurr", label: "TX curr (receiving ART)", drillable: true },
      ...REGIMENS.map(r => ({ path: r, label: r, drillable: true })),
      { path: "N/A", label: "Unknown", drillable: true },
      { path: "total", label: "Total", drillable: true },
    ]

    const getRegimenRow = async (gender: string) => {
      if(/fp|fbf/i.test(gender)) {
        report.setAgeGroup("All");
        report.setGender(gender);
      }
      const row: Record<string, any> = {}
      const distribution = await report.getRegimenDistribution()
      for (const regimen of [...REGIMENS, 'N/A']) {
        const data = get(distribution, regimen, [])
        row[regimen] = data
      }
      row.total = Object.values(row).reduce((acc, val) => acc.concat(val), [])
      return row
    }

    const aggregate = (rows: Array<any>, gender: string) => {
      const row = rows.reduce((acc: any, curr: any) => {
        for  (const indicator in curr) {
          if(indicator in acc) acc[indicator] = acc[indicator].concat(curr[indicator])
          else acc[indicator] = curr[indicator]
        }
        return acc
      }, {})
      return {...row, ageGroup: "All", gender}
    }

    const buildTotalMalesRow = () => {
      males.value.push(aggregate(males.value, "Male"))
    }

    const setFemaleNotPregnantRow = () => {
      const all = aggregate(females.value, "Female");
      const fpFbf = aggregate(maternals.value, "Female")

      const fnpTD = (column: string) => difference(all[column], fpFbf[column]);

      const fnpRegimensRow = () => {
        const row: Record<string, any> = {}
        for (const regimen of [...REGIMENS, 'N/A']) {
          row[regimen] = fnpTD(regimen)
        }
        return row
      }

      maternals.value.push({
        'ageGroup': "All",
        gender: "FNP",
        txCurr: fnpTD('txCurr'),
        ...fnpRegimensRow(),
        total: fnpTD('total'),
      })
    }

    const buildRowData = async (gender: "F" | "M" | "FP" | "FBf", ageGroup: string) => {
      report.setGender(gender === "FP" ? "pregnant" : gender === "FBf" ? "breastfeeding" : toGenderString(gender));
      report.setAgeGroup(ageGroup);

      if(!(ageGroup in cohortData)) {
        const data = await report.getCohort()
        report.setRebuildOutcome(false);
        cohortData[ageGroup] = !isEmpty(data) ? data[ageGroup] : {}
      }

      return {
        gender,
        txCurr: get(cohortData, `${ageGroup}.${gender.charAt(0)}.tx_curr`, []),
        ageGroup: /pregnant|breastfeeding/i.test(ageGroup) ? "All" : ageGroup,
        ...(await getRegimenRow(gender)),
      };
    };

    const buildMaleFemalesRows = async () => {
      for (const ageGroup of AGE_GROUPS) {
        males.value.push({ ...(await buildRowData("M", ageGroup)) });
        females.value.push({ ...(await buildRowData("F", ageGroup)) });
      }
    };

    const buildFpFBfRows = async () => {
      for (const group of ["Pregnant", "Breastfeeding"]) {
        const gender = group === "Pregnant" ? "FP" : "FBf";
        maternals.value.push({ ...(await buildRowData(gender, group)) });
      }
    };

    const fetchData =  async (config?: Record<string, any>, regenerate=true) => {
      await loader.show()
      males.value = [];
      females.value = [];
      maternals.value = [];
      cohortData = {};
      if(config) {
        report.setStartDate(config?.dateRange.startDate)
        report.setEndDate(config?.dateRange.endDate)
      }
      report.setRebuildOutcome(regenerate)
      report.setQuarter("pepfar")     
      period.value = report.getDateIntervalPeriod()
      report.initialize = false;
      await buildMaleFemalesRows();
      buildTotalMalesRow();
      await buildFpFBfRows();
      setFemaleNotPregnantRow()
      swapAdjacentItems(maternals.value, 1); // swap fnp and fbf rows
      await loader.hide();
    }

    const onRegenerate = () => {
      if(period.value) return fetchData();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]
      const patients = data.row[data.column.path]
      const rows = ref<Array<any>>([])
      const getPatients = async () => {
        for(const patient of patients) {
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

      getPatients();

      await modal.show(DrilldownTableVue, {
        columns,
        rows: rows.value,
        title: `${data.row.ageGroup} ${data.column.label} | ${data.row.gender}s`,
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