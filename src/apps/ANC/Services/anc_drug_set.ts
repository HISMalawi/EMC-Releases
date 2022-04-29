import { Service } from "@/services/service";

export interface AncDrugSetDrugs {
    drug: number;
    quantity: number;
    frequency: string;
}

export interface NewDrugSet {
    datetime?: string;
    name: string;
    description: string;
    drugs: AncDrugSetDrugs[];
}

export class AncDrugSetService extends Service {
    static saveDrugSet(drugSet: NewDrugSet) {
        const data  = {...drugSet}
        data['datetime'] = Service.getSessionDate()
        return this.postJson('/drug_sets', drugSet)
    }
}