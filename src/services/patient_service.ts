import { Patient } from '@/interfaces/patient';
import { getFullName } from '@/interfaces/name'
import { getPersonAttribute } from '@/interfaces/personAttribute'
import { getPatientIdentifier } from '@/interfaces/patientIdentifier'
import { ObservationService } from './observation_service';
import { ConceptService } from './concept_service';
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"

export class Patientservice extends Service {
    patient: Patient;
    constructor(patient: Patient) {
        super()
        this.patient = patient;
    }

    public static async search(params: Record<string, string>) {
        return super.getJson(`/search/patients`, params)
    }

    public static findByOtherID(idType: string | number, identifier: string | number) {
        return super.getJson('search/patients/by_identifier', {
            'type_id': idType, identifier
        })
    }

    public static async findByID(patientId: number | string) {
        return super.getJson(`/patients/${patientId}`)
    }

    public static toPatient(json: string): Patient {
        return JSON.parse(json);
    }

    public static patientToJson(value: Patient): string {
        return JSON.stringify(value);
    }

    public static getPatientVisits(patientId: number) {
        return super.getJson(`patients/${patientId}/visits`, {
            'program_id': super.getProgramID()
        })
    }

    async getRecentWeight() {
        const concept = await ConceptService.getConceptID('weight', true)
        const obs = await ObservationService.getObs({
            'person_id': this.getID(),
            'concept_id': concept
        })
        return obs.length >= 1 ? obs[0].value_numeric: null
    }

    getObj() {
        return this.patient
    }

    getID() {
        return this.patient.patient_id
    }


    getPatientInfoString() {
        const data =  [
            this.getFullName(),
            `(${this.getGender()})`,
            this.getBirthdate(),
            `, ${this.getCurrentDistrict()}`
        ]
        return data.join(' ')
    }

    getCurrentDistrict() {
        return this.getAddresses().currentDistrict
    }

    getGender() {
        return this.patient.person.gender
    }

    getAge() {
        return HisDate.getAgeInYears(this.patient.person.birthdate)
    }

    getBirthdate() {
        return this.patient.person.birthdate
    }

    getFullName() {
        return getFullName(this.patient.person.names[0]);
    }

    getNationalID() {
        const ids = this.patient.patient_identifiers.filter(item => item.type.name === 'National id')
        return ids.length >= 1 ? ids[0].identifier : 'Unknown'
    }

    getHomeDistrict() {
        return this.getAddresses().ancestryDistrict
    }

    getHomeVillage() {
        return this.getAddresses().ancestryVillage
    }

    getCurrentVillage() {
        return this.getAddresses().currentVillage;
    }

    getCurrentTA() {
        return this.getAddresses().ancestryTA
    }
    getPhoneNumber() {
        return this.getAttribute(12) //get phone number
    }
    getAttribute(personAttributeTypeID: number) {
        return getPersonAttribute(this.patient.person.person_attributes, personAttributeTypeID);
    }
    getPatientIdentifier(patientIdentifierTypeID: number) {
        return getPatientIdentifier(this.patient.patient_identifiers, patientIdentifierTypeID);
    }
    getAddresses() {
        const addressOBJ = {
            ancestryDistrict: '',
            ancestryTA: '',
            ancestryVillage: '',
            currentDistrict: '',
            currentTA: '',
            currentVillage: '',
        }
        if (this.patient.person.addresses.length > 0) {
            const addresses = this.patient.person.addresses[0];

            addressOBJ.ancestryDistrict = addresses.address2;
            addressOBJ.ancestryTA = addresses.county_district;
            addressOBJ.ancestryVillage = addresses.neighborhood_cell;
            addressOBJ.currentDistrict = addresses.state_province;
            addressOBJ.currentTA = addresses.township_division;
            addressOBJ.currentVillage = addresses.city_village;
        }
        return addressOBJ;
    }

}