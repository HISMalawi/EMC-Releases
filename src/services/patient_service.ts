import { Patient } from '@/interfaces/patient';
import { getPersonAttribute } from '@/interfaces/personAttribute'
import { getPatientIdentifier } from '@/interfaces/patientIdentifier'
import { ObservationService } from './observation_service';
import { ConceptService } from './concept_service';
import { Service } from "@/services/service"
import HisDate from "@/utils/Date"
import {Observation} from "@/interfaces/observation"
import  { BMIService } from "@/services/bmi_service"
import { find, isEmpty } from 'lodash';
import { isValueEmpty } from '@/utils/Strs';
import { PatientIdentifierService } from './patient_identifier_service';
import { PatientPrintoutService } from './patient_printout_service';

export class Patientservice extends Service {
    patient: Patient;
    constructor(patient: Patient) {
        super()
        this.patient = patient;
    }

    public static mergePatients(payload: any) {
        payload['program_id'] = super.getProgramID()
        return super.postJson('dde/patients/merge', payload)
    }
    
    public static voidPatient(patientID: number, reason='') {
        return super.void(`patients/${patientID}`, { reason })
    }

    public static async search(params: Record<string, string>) {
        return super.getJson(`/search/patients`, params)
    }

    public static findByNpid(npid: string, params = {}) {
        return super.getJson(`search/patients/by_npid`, { npid, ...params })
    }

    public static findByOtherID(idType: string | number, identifier: string | number) {
        return super.getJson('search/patients/by_identifier', {
            'type_id': idType, identifier
        })
    }

    public static async findByID(patientId: number | string) {
        return super.getJson(`/patients/${patientId}`)
    }
    public static async assignNHID(patientId: number | string, programID: number) {
        return super.postJson(`/patients/${patientId}/npid`, { 'program_id': programID });
    }
    public static reassignARVNumber(patientIdentifierId: number | string, data: Record<string, any>) {
        return super.putJson("patient_identifiers/" + patientIdentifierId, data)
    }
    public static toPatient(json: string): Patient {
        return JSON.parse(json);
    }

    public static patientToJson(value: Patient): string {
        return JSON.stringify(value);
    }

    public static async getPatientVisits(patientId: number, includeDefaulterDates: boolean) {
        const dates: string[] = await super.getJson(`patients/${patientId}/visits`, {
            'program_id': super.getProgramID(),
            'include_defaulter_dates': (includeDefaulterDates == true)
        })
        if (dates) {
            return dates.sort((a, b) => new Date(a) < new Date(b) ? 1 : 0)
        }
        return []
    }

    getWeightLossPercentageFromTrail(trail: any) {
      const [curWeight, prevWeight] = trail.map((w: any) => w.weight)
      if (!(curWeight && prevWeight)) return false
      const decrease = parseFloat(prevWeight) - parseFloat(curWeight)
      const weightLossPercent = (decrease / prevWeight) * 100
      return Math.round(weightLossPercent)
    }

    getGuardian() {
        return Patientservice.getJson(`people/${this.getID()}/relationships`)
    }

    assignNpid() {
       return Patientservice.assignNHID(this.getID(), Service.getProgramID()) 
    }

    createArvNumber(arvNumber: string) {
        return PatientIdentifierService.create(this.getID(), 4, arvNumber)
    }

    updateARVNumber(newARVNumber: string) {
        const patientIdentifierId = this.getIdentifiers().find(i => i.type.name === "ARV Number")?.patient_identifier_id || ''
        return Patientservice.reassignARVNumber(patientIdentifierId, {
            identifier: newARVNumber
        })
    }

    updateMWNationalId(newId: string) {
        return PatientIdentifierService.create(this.getID(), 28, newId)
    }

    isMale() {
        return ['Male', 'M'].includes(this.getGender())
    }

    isFemale() {
        return ['Female', 'F'].includes(this.getGender())
    }

    async isPregnant() {
        const obs = await ObservationService.getFirstObs(this.getID(), 'Is patient pregnant')
        return obs && (obs.value_coded.match(/Yes/i) ? true : false) 
            && ObservationService.obsInValidPeriod(obs)
    }

    async hasPregnancyObsToday() {
        const date = await ObservationService.getFirstObsDatetime(this.getID(), 'Is patient pregnant')
        return date && HisDate.toStandardHisFormat(date) === Service.getSessionDate() && this.isFemale()
    }

    isChildBearing() {
        const age = this.getAge()
        return this.isFemale() && age >= 12 && age <= 50
    }

    async getInitialWeight() {
        return ObservationService.getLastValueNumber(this.getID(), "weight")
    }

    async getRecentWeight() {
        return ObservationService.getFirstValueNumber(this.getID(), "weight") || -1
    }
    
    async getInitialHeight() {
        return ObservationService.getLastValueNumber(this.getID(), "Height")
    }

    async getRecentHeight() {
        return ObservationService.getFirstValueNumber(this.getID(), "Height") || -1
    }

    async getWeightHistory() {
        try {
            const weights = await ObservationService.getAll(this.getID(), 'weight')
            return weights.map((obs: Observation) => ({
                weight: obs.value_numeric, date: obs.obs_datetime
            }))
        } catch (e) {
            console.warn(e)
            return []
        }
    }
    async getCompleteTBTherapyHistory() {
        const data = await ObservationService.getAll(this.getID(), 'TB treatment history')
        return data.filter((data: any) => {
         return data.value_text.match(/Complete/i);
        });
    }

    async getInitialBMI() {
        return ObservationService.getLastValueNumber(this.getID(), "BMI")
    }

    async getBMI() {
        //TODO: weight and height should have optional parameters to get weight and height
        const weight = await this.getRecentWeight()
        const height = await this.getRecentHeight()

        if (!(weight && height)) return 0

        const gender = this.isMale() ? 'M' : 'F'
        const bmi: any = await BMIService.getBMI(weight, height, gender, this.getAge())

        return bmi
    }

    async calculateWeightPercentile() {
        const currentWeight = await this.getRecentWeight()
        const medianWeightHeight = await this.getMedianWeightHeight()
        try {
            return (parseFloat(currentWeight) / (parseFloat(medianWeightHeight["weight"])) * 100)
        } catch (e) {
            return 0;
        }
    }

    async getMedianWeightHeight() {
        return Service.getJson(`patients/${this.getID()}/median_weight_height`)
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

    getAgeInMonths() {
        return this.getAge() * 12
    }

    getBirthdate() {
        return this.patient.person.birthdate
    }

    getGivenName() {
        return this.patient.person.names[0].given_name
    }

    getFamilyName() {
        return this.patient.person.names[0].family_name
    }

    private normaliseName(name: string) {
        return name.replace(/n\/a|unknown|null|undefined/gi, '').trim()
    }

    async printNationalID() {
        return new PatientPrintoutService(this.getID()).printNidLbl()
    }

    getFullName() {
        try {
            const name = this.patient.person.names[0]
            const firstName = name.given_name;
            const lastName = name.family_name;
            const middleName = name.middle_name;
            return this.normaliseName(`${firstName} ${middleName} ${lastName}`)
        } catch (e) {
            console.error(e)
            return 'Unknown'
        }
    }

    getDocID() {
        const id = this.findIdentifierByType('DDE person document ID')
        return id.match(/unknown/i) ? null : id
    }

    getNationalID() {
        return this.findIdentifierByType('National id')
    }

    getMWNationalID() {
        return this.findIdentifierByType('Malawi National ID')
    }
    
    getArvNumber() {
        return this.findIdentifierByType('ARV Number')
    }

    hasActiveFilingNumber() {
        return this.hasIdentifierType('Filing number')
    }

    hasDormantFilingNumber() {
        return this.hasIdentifierType('Archived filing number')
    }

    private hasIdentifierType(identifierType: string) {
        const id = find(this.patient.patient_identifiers, { 
            type: { 
                name : identifierType
            }
        })
        return id ? true : false
    }

    getFilingNumber() {
        const finder = this.patient
            .patient_identifiers
            .filter((i: any) => i.type.name === 'Filing number' 
                || i.type.name === 'Archived filing number')
        return !isEmpty(finder) ? finder[0].identifier : 'N/A'
    }

    private findIdentifierByType(type: string) {
        return this.patient.patient_identifiers
            .filter((i: any) => i.type.name === type)
            .sort((a: any, b: any) => a['date_created'] < b['date_created'] ? 1 : 0)
            .reduce((defaultID, curID) => defaultID === 'Unknown' ? curID.identifier : defaultID, 'Unknown')
    }

    getIdentifiers() {
        return this.patient.patient_identifiers
    }

    getHomeDistrict() {
        return this.getAddresses().ancestryDistrict
    }

    getHomeTA() {
        return this.getAddresses().ancestryTA
    }

    getHomeVillage() {
        return this.getAddresses().ancestryVillage
    }

    getCurrentVillage() {
        return this.getAddresses().currentVillage;
    }

    getCurrentTA() {
        return this.getAddresses().currentTA
    }

    getClosestLandmark() {
        return this.getAttribute(19)
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

    patientIsComplete() {
        return [
            this.getGender(),
            this.getBirthdate(),
            this.getGivenName(),
            this.getFamilyName(),
            ...Object.values(this.getAddresses())
        ].every((a: any) => !isValueEmpty(a))
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