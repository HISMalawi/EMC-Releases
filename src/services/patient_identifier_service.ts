import { Service } from "./service"

export class PatientIdentifierService extends Service { 
    constructor() {
        super()
    }

    static create(patientId: number, type: number, identifier: string) { 
      return super.postJson('patient_identifiers', {
        'identifier': identifier,
        'identifier_type': type, 
        'patient_id': patientId
    })
  }
}
