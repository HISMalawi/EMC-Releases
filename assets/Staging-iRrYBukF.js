import{_ as o}from"./StagingMixin.vue_vue_type_script_lang-mMyHxAqi.js";import{d as s,T as a,_ as e,r,o as m,c as p}from"./index-hoLU9YgK.js";import"./dynamic-import-helper-9HnG3Mif.js";import"./EncounterMixin.vue_vue_type_script_lang-k7lbT0HV.js";import"./encounter_guidelines-NSNTqAoK.js";import"./GuidelineEngine-syyQoOzo.js";import"./HisStandardForm-rzQ2tZDj.js";import"./TouchScreenForm-3AdFBAzj.js";import"./ToolbarMediumCard-8sJVQ55x.js";import"./Transformers-XlEF3tgP.js";import"./ViewPort-kkmofE00.js";import"./MultiFieldDateHelper-PDSV6pPV.js";import"./KbLayouts-9dqmDWmG.js";import"./HisKbConfigurations-a7K7dizM.js";import"./LocationFieldOptions-eQODqIfz.js";const c=s({mixins:[o],watch:{ready:{async handler(t){t&&(await this.initStaging(this.patient),this.fields=[...this.getStagingFields(),this.getStagingSummaryField()])},immediate:!0}},methods:{async onSubmit(t,i){await this.submitStaging(i),a("Staging information has been saved"),this.nextTask()}}});function d(t,i,f,h,l,g){const n=r("his-standard-form");return m(),p(n,{skipSummary:!0,cancelDestinationPath:t.cancelDestination,fields:t.fields,onFinishAction:t.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}const P=e(c,[["render",d]]);export{P as default};
