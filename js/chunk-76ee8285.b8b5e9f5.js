(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76ee8285"],{a16a6:function(e,a,i){"use strict";i.r(a);var t=i("7a23");function s(e,a,i,s,n,o){const c=Object(t["resolveComponent"])("his-standard-form");return Object(t["openBlock"])(),Object(t["createBlock"])(c,{cancelDestinationPath:e.cancelDestination,fields:e.fields,onFinishAction:e.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}var n=i("9441"),o=i("7365"),c=i("cc6f"),r=i("8158");class l extends c["a"]{constructor(e,a){super(e,8,a)}static async getDiagnosis(e="",a=1,i=10){const t=r["a"].getConceptID("Qech outpatient diagnosis list");return c["a"].getJson("diagnosis",{id:t,name:e,page:a,page_size:i})}}class d extends c["a"]{constructor(e,a){super(e,105,a)}}var u=i("2706"),p=i("d95e"),h=i("2ef0"),m=i("9b7c"),b=i("b5e4"),g=Object(t["defineComponent"])({components:{HisStandardForm:n["a"]},mixins:[o["a"]],data:()=>({activeField:"",notesService:{},diagnosisService:{},malariaTestResult:"No"}),watch:{ready:{async handler(e){e&&(this.malariaTestResult=await m["a"].getLatestMalariaTestResult(this.patientID),this.notesService=new d(this.patientID,this.providerID),this.diagnosisService=new l(this.patientID,this.providerID),this.fields=this.getFields())},immediate:!0,deep:!0}},methods:{async onSubmit(e,a){await this.diagnosisService.createEncounter();const i=await this.resolveObs({...a},"diagnosis");await this.diagnosisService.saveObservationList(i);const t=await this.resolveObs({...a},"notes");Object(h["isEmpty"])(t)||(await this.notesService.createEncounter(),await this.notesService.saveObservationList(t)),this.nextTask()},mapListToOptions(e){return Object(h["isEmpty"])(e)?[]:e.map(e=>({label:e.name,value:e.name,other:e.concept_id,isChecked:!1})).sort((e,a)=>e.label<a.label?-1:e.label>a.label?1:0)},async checkMalariaResult(e){const a=e.find(e=>"Malaria"===e.label);return!a||("Positive"===this.malariaTestResult||await Object(b["a"])(`Patient has ${this.malariaTestResult} malaria test result. Do you want to continue?`))},getFields(){return[{id:"primary_diagnosis",helpText:"Select primary diagnosis",type:p["b"].TT_INFINITE_SCROLL_MULTIPLE_SELECT,validation:e=>u["a"].required(e),options:async(e,a="",i=1,t=10)=>this.mapListToOptions(await l.getDiagnosis(a,i,t)),beforeNext:async e=>await this.checkMalariaResult(e),computedValue:e=>({tag:"diagnosis",obs:e.map(({other:e})=>this.diagnosisService.buildValueCodedFromConceptId("Primary diagnosis",e))}),summaryMapValue:({value:e})=>({value:e,label:"Primary diagnosis"}),config:{isFilterDataViaApi:!0,showKeyboard:!0}},{id:"secondary_diagnosis",helpText:"Select secondary diagnosis",type:p["b"].TT_INFINITE_SCROLL_MULTIPLE_SELECT,options:async(e,a="",i=1,t=10)=>this.mapListToOptions(await l.getDiagnosis(a,i,t)),beforeNext:async e=>await this.checkMalariaResult(e),computedValue:e=>!Object(h["isEmpty"])(e)&&{tag:"diagnosis",obs:e.map(({other:e})=>this.diagnosisService.buildValueCodedFromConceptId("Secondary diagnosis",e))},summaryMapValue:({value:e})=>({value:e,label:"Secondary diagnosis"}),config:{showKeyboard:!0,isFilterDataViaApi:!0}},{id:"clinical_notes",helpText:"Clinical notes",type:p["b"].TT_TEXT,computedValue:e=>e&&{tag:"notes",obs:this.notesService.buildValueText("Clinical notes construct",e.value)}}]}}}),v=i("6b0d"),y=i.n(v);const T=y()(g,[["render",s]]);a["default"]=T}}]);
//# sourceMappingURL=chunk-76ee8285.b8b5e9f5.js.map