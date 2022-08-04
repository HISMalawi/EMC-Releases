import { PatientPrintoutService } from "@/services/patient_printout_service"
import { UserService } from "@/services/user_service"
import App from "@/apps/app_lib"
import { GLOBAL_PROP } from "./global_prop"
import { modalController } from "@ionic/vue"
import Summary from "@/components/HomeSummary.vue"
import { PatientDemographicsExchangeService } from "@/services/patient_demographics_exchange_service"
import dayjs from "dayjs"
import { delayPromise } from "@/utils/Timers"

export default {
  GlobalAppSettings: [
    {
      name: 'Session Management',
      icon: 'time.png',
      pathUrl: '/session/date',
      files: [

      ]
    },
    {
      name: 'Portal Settings',
      icon: 'portal.png',
      condition: () => UserService.isAdmin(),
      pathUrl: "/portal/config",
      files: [

      ]
    },
    {
      name: 'Network',
      icon: 'portal.png',
      condition: () => UserService.isAdmin(),
      pathUrl: "/settings/host",
      files: [
        
      ]
    },
    {
      name: 'Location',
      icon: 'location.png',
      files: [
        {
          name: "Print Location",
          pathUrl: "/print/location",
        },
        {
          name: "Set Site Location",
          condition: () => UserService.isAdmin(),
          pathUrl:"/location/update/site",
        },
        {
          name: "Set Site Code",
          condition: () => UserService.isAdmin(),
          pathUrl:"/location/update/code",
        }
      ]
    },
    {
      name: 'User management',
      icon: 'edit-user.png',
      files: [
        {
          name: "New user",
          condition: () => UserService.isAdmin(),
          pathUrl: "/user?activity=add",
        },
        {
          name: "Edit Users",
          condition: () => UserService.isAdmin(),
          pathUrl: "/user?activity=edit",
        },
        {
          name: 'Change Password',
          pathUrl: '/user?activity=edit&update_password=true'
        },
        {
          name: 'System usage report',
          pathUrl: '/users/usage',
          condition: () => UserService.isAdmin()
        }
      ]
    },
    {
      name: 'Data Management',
      icon: 'list.png',
      condition: () => UserService.isAdmin(),
      files: [
        {
          name: "View Duplicates",
          pathUrl: '/view_duplicates'
        },
        {
          name: "Manage Drug Sets",
          pathUrl: "/anc/drugset",
          condition: () => App.getActiveApp() ? App.getActiveApp()?.applicationName === 'ANC'
            : false
        },
        {
          name: "Data Cleaning",
          pathUrl: "/anc/datacleaning",
          condition: () => App.getActiveApp() ? App.getActiveApp()?.applicationName === 'ANC'
            : false
        },
        {
          name: "Data Cleaning",
          pathUrl: "/data_cleaning",
          condition: () => App.getActiveApp() ? App.getActiveApp()?.applicationName === 'ART'
            : false
        },
        {
          name: "Merge patients",
          pathUrl: "/patients/merge",
          condition: () => App.getActiveApp() ? App.getActiveApp()?.applicationName === 'ART'
            : false
        },
        {
          name: "Patient visit stats",
          pathUrl: "/art/patient_visits",
          condition: () => App.getActiveApp() ? App.getActiveApp()?.applicationName === 'ART'
            : false
        },
        {
          name: "Data cleaning verification",
          pathUrl: "/art/data_cleaning_verification",
          condition: () => App.getActiveApp() ? App.getActiveApp()?.applicationName === 'ART'
            : false
        }
      ]
    },
    {
      name: 'DDE Settings', 
      icon: 'programs.png',
      condition: () => UserService.isAdmin(),
      files: [
        {
          name: "DDE Activation",
          pathUrl: `/preferences?label=Activate DDE&property=${GLOBAL_PROP.DDE_ENABLED}`
        },
        {
          name: 'DDE NPID Status',
          action: async () => {
            (await modalController.create({
              component: Summary,
              backdropDismiss: false,
              componentProps: {
                title: 'DDE NPID Status',
                loadData: async(title: any) => {
                  await delayPromise(400)
                  const data = await PatientDemographicsExchangeService.getRemainingNpids()
                  if (data) {
                    const stats = data['npid_status'][0]
                    const id = stats['location_id']
                    const avg = stats['avg_consumption_rate_per_day'] || 1
                    const unassigned = stats['unassigned']
                    const assigned = stats['assigned']
                    const daysLeft = Math.floor(unassigned / avg)
                    const lastUpdated = dayjs(stats['date_last_updated']).format('DD/MMM/YYYY HH:mm:ss')
                    title.value = stats['location_name'] + ' DDE NPID Status'
                    return [
                      { label: 'Location ID', value: id},
                      { 
                        label: 'Estimated days left', 
                        value: daysLeft,
                        color: (() => { 
                          let col = ''
                          if (daysLeft <= 30) {
                            col = '#FFFF00'
                          }
                          if (daysLeft <= 20) {
                            col = '#FFA500'
                          } 
                          if (daysLeft <= 15) {
                            col = '#ff0000'
                          }
                          return col
                        })()
                      },
                      { label: 'Unassigned', value: unassigned },
                      { label: 'Assigned', value: assigned },
                      { label: 'Average consumption per day', value: avg },
                      { label: 'Last update', value: lastUpdated }
                    ]
                  }
                  return []
                },
                onClose: () => modalController.dismiss()
              }
            })).present()
          }
        }
      ]
    },
    {
      name: 'Malawi National ID Settings', 
      icon: 'card.png',
      condition: () => UserService.isAdmin(),
      files: [
        {
          name: "Malawi National ID Scanner Activation",
          pathUrl: `/preferences?label=Activate Scanning of Malawi National ID&property=${GLOBAL_PROP.MALAWI_NATIONAL_ID_SCANNER_ENABLED}`
        }
      ]
    }
  ],
  GlobalProgramActivities: [
    {
      id: "npid",
      name: "National Health ID (Print)",
      description: "Print Patient National Health ID",
      action({ patient }: any) {
        const lbl = new PatientPrintoutService(patient.patient_id)
        return lbl.printNidLbl()
      },
      icon: "barcode.svg"
    },
    {
      id: "lab activities",
      name: "Lab activities",
      description: "Do lab orders",
      icon: 'lab.png'
    },
    {
      id: "demographics",
      name: "Demographics (Print)",
      description: "Print Patient Demographics",
      action: ({ patient }: any) => {
        const lbl = new PatientPrintoutService(patient.patient_id)
        return lbl.printDemographicsLbl()
      },
      icon: "print.png",
      condition: () => App.getActiveApp()?.applicationName !== "CxCa"
    },
    {
      id: "demographics_edit",
      name: "Demographics (Edit)",
      description: "Edit Patient Demographics",
      action: ({ patient }: any, router: any) => {
        router.push({
          path: '/patient/registration', 
          query: { 'edit_person': patient.patient_id }
        })
      },
      icon: "print.png"
    },
    {
      id: 'guardian_edit',
      name: 'Edit Guardians',
      description: 'Edit guardian information',
      action: ({ patient }: any, router: any) => {
        router.push({
          path: `/guardian/registration/${patient.patient_id}`, 
          query: { 'edit_guardian': true}
        })
      },
      icon: "print.png"
    },
    {
      id: "change_session_Date",
      name: "Change session date",
      action: ({ patient }: any, router: any) => {
        router.push({
          path: '/session/date',
          query: { 'patient_id': patient.patient_id}
        })
      },
      description: "Change session date (for retrospective entry)",
      icon: "time.png"
    },
    {
      id: "program_management",
      name: "Program(s)",
      description: "View / update patient's programs",
      action: ({ patient }: any, router: any) => {
        router.push({ path: `/patient/programs/${patient.patient_id}`})
      },
      icon: "programs.png"
    },
    {
      id: "visit_summary",
      name: "Visit Summary (Print)",
      description: "Print Patient Visit Summary",
      action({ patient, visitDate }: any) {
        const lbl = new PatientPrintoutService(patient.patient_id)
        return lbl.printVisitSummaryLbl(visitDate)
      },
      icon: "folder.png",
      condition: () => App.getActiveApp()?.applicationName !== "CxCa"
    },
    {
      id: "enter_lab_result",
      name: "Enter Lab Result",
      description: "Enter Lab Test Result",
      action: ({ patient }: any, router: any) => {
        router.push({ path: `/lab/results/${patient.patient_id}`})
      },
      icon: "enter.png"
    }
  ]
}