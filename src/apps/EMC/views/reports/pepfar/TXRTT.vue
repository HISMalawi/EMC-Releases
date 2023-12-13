<template>
  <base-report-table
    title="PEPFAR TX RTT Report"
    subtitle="Clients that have their clinical dispensation visit falling in the reporting period and 
      there is a difference of 30 or more days between their visit date and their previous appointment date / runout date"
    report-icon="reports/restart.png"
    report-type="PEPFAR"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    :show-refresh-button="false"
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
    showIndices
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { Patientservice } from "@/services/patient_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { TxRttReportService } from "@/apps/ART/services/reports/tx_rtt_report_service";
import { uniq } from "lodash";

export default defineComponent({
  name: "TBPrev",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const report = new TxRttReportService();
    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "cd4_less_than_200", label: "CD4 <200", drillable: true },
      { path: "cd4_greater_than_or_equal_to_200", label: "CD4 >=200", drillable: true },
      { path: "unknown_cd4_count", label: "Unknown CD4", drillable: true },
      { path: "not_eligible_for_cd4", label: "Not Eligible for CD4", drillable: true },
      { path: "returned_less_than_3_months", label: "Returned <3 mo", drillable: true },
      { path: "returned_greater_than_3_months_and_less_than_6_months", label: "Returned 3-5 mo", drillable: true },
      { path: "returned_greater_than_or_equal_to_6_months", label: "Returned 6+ mo", drillable: true },
    ]

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: Array<any> = await report.getTxRttReport();
      const disaggregated = getDisaggregatedData(data);
      rows.value = [
        ...disaggregated.F.rows,
        ...disaggregated.M.rows,
        getTotalMalesRows(disaggregated.M.aggregate),
        ...await getMaternityRows(disaggregated.F.aggregate)
      ];
      await loader.hide();
    }

    type DisaggregatedData = Record<"M" | "F", {
      rows: Array<any>;
      aggregate: Record<string, any>;
    }>;

    const getDisaggregatedData = (data: Array<any>): DisaggregatedData => {
      const defaultData: DisaggregatedData = { M: { rows: [], aggregate: {} }, F: { rows: [], aggregate: {} } }

      return data.reduce((result: DisaggregatedData, currentItem: any) => {
        if (currentItem.age_group !== 'Unknown') {
          const gender = currentItem.gender as keyof DisaggregatedData
          result[gender].rows.push(currentItem);
          result[gender].aggregate = Object.keys(currentItem).reduce((aggregate: any, key: string) => {
            return Array.isArray(currentItem[key])
              ? { ...aggregate, [key]: [...(aggregate[key] || []), ...currentItem[key]] }
              : aggregate;
          }, result[gender].aggregate);
        }

        return result;
      }, defaultData);
    };

    const getTotalMalesRows = (maleData: Record<string, any>) => {
      return { age_group: 'All', gender: 'Male', ...maleData }
    }

    const getMaternityRows = async (femaleData: Record<string, any>) => {
      const allFemale: any = Object.values(femaleData).flat(1)
      const mStatus = await report.getMaternalStatus(uniq(allFemale))
      const allFp = mStatus.FBf.concat(mStatus.FP);
      return ['FP', 'FNP', 'FBf'].map((gender: string) => 
        Object.keys(femaleData).reduce((a: any, k: any) => {
          return {
            ...a, 
            [k]: femaleData[k].filter((id: number) => {
              return gender === 'FNP' 
                ? !allFp.includes(id) 
                : mStatus[gender].includes(id)
            })
          }
        },
        { age_group: "All", gender })
      )
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]

      const drillRows = ref<Array<any>>([]);
      const fetchDrilldownData = async () => {
        for(const patient of data.row[data.column.path]) {
          const data = await Patientservice.findByID(patient)
          const p = new Patientservice(data)
          drillRows.value.push({
            "arv_number": p.getArvNumber(),
            "birthdate": p.getBirthdate(),
            "gender": p.getGender(),
            "address": `${p.getCurrentVillage()}`
          })
        }
      }

      fetchDrilldownData();

      await modal.show(DrilldownTableVue, {
        columns,
        rows: drillRows.value,
        title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
      })
    }

    return {
      rows,
      columns,
      period,
      fetchData,
      onDrilldown,
    }
  }
})
</script>