
<script lang="ts">
import { defineComponent } from "vue";
import { Patientservice } from "@/services/patient_service"
import { AppInterface } from "@/apps/interfaces/AppInterface";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop"

export default defineComponent({
  name: "Scanner",
  data() {
    return {
      app: {} as AppInterface,
      patientID: "",
      firstname: "",
      surname: "",
      gender: "",
      birthday: "",
      district: "",
      clientID: "",
      nationalID: "",
      patient: {} as any,
      malawiNationalID: [] as any,
      displayModal: false,
    };
  },
  async mounted() 
  {
    this.scanBarcodeQRcode()
  },
  methods: {
    async scanBarcodeQRcode(){
      await BarcodeScanner.scan().then( async (barcodeData)=> {
        if(barcodeData.text.length > 30) {
          if(!(await GLOBAL_PROP.malawiNationalIDScannerEnabled())){
            toastWarning('Scanning of Malawi National ID is disabled');
            this.goHome();
          }else{
            this.filterNationalID(barcodeData);
            const data = await Patientservice.findByOtherID(28, this.clientID)
            
            if(data.length == 0) {
              toastWarning('Client Malawi National ID not found');
              this.searchPatientByNameGender();
            }
            else {
              toastSuccess("Patient found");
              const searchParam = `person_id=${data[0].patient_id}`
              this.$router.push(`/patients/confirm?${searchParam}`)
            }
          }
        } 
        else
        {
          const data = await Patientservice.findByNpid(barcodeData.text);
          if(data.length == 0) {
            toastWarning('Patient not found');
            this.goHome();
          }
          else{
            this.filterPatientData(data);
          }
        }

      }).catch(err => {
        toastWarning('Fails to scan');
        this.goHome();
      });
    },
    async filterPatientData(data: any){
      const person = await Patientservice.findByID(data[0].patient_id)
      if (!person) {
          return
      }
      this.patient = new Patientservice(person)
      this.firstname = this.patient.getGivenName()
      this.surname = this.patient.getFamilyName()
      this.gender = this.patient.getGender()
      this.birthday = this.patient.getBirthdate()
      this.clientID = this.patient.getMalawiNationalID()
    },
    async goHome() {
      this.$router.push('/home');
    },
    filterNationalID(barcodeData: any){
      this.malawiNationalID =barcodeData.text.split('<');
      this.malawiNationalID = this.malawiNationalID.at(-1).split('~');

      this.clientID = this.malawiNationalID[2];
      this.surname = this.capitaliseFirstLetter(this.malawiNationalID[1].toLowerCase());
      this.firstname = this.capitaliseFirstLetter(this.malawiNationalID[3].split(',')[0].toLowerCase());
      this.gender = this.malawiNationalID[5];
      this.birthday = this.malawiNationalID[6];
    },
    searchPatientByNameGender(){
      this.$router.push({
        path: "/patient/registration",
        query: {
          'given_name': this.firstname,
          'family_name':  this.surname ,  
          gender:   this.gender     ,   
          birthdate:   this.birthday ,
          malawiNationalID: this.clientID ,
          nationalIDStatus: 'true'
        },
      });
    },
    capitaliseFirstLetter(data: string){
     return data.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    }
  }
});
</script>
