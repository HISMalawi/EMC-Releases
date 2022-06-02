import { AppEncounterService } from "@/services/app_encounter_service";
import { PatientProgramService } from "@/services/patient_program_service"
import dayjs from "dayjs";
import HisDate from "@/utils/Date"

export class AncCurrentPregnancyService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 81, providerID)
    }

    async enrollPatient() {
        const program = new PatientProgramService(this.patientID)
        /**
         * TODO: Check if patient is already enrolled first
        */
        await program.enrollProgram()
        program.setStateDate(this.date)
        program.setStateId(118) //Currently on treatment state... Please remove this ID hack if you can
        await program.updateState()
    }

    calculateWeekOfFirstVisit(lnmpDate: string) {
        const theDate: any = new Date(lnmpDate)
        theDate.setDate(theDate.getDate() + 7);
        const today: any = new Date(this.getDate());
        const s = today - theDate;
        return String(Math.floor(s / (24 * 60 * 60 * 7 * 1000)));
    }

    calculateGestationDateFromPeriod(period: number) {
        return dayjs(this.date).subtract(period, 'months').endOf('month').format('YYYY-MM-DD')
    }

    estimateDelieveryDate(lnmpDate: string) {
        const theDate: any = new Date(lnmpDate)
        theDate.setDate(theDate.getDate() + 7);
        theDate.setMonth(theDate.getMonth() + 9);
        return `${theDate.getFullYear()}-${theDate.getMonth()+1}-${theDate.getDate()}`
    }
}
