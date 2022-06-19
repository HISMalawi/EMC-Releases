import { AppEncounterService } from "@/services/app_encounter_service";
import { DrugOrderService } from "@/services/drug_order_service";
import { find, isEmpty } from "lodash";
import HisDate from "@/utils/Date"

export interface AncTreatmentDrugObject {
    'id': number;
    'drug_name': string;
    'dose': string;
    'duration': number;
    'frequency': string;
    'units': string;
}

export const DRUG_FREQUENCIES: Record<string, number> = { 
    'Once a day (OD)' : 1,
    'Twice a day (BD)': 2,
    'Three a day (TDS)': 3,
    'Four times a day (QID)' : 4,
    'Five times a day (5X/D)' : 5,
    'Six times a day (Q4HRS)' : 6,
    'In the morning (QAM)' : 0.5,
    'Once a week (QWK)' : 0.14,
    'Once a month' : 0.03,
    'Twice a month' : 0.071
}

export class AncTreatmentService extends AppEncounterService {
    constructor(patientID: number, providerID: number){
        super(patientID, 25, providerID)
    }

    ttvDrugObj() {
        return {
            'drug_inventory_id': 609,
            'dose': 0.5,
            'equivalent_daily_dose': 0.5,
            'frequency': "Once a day (od)",
            'start_date': this.date,
            'auto_expire_date': this.date,
            'instructions': "Once a day",
            'units': "ml"
        }
    }

    async updateTTvOrder() {
        const dispensed = await this.dispenseTTV()
        if (!isEmpty(dispensed)) {
            const orderID = dispensed[0].order_id
            return DrugOrderService.updateDispensationOrders([{'order_id': orderID, 'quantity' : 1}])
        }
        throw 'Unable to dispense'
    }

    dispenseTTV() {
        return this.createOrders([this.ttvDrugObj()])
    }

    createOrders(orders: any) {
        return DrugOrderService.create({
            'drug_orders': orders,
            'encounter_id': this.getEncounterID(),
        })
    }

    async submitTreatment(drugs: AncTreatmentDrugObject[]) {
        await this.createEncounter()
        const orders = await this.createOrders(drugs.map(o => this.buildDrugOrderObj(o)))
        const dispensation = new AppEncounterService(this.patientID, 54, this.providerID)
        await dispensation.createEncounter()
        drugs.forEach(o => {
            const quantity: number = DRUG_FREQUENCIES[o.frequency] * o.duration
            orders.forEach((order: any) => { 
                if (order.drug_inventory_id === o.id) {
                    order.quantity = quantity
                }
            })
        })
        await DrugOrderService.updateDispensationOrders(orders)
    }

    buildDrugOrderObj(drug: AncTreatmentDrugObject) {
        const startDate = new Date(this.date)
        const expiryDate = startDate.setDate(startDate.getDate() + parseInt(`${drug.duration}`))
        const dose: any = drug.dose || DRUG_FREQUENCIES[drug.frequency]
        const dailyEquivalentDose =  parseFloat(dose) * DRUG_FREQUENCIES[drug.frequency] 
        return {
            'drug_inventory_id': drug.id,
            'dose': dose,
            'equivalent_daily_dose': dailyEquivalentDose,
            'frequency': drug.frequency,
            'start_date': this.date,
            'auto_expire_date': HisDate.toStandardHisFormat(new Date(expiryDate)),
            'instructions': drug.drug_name + ':' + drug.dose + ' ' + drug.units + ' ' + drug.frequency + 'days',
            'units': drug.units
        }
    }
}