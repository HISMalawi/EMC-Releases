<template>
    <his-standard-form
      :fields="fields"
      :onFinishAction="onFinish"
      :skipSummary="true"
    />
  </template> 
  <script lang="ts">
  import { defineComponent } from "vue";
  import { FieldType } from "@/components/Forms/BaseFormElements";
  import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
  import Validation from "@/components/Forms/validations/StandardValidations";
  import { NUMBER_PAD_LO } from "@/components/Keyboard/KbLayouts";
  import ApiClient from "@/services/api_client";
  import { infoActionSheet } from "@/utils/ActionSheets";
  import { toastWarning } from "@/utils/Alerts"
  import { loadingController } from "@ionic/vue"
  
  export default defineComponent({
    components: { HisStandardForm },
    methods: {
      async onFinish(formData: any) {
        const application = formData.application.value;
        
        if(application === 'CRVS'){
            this.openCRVSLink();
        }
        
        

      },
      getFields() {
        this.fields = [
          {
            id: "application",
            helpText: "Select Application",
            type: FieldType.TT_SELECT,
            requireNext: false,
            validation: (val: any) => Validation.required(val),
            options: () => [
              {
                label: 'CRVS',
                value: 'CRVS'
              },
            ]
          },
        ];
      },
      openCRVSLink() {
        window.open('https://10.46.0.47:5000', '_blank');
      }
    },
    data() {
      return {
        fields: [] as any,
      };
    },
    async mounted() {
      this.getFields();
    },
  });
  </script>
  