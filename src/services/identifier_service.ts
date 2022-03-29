import { Service } from "./service";
import ART from "@/apps/ART/app"

export interface DuplicateIdentifiersInterface {
    count: number;
    identifier: string;
}

export class IdentifierService extends Service {
    identifierType: number
    constructor() {
        super()
        this.identifierType = -1
    }
 
    static getIdentifierTypes() {
        return super.getJson('types/patient_identifiers')
    }

    static async voidArvNumber(arvNumber: string) {
        return super.getJson(`programs/${super.getProgramID()}/void_arv_number/${arvNumber}`)
    }

    static async arvNumberExists(arvNumber: string): Promise<boolean> {
        const data = await super.getJson(`programs/${super.getProgramID()}/lookup_arv_number/${arvNumber}`)
        return data.exists
    }

    getIdentifierType() {
        return this.identifierType
    }

    setIdentifierType(type: number) {
        this.identifierType = type
    }

    getDuplicateIndentifiers(): Promise<DuplicateIdentifiersInterface[]> {
        return Service.getJson(`search/identifiers/duplicates`, {
            'type_id': this.identifierType
        })
    }

    getPatientsByIdentifier(identifier: string) {
        return Service.getJson(`search/patients/by_identifier`,{
            'type_id': this.identifierType,
            'identifier': identifier
        })
    }
}
