<template>
  <base-report-table
    title="Lab Test Result(s) Report"
    report-icon="reports/lab-results.png"
    report-type="Clinic"
    :period="period"
    :columns="columns"
    :rows="rows"
    :custom-filters="filters"
    :show-refresh-button="false"
    useDateRangeFilter
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
  >
    <template #tests>
      <SelectInput v-model="selectedTests" :options="availableTests" multiple v-if="availableTests.length" /> 
    </template>
  </base-report-table>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { CustomFilterInterface, TableColumnInterface } from "@uniquedj95/vtable";
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { Option } from "@/components/Forms/FieldInterface";
import { LabReportService } from "@/apps/ART/services/reports/lab_report_service";
import { isEmpty } from "lodash";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { Patientservice } from "@/services/patient_service";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { modal } from "@/utils/modal";
import SelectInput from "@/apps/EMC/Components/inputs/SelectInput.vue";
import { DTFormField } from "@/apps/EMC/interfaces/dt_form_field";

export default defineComponent({
  name: "ClinicLabResults",
  components: { BaseReportTable, SelectInput },
  setup() {
    const period = ref("-");
    const type = reactive({} as Option);
    const report = new LabReportService()
    const selectedTests = reactive<DTFormField>({value: [], placeholder: "Select test(s) results"})
    const availableTests = ref<Array<any>>([])
    
    const columns = computed<TableColumnInterface[]>(() => type.value === "disaggregated" 
      ? [
          { path: "age_group", label: "Age Group" },
          { path: "gender", label: "Gender", formatter: toGenderString },
          ...selectedTests.value.map((t: any) => ({ path: t.label, label: t.label, drillable: true }))
        ]
      : [
          { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
          { path: "gender", label: "Gender", formatter: toGenderString },
          { path: "birthdate", label: "Birthdate", formatter: HisDate.toStandardHisDisplayFormat },
          { path: "order_date", label: "Ordered", formatter: HisDate.toStandardHisDisplayFormat },
          { path: "test", label: "Specimen" },
          { path: "test_name", label: "Test" },
          { path: "result", label: "Result" },
          { path: "result_date", label: "Released", formatter: HisDate.toStandardHisDisplayFormat }
        ]
    );

    const  buildAvailableTests = (results: any[]) => {
      const tests: Record<string, any> = {}
      results.forEach((result) => {
        result.measures.forEach((measure: any) => {
          if (!(measure.name in tests)) {
            tests[measure.name] = []
          }
          tests[measure.name].push({
            ...result,
            test_name:  measure.name,
            result: `${measure.modifier} ${measure.value}`,
          })
        })
      })
      return tests
    }

    const buildAvailableTestOptions = (tests: any) => {
      const options = [] as Option[]
      for(const test in tests) {
          const result = tests[test]
          options.push({
              label: test,
              value: result.length,
              other: result
          })
      }
      return options
    }

    const fetchData = async (filters: Record<string, any>) => {
      await loader.show();
      report.setStartDate(filters.dateRange.startDate)
      report.setEndDate(filters.dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data = await report.getLabResultsReport()
      await loader.hide();
      const tests = buildAvailableTests(data)
      availableTests.value = buildAvailableTestOptions(tests)
      if(isEmpty(selectedTests.value)) selectedTests.value = availableTests.value.map(test => ({ ...test, isChecked: true }));
      if(!type.value) {
        type.label = 'Disaggregated';
        type.value = 'disaggregated' 
      }
    }

    const buildDisagregatedRows = () => {
      const males = [] as Array<any>
      const females = [] as Array<any>
      let rows = [] as Array<any>
      for(const age_group of AGE_GROUPS) {
        const maleRow: Record<string, any> = { age_group, gender: "Male"}
        const femaleRow: Record<string, any> = { age_group, gender: "Female"}
        selectedTests.value.forEach(({label, other}: any) => {
            const filterByGender = (gender: string) => other
              .filter((i: any) => i.gender === gender && i.age_group === age_group)
              .map((i: any) => i.patient_id)

            maleRow[label] = filterByGender('M')
            femaleRow[label] = filterByGender('F')
        })
        males.push(maleRow)
        females.push(femaleRow)
        rows = [...females, ...males]
      }
      return rows;
    }

    const buildPatientLevelRows = () => {
      return selectedTests.value.map(({other}: any) => other).flat(1);
    }

    const rows = computed(() => {
      if(isEmpty(availableTests.value)) return [];
      return type.value === "disaggregated" ? buildDisagregatedRows() : buildPatientLevelRows()
    })

    const filters = computed<CustomFilterInterface[]>(() => [
      {
        id: "tests",
        type: "select",
        required: false,
        slotName: "tests",
      },
      {
        id: "type",
        label: "Select report type",
        type: "select",
        required: false,
        value: type,
        onUpdate: (v: any) => {
          type.label = v.label
          type.value = v.value
        },
        options: [
          { label: 'Disaggregated',  value: 'disaggregated' },
          { label: 'Patient level', value: 'patient_level' },
        ],
      },
    ])

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
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
      period,
      rows,
      columns,
      filters,
      fetchData,
      onDrilldown,
      availableTests,
      selectedTests,
    }
  }
})
</script>