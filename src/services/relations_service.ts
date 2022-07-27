import { Service } from "./service";

export class RelationsService extends Service {
    constructor() {
        super()
    }

    static voidRelation(patientID: number, relationID: number, reason: string) {
		return Service.void(`people/${patientID}/relationships/${relationID}`, { reason })
	}

    static getRelations() {
        return super.getJson('types/relationships')
    }

    static createRelation(patientA: number, patientB: number, relationType: number) {
        return super.postJson(`people/${patientA}/relationships`, {
            'relationship_type_id': relationType,
            'relation_id': patientB
        })
    }
}
