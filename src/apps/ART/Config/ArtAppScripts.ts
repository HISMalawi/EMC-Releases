import { modalController } from "@ionic/vue";
import { PRIMARY_ACTIVITIES } from "./ArtProgramActivities";
import { WorkflowService } from "@/services/workflow_service"
import PatientAlerts from "@/services/patient_alerts"
import { RelationshipService } from "@/services/relationship_service";
import { PatientProgramService } from "@/services/patient_program_service";
import { ProgramService } from "@/services/program_service";
import { OrderService } from "@/services/order_service";
import { Observation } from "@/interfaces/observation";
import { ObservationService } from "@/services/observation_service";
import { ConceptService } from "@/services/concept_service"
import HisDate from "@/utils/Date"
import { GeneralDataInterface } from "@/apps/interfaces/AppInterface";
import { PatientTypeService } from "@/apps/ART/services/patient_type_service"
import DrugModalVue from "@/apps/ART/Components/DrugModal.vue";
import ART_GLOBAL_PROP from "../art_global_props";
import { isEmpty } from "lodash";
import { Order } from "@/interfaces/order";
import { addWorkflowTask, nextTask, selectActivities } from "@/utils/WorkflowTaskHelper";
import dayjs from "dayjs";
import { Service } from "@/services/service";
import { Patientservice } from '@/services/patient_service';
import ART_PROP from '@/apps/ART/art_global_props';
import router from "@/router/index"

async function enrollInArtProgram(patientID: number, patientType: string, clinic: string) {
    const program = new PatientProgramService(patientID)
    await program.enrollProgram()
    const patientTypeService = new PatientTypeService(patientID, -1)

    patientTypeService.setPatientType(patientType)
    patientTypeService.setLocationName(clinic)

    await patientTypeService.createEncounter()
    await patientTypeService.save()
}

/**
 * Present a modal to show drug chart
 */
async function showStockManagementChart() {
    if((await ART_GLOBAL_PROP.drugManagementEnabled())){
        const drugModal = await modalController.create({
            component: DrugModalVue,
            cssClass: "large-modal",
            backdropDismiss: false
        });
        drugModal.present() 
        await drugModal.onDidDismiss()
    }
}

function orderToString(order: Order, showDate = true) {
    const test = order.tests[0];
    const result = test.result[0];
    const date = showDate ? `<br> Result date: &nbsp; ${HisDate.toStandardHisDisplayFormat(result.date)}` : ''
    const status = OrderService.isHighViralLoadResult(result) ? '(<b style="color: #eb445a;">High</b>)' : ''
    return `${test.name} &nbsp; ${result.value_modifier}${result.value} ${status} ${date}`;
}

export async function init(context='') {
    await selectActivities(PRIMARY_ACTIVITIES)
    if (context === 'HomePage') {
        await showStockManagementChart()
    }
}

export async function onRegisterPatient(patientID: number, person: any, attr: any, router: any, route: any) {
    await enrollInArtProgram(patientID, person.patient_type, person.location)
    if (person.relationship === 'Yes') {
        addWorkflowTask(patientID, {
            from: 'Patient Registration',
            to: `/guardian/registration/${patientID}`
        })
    }
    if ((await ART_GLOBAL_PROP.filingNumbersEnabled()) && person.patient_type === "New patient") {
        addWorkflowTask(patientID, {
            from: person?.relationship === 'Yes' 
                ? 'Guardian Registration'
                : 'Patient Registration',
            to: `/art/filing_numbers/${patientID}?assign=true`
        })
    }
    nextTask(patientID, router, route)
    return true
}

export async function getPatientDashboardAlerts(patient: any): Promise<GeneralDataInterface[]>{
    const sideEffects: Observation[] = await PatientAlerts.alertSideEffects(patient.getID())
    const bmi = await patient.getBMI()
    return [
        {
            label: "Side effects",
            value: `${sideEffects.length}`,
        },
        {
            label: "Patient BMI is",
            value: `${bmi.result}`
        }
    ]
}

export function formatPatientProgramSummary(data: any) {
    const [day, month, year] = data.art_start_date.split('/')
    const durationOnArt = !data.art_start_date.match(/n\/a/i)
        ? `(${dayjs(Service.getSessionDate()).diff(`${year}-${month}-${day}`, 'months')} Month(s))`
        : ''
    return  [
        { label: "ART- Start Date", value: `${data.art_start_date} ${durationOnArt}`},
        { label: "ARV Number", value: `${data.arv_number} | Regimen: ${data.current_regimen}` },
        { label: "File Number", value: data.filing_number.number},
        { label: "Current Outcome", value: data.current_outcome},
    ]
}
/**
 * Loads lab result card data
 * @param patientId 
 * @param date 
 * @returns 
 */
export async function getPatientDashboardLabOrderCardItems(patientId: number, date: string) {
    const data = (await OrderService.getOrders(patientId)).reduce((results: any, order: any) => {
        const tresults = order.tests.filter(
            (t: any) => t.name.match(/HIV/i) && !isEmpty(t.result))
            .map((t: any) => t?.result)
        return results.concat(tresults.reduce((a: any, c: any) => a.concat(c), []))
    }, [])
    .map((result: any) => {
        const vlStatus = OrderService.isHighViralLoadResult(result) ? '(<b style="color: #eb445a;">High</b>)' : ''
        return {
            label: `${result.indicator.name} &nbsp ${result.value_modifier}${result.value} ${vlStatus}`,
            value: HisDate.toStandardHisDisplayFormat(result.date),
            other: {
                wrapTxt: true
            }
        }
    }).sort((a: any, b: any) => new Date(a.value) > new Date(b.value) ? -1 : 1)
    if (data.length >= 2) {
        const [result1, result2] = data
        return [result1, result2]
    }
    return data
}

export function confirmationSummary(patient: Patientservice, program: any) {
    const patientID = patient.getID()
    return {
        'PROGRAM INFORMATION': async () => {
            const data: any = []
            const params = await WorkflowService.getNextTaskParams(patientID)
            data.push({
              label: "Next Task",
              value: params.name ? `${params.name}` : 'NONE',
            })
            await ProgramService.getProgramInformation(patientID)
              .then(
              (program) => {
                data.push({
                  label: "ART Duration",
                  value: `${program.art_duration} month(s) `,
                })
              }
            );
            await ProgramService.getFastTrackStatus(patientID).then(
              (task) => {
                data.push({
                  label: "On Fast Track",
                  value: task["Continue FT"] === true ? "Yes" : "No",
                });
              }
            );
            const appointMentObs: Observation[] 
                = await ObservationService.getObservations(
                patientID, ConceptService.getCachedConceptID('appointment date')
            );
            if (appointMentObs.length > 0) {
              const nextAPPT = HisDate.toStandardHisDisplayFormat(appointMentObs[0].value_datetime);
              data.push({
                label: "Next Appointment",
                value: nextAPPT,
              });
            }
            return data
        },
        'PATIENT IDENTIFIERS': async () => {
            const identifiers = [{
                label: "ARV Number",
                value: patient.getArvNumber(),
            },
            {
                label: "NPID",
                value: patient.getNationalID(),
            }]

            if((await ART_PROP.filingNumbersEnabled())){
                identifiers.push({
                    label: "Filing Number",
                    value: patient.getFilingNumber()
                })
            }
            return identifiers;
        },
        'ALERTS': () => getPatientDashboardAlerts(patient),
        'LAB ORDERS': async () => {
            const data: any = []
            await OrderService.getOrders(patient.getID())
                .then((orders) => {
                    const VLOrders = OrderService.getViralLoadOrders(orders);
                    for(let i = 0; i < 2 && i < VLOrders.length; i++) {
                        data.push({
                            value: orderToString(VLOrders[i]),
                            label: ``,
                        });
                    }
                });
            return data
        },
        'OUTCOME': () => {
            return [
                { 
                    label: 'Current Outcome', 
                    value: program.outcome || 'N/A'
                }
            ]
        },
        'GUARDIAN': async () => {
            const req = await RelationshipService
                .getGuardianDetails(
                    patient.getID()
                )
            if (req && req.length > 0) {
                const data: any = [];
                req.forEach(element => {
                   data.push( {
                        label: element.name,
                        value: element.relationshipType
                   }) 
                   data.push({

                        label: "Phone",
                        value: element.phoneNumber
                   })
                });
                return data
            } 
            return []
        }
    }
}

