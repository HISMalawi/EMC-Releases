import { AppEncounterService } from "@/services/app_encounter_service";

export class AncExaminationService extends AppEncounterService {
    fundusByLmp: number;
    constructor(patientID: number, providerID: number){
        super(patientID, 98, providerID)
        this.fundusByLmp = 0
    }

    async loadFundusByLMP() {
        const res = await AppEncounterService.getJson(`programs/${this.programID}/patients/${this.patientID}`)
        if (res && res.fundus) {
            this.fundusByLmp = res.gestation
        }
    }

    /**
     * Ripped from old Anc architecture
     * @param height
     */
    getEquivalentFundalWeeks(fundalHeight: number) {
        if (fundalHeight <= 12){
              
          return 13
          
        }else if (fundalHeight == 13){
        
          return 14
        
        }else if (fundalHeight == 14){
        
          return 16
        
        }else if (fundalHeight == 15){
        
          return 17
        
        }else if (fundalHeight == 16){
        
          return 18
        
        }else if (fundalHeight == 17){
        
          return 19
        
        }else if (fundalHeight == 18){
        
          return 20
        
        }else if (fundalHeight == 19){
        
          return 21
        
        }else if (fundalHeight == 20){
        
          return 22
        
        }else if (fundalHeight == 21){
        
          return 24
        
        }else if (fundalHeight == 22){
        
          return 25
        
        }else if (fundalHeight == 23){
        
          return 26
        
        }else if (fundalHeight == 24){
        
          return 27
        
        }else if (fundalHeight == 25){
        
          return 28
        
        }else if (fundalHeight == 26){
        
          return 29
        
        }else if (fundalHeight == 27){
        
          return 30
        
        }else if (fundalHeight == 28){
        
          return 32
        
        }else if (fundalHeight == 29){
        
          return 33
        
        }else if (fundalHeight == 30){
        
          return 34
        
        }else if (fundalHeight == 31){
        
          return 35
        
        }else if (fundalHeight == 32){
        
          return 36
        
        }else if (fundalHeight == 33){
        
          return 37
        
        }else if (fundalHeight == 34){
        
          return 38
        
        }else if (fundalHeight == 35){
        
          return 39
        
        }else if (fundalHeight == 36){
        
          return 40
        
        }else if (fundalHeight == 37){
        
          return 42
        
        }else if (fundalHeight > 37){
        
          return 42
        
        }
        return 0
    }

    /**
     * Ripped from old anc architecture
     */
     getMaxFundalHeight(){      
        if (this.fundusByLmp <= 13){
              
          return 12;
          
        }else if (this.fundusByLmp <= 14){
        
          return 13
        
        }else if (this.fundusByLmp <= 16){
        
          return 14
        
        }else if (this.fundusByLmp <= 17){
        
          return 15
        
        }else if (this.fundusByLmp <= 18){
        
          return 16
        
        }else if (this.fundusByLmp <= 19){
        
          return 17
        
        }else if (this.fundusByLmp <= 20){
        
          return 18
        
        }else if (this.fundusByLmp <= 19){
        
          return 21
        
        }else if (this.fundusByLmp <= 22){
        
          return 20
        
        }else if (this.fundusByLmp <= 24){
        
          return 21
        
        }else if (this.fundusByLmp <= 25){
        
          return 22
        
        }else if (this.fundusByLmp <= 26){
        
          return 23
        
        }else if (this.fundusByLmp <= 27){
        
          return 24
        
        }else if (this.fundusByLmp <= 28){
        
          return 25
        
        }else if (this.fundusByLmp <= 29){
        
          return 26
        
        }else if (this.fundusByLmp <= 30){
        
          return 27
        
        }else if (this.fundusByLmp <= 32){
        
          return 28
        
        }else if (this.fundusByLmp <= 33){
        
          return 29
        
        }else if (this.fundusByLmp <= 34){
        
          return 30
        
        }else if (this.fundusByLmp <= 35){
        
          return 31
        
        }else if (this.fundusByLmp <= 36){
        
          return 32
        
        }else if (this.fundusByLmp <= 37){
        
          return 33
        
        }else if (this.fundusByLmp <= 38){
        
          return 34
        
        }else if (this.fundusByLmp <= 39){
        
          return 35
        
        }else if (this.fundusByLmp <= 40){
        
          return 36
        
        }else if (this.fundusByLmp <= 42){
        
          return 37
        
        } else if (this.fundusByLmp > 42){
          return 38
        } else {
            return 0
        } 
      }
}
