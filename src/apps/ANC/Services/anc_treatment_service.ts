import { AppEncounterService } from "@/services/app_encounter_service";
import { DrugOrderService } from "@/services/drug_order_service";
import { isEmpty } from "lodash";

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
            return DrugOrderService.updateDispensationOrder(orderID, 1)
        }
        throw 'Unable to dispense'
    }

    dispenseTTV() {
        return DrugOrderService.create({
            'drug_orders': [ this.ttvDrugObj() ],
            'encounter_id': this.getEncounterID(),
        })
    }

    async getDrugSets() {
        const data = await AppEncounterService.getJson('drug_sets')
        if (data) {
            return Object.keys(data['set_names'])
                .reduce((sets: Array<any>, setKey: string) => {
                    sets.push({
                        name: data['set_names'][setKey],
                        description: data['set_descriptions'][setKey],
                        drugs: data['drug_sets'][setKey]
                    })
                    return sets
                }, [])
        }
        return []
    }
}