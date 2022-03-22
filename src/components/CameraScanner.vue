
<script lang="ts">
import { defineComponent } from "vue";
import { Patientservice } from "@/services/patient_service"
import { AppInterface } from "@/apps/interfaces/AppInterface";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import { filter } from 'lodash';

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
      this.filterNationalID(barcodeData);
      const data = await Patientservice.findByOtherID(28, this.clientID)
      
      if(data.length == 0) {
        toastWarning('Client Malawi National ID not found');
        this.searchPatientByNameGender();
      }
      else 
      if (data.length == 1){
        toastSuccess("Patient found");
        this.filterPatientData(data);
        const searchParam = `person_id=${this.patientID}`
        this.$router.push(`/patients/confirm?${searchParam}`)
      }
    } 
    else
    {
      const data = await Patientservice.findByOtherID(3, barcodeData.text);
      if(data.length == 0) {
        toastWarning('Patient not found');
        this.goHome();
      }
      else
      if(data.length == 1)
      {
        this.filterPatientData(data);
      }
    }

  }).catch(err => {
    console.log('Error', err);
    toastWarning('Fails to scan');
    this.goHome();
    // alert('Error'+ JSON.stringify(err));
  });
    },
    async filterPatientData(data: any) {
      if(data[0].person.names[0].given_name)     
        this.firstname = data[0].person.names[0].given_name;

      if(data[0].person.names[0].family_name)
        this.surname = data[0].person.names[0].family_name;

      if(data[0].person.gender)
        this.gender = data[0].person.gender;

      if(data[0].person.birthdate)
        this.birthday = new Date(data[0].person.birthdate).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2/$1/$3');

      if(data[0].patient_id)
        this.patientID =data[0].patient_id;

        const identfier2 =data[0].patient_identifiers.filter(function (el: any){
          return el.identifier_type == 3;
        });
        this.clientID = identfier2[0].identifier;
      
        // this.clientID = data[0].patient_identifiers[0].identifier;

      if(data[0].person.addresses[0].address2)
        this.district = data[0].person.addresses[0].address2;

    
        const identfier =data[0].patient_identifiers.filter(function (el: any){
          return el.identifier_type == 28;
        });
        this.nationalID = identfier[0].identifier;

       
    },
    async goHome() {
      this.$router.push('/home');
    },
    filterNationalID(barcodeData: any){
      this.malawiNationalID =barcodeData.text.split('<');
      this.malawiNationalID = this.malawiNationalID.at(-1).split('~');

      this.clientID = this.malawiNationalID[2];
      this.surname = this.malawiNationalID[1];
      this.firstname = this.malawiNationalID[3].split(',')[0];
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
    }
  
  }
});
</script>
