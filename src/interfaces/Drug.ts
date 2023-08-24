export interface DrugInterface {
    drug_inventory_id: number;
    dose: number;
    drug?: any;
    dosage_struct?: any;
    order?: any;
    equivalent_daily_dose: number;
    frequency: string;
    start_date: string;
    auto_expire_date: string;
    instructions: string;
    units: string;
    quantity?: number;
}

export interface ARVDrug {
    drug_id: number;
    concept_id: number;
    drug_name: string;
    alternative_drug_name: string,
    am: number;
    noon: number;
    pm: number;
    units: string;
    concept_name: string;
    pack_size: number;
    barcodes: Array<string>,
    regimen_category: string,
    frequency: string,
}

export type Regimen = Record<string, Array<ARVDrug>>;