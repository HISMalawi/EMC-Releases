import { FolderInterface } from "@/apps/interfaces/AppInterface";
import { UserService } from "@/services/user_service"
import { ART_GLOBAL_PROP } from "@/apps/ART/art_global_props"
import { GLOBAL_PROP } from "@/apps/GLOBAL_APP/global_prop";
import Store from "@/composables/ApiStore"

function globalPropConfig(label: string, prop: string) {
    return {
        name: label,
        pathUrl: `/preferences?label=${label}&property=${prop}`
    }
}

export const PROPERTIES: FolderInterface[] = [
    {
        name: "Drug Management",
        icon: "drug.png",
        condition: async () => UserService.isAdmin() && (await Store.get('IS_ART_DRUG_MANAGEMENT_ENABLED')),
        files: [
            {
                name: "Enter Receipts",
                pathUrl: "/art/stock/enter",
            },
            {
                name: "Enter Product relocation/Disposal",
                pathUrl: "/art/stock/move",
            },
            {
                name: "Enter verified physical stock count",
                pathUrl: "/art/stock/verify",
            },
            {
                name: "Print Barcode",
                pathUrl: "/drug/print",
            },
            {
                name: "Audit Trail",
                pathUrl: "/art/stock/trail",
            },
            {
                name: "Stock report",
                pathUrl: "/art/stock/report",
            }  
        ]
    },
    {
        name: 'System Preferences',
        icon: 'hiv-staging.png',
        condition: () => UserService.isAdmin(),
        files: [
            {
                name: "View Systems settings",
                pathUrl: "/art/preferences"
            },
            globalPropConfig(
                'Activate Extended Lab',
                ART_GLOBAL_PROP.EXTENDED_LABS
            ),
            globalPropConfig(
                'Activate VL routine check',
                ART_GLOBAL_PROP.VL_ROUTINE_CHECK
            ),
            globalPropConfig(
                "Activate Filing Numbers", 
                ART_GLOBAL_PROP.FILING_NUMBERS
            ),
            globalPropConfig(
                "Activate drug management", 
                ART_GLOBAL_PROP.DRUG_MANAGEMENT
            ),
            globalPropConfig(
                "Activate Hypertension screening", 
                ART_GLOBAL_PROP.HTN_ENHANCEMENT
            ),
            globalPropConfig(
                "Activate fast track", 
                ART_GLOBAL_PROP.FAST_TRACK
            ),
            globalPropConfig(
                "Activate 3HP auto select",
                ART_GLOBAL_PROP.THREE_HP_AUTO_SELECT
            ),
            globalPropConfig(
                "Is this a military site?",
                GLOBAL_PROP.MILITARY_SITE
            ),
            globalPropConfig(
                "Ask pills remaining at home",
                ART_GLOBAL_PROP.PILLS_REMAINING
            ),
            globalPropConfig(
                "(DATA CLEANING) Exclude External and Drug refill",
                ART_GLOBAL_PROP.EXCLUDE_EXTERNAL_AND_DRUG_REFILLS
            ),
            globalPropConfig(
                "Scan DBS barcode",
                ART_GLOBAL_PROP.CAN_SCAN_DBS_BARCODE
            ),
            {
                name: "Target lab",
                pathUrl: "/art/preferences/target_lab"
            },
            {
                name: "Activate CxCa Screening",
                pathUrl: "/art/preferences/cervical_cancer_screening"
            },
            {
                name: "Set Hypertension Thresholds",
                pathUrl: "/art/preferences/bp_thresholds"
            },
            {
                name: "Set Clinic Days",
                pathUrl: "/art/preferences/clinic_days"
            },
            {
                name: "Set HTN Age",
                pathUrl: "/art/preferences/htn_age"
            },
            {
                name: "Set Auto Cleaning Alert Days",
                pathUrl: "/art/preferences/notification_period"
            },
            {
                name: "Set Appointment Limit",
                pathUrl: "/art/preferences/appointment/limit"
            },
            {
                name: "Set Filing Numbers Limit",
                pathUrl: "/art/preferences/fn/limit"
            },
            {
                name: "Set Clinic Holidays",
                pathUrl: "/art/preferences/clinic_holidays"
            },
        ]
    }
]