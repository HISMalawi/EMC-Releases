<script lang="ts">
import { defineComponent } from 'vue'
import { Field, Option } from '@/components/Forms/FieldInterface'
import { Patientservice } from "@/services/patient_service"
import { ProgramService } from "@/services/program_service"
import { PatientProgramService } from "@/services/patient_program_service"
import { UserService } from "@/services/user_service"
import { find, isEmpty } from "lodash"
import { nextTask } from "@/utils/WorkflowTaskHelper"
import { ENCOUNTER_GUIDELINES, FlowState } from "@/guidelines/encounter_guidelines"
import { matchToGuidelines } from "@/utils/GuidelineEngine"
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { delayPromise } from '@/utils/Timers'
import { toastDanger } from '@/utils/Alerts'
import { getStorePatient } from "@/composables/patientStore"

export default defineComponent({
    components: { HisStandardForm },
    data: () => ({
        patient: {} as any,
        fields: [] as Array<Field>,
        patientID: '' as any,
        providerID: -1 as number,
        providers: [] as any,
        facts: {
            sessionDate: '' as string,
            apiDate: '' as string,
            encounterName: 'N/A' as string,
            providers: [] as Array<any>,
            isBdeMode: false as boolean,
            birthDate: '' as string,
            outcome: '' as string,
            outcomeStartDate: '' as string
        },
        ready: false
    }),
    watch: {
       '$route': {
            handler(route: any) {
                if(route.params.patient_id && this.patientID != route.params.patient_id) {
                    this.patientID = route.params.patient_id;
                    getStorePatient(this.patientID).then(patientData => {
                        this.patient = patientData
                        this.setEncounterFacts().then(() => {
                            this.checkEncounterGuidelines().then(() => {
                                this.ready = true
                            })
                        })
                    })
                }
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        cancelDestination(): string {
            return this.patientDashboardUrl()
        }
    },
    methods: {
        runflowState(state: FlowState, params=null) {
            const states: any = {}
            states[FlowState.SET_PROVIDER] = (selection: any) => {
                const [ username ] = selection.split(' ')
                const provider = find(this.providers, { username })
                if (provider) this.providerID = provider.person_id
                return FlowState.CONTINUE
            }
            states[FlowState.CHANGE_SESSION_DATE] = () => { 
                this.$router.push(`/session/date?patient_dashboard_redirection_id=${this.patientID}`)
                return FlowState.EXIT
            }
            states[FlowState.CHANGE_PATIENT_OUTCOME] = () => {
                this.$router.push(`/patient/programs/${this.patientID}`)
                return FlowState.EXIT
            }
            states[FlowState.GO_TO_PATIENT_DASHBOARD] = () => {
                this.gotoPatientDashboard()
                return FlowState.EXIT
            }
            if (state in states) {
                return states[state](params)
            }
        },
        async checkEncounterGuidelines() {
            const findings = matchToGuidelines(this.facts, ENCOUNTER_GUIDELINES)
            for(const index in findings) {
                const finding = findings[index]
                if (finding?.actions?.alert) {
                    await delayPromise(150)
                    const status = this.runflowState((await finding?.actions?.alert(this.facts)))
                    if (status === FlowState.EXIT) return
                }
                if (finding?.actions?.selection) {
                    const selection = await finding?.actions?.selection(this.facts)
                    this.runflowState(selection.flowState, selection.value)
                }
            }
        },
        async setEncounterFacts() {
            try {
                const program = await new PatientProgramService(this.patientID).getProgram()
                this.facts.outcome = program.outcome
                this.facts.outcomeStartDate = program.startDate
            } catch (e) {
                console.error(e)
                toastDanger(`${e}`)
            }
            this.facts.sessionDate = ProgramService.getSessionDate()
            this.facts.apiDate = ProgramService.getCachedApiDate() as string
            this.facts.isBdeMode = ProgramService.isBDE() as boolean
            this.facts.birthDate = this.patient.getBirthdate()
            this.facts.encounterName = this.$route.name 
                ? this.$route.name.toString().toUpperCase()
                : 'N/A'
            if (ProgramService.isBDE()) {
                this.providers = await UserService.getUsers()
                this.facts.providers = this.providers
                    .sort((a: any, b: any) => {
                        const usernameA = a.username.toUpperCase()
                        const usernameB = b.username.toUpperCase()
                        return usernameA < usernameB ? -1 : usernameA > usernameB  ? 1 : 0
                    })
                    .map((p: any) => {
                        let name = `${p.username}`
                        if (!isEmpty(p?.person?.names)) {
                            const [ latestName ] = p.person?.names || []
                            name += ` (${latestName.given_name} ${latestName.family_name})`
                        }
                        return name
                    })
            }
        },
        toOption(label: string, other={}) {
            return {
                label,
                value: label,
                other
            }
        },
        mapStrToOptions(items: string[]) {
            return items.map(i => ({label: i, value: i}))
        },
        patientDashboardUrl(): string {
            return `/patient/dashboard/${this.patientID}`
        },
        gotoPatientDashboard() {
            return this.$router.push({path: this.patientDashboardUrl()})
        },
        nextTask() {
            return nextTask(this.patientID, this.$router)
        },
        yesNoOptions(): Option[] {
            return [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" }
            ]
        },
        toYesNoOption(label: string, other: any={}): Option {
            return {
                label,
                value: '',
                other: {
                    ...other,
                    values: this.yesNoOptions()
                }
            } 
        },
        mapOptions(options: Array<string>) {
            return options.map((option) => {
                return { label: option, value: option }
            });
        },
        yesNoUnknownOptions(): Option[] {
            return [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
                { label: "Unknown", value: "Unknown" }
            ]
        },
        resolveObs(obs: any, tag='') {
            const values: any = Object.values(obs)
                .filter((d: any) => d && (d.tag === tag || tag === ''))
                .reduce((accum: any, cur: any) => { 
                    const data = cur.obs ? cur.obs : cur
                    if (Array.isArray(data)) {
                        accum = accum.concat(data)
                    } else if (typeof data === 'function') {
                        accum.push(data())
                    } else {
                        accum.push(data)
                    }
                    return accum
                    }, [])
            return Promise.all(values)
        },
        inArray(arr: Array<any>, expression: (i: any) => boolean): boolean {
            try {
                return arr.filter((i: any) => expression(i)).length > 0
            } catch (e) {
                return false
            }
        },
        validateSeries(conditions: Array<any>){
            try {
                for(const i in conditions) {
                    const condition = conditions[i]()

                    if (condition) return condition
                }
            } catch (e) {
                return [e]
            }
        }
    }
})
</script>
