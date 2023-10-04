(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18da28e2"],{"1f9a":function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var i=a("ade3"),s=a("1c74"),n=a("ad60"),r=a("d10e");class o extends s["e"]{constructor(){super()}static create(e){return super.postJson("/person_attributes",e)}}var l=a("4db7");class d extends s["e"]{constructor(){super(),Object(i["a"])(this,"personId",void 0),this.personId=0}getPersonID(){return this.personId}setPersonID(e){this.personId=e}async registerPatient(e,t){await this.createPerson(e),await this.createPersonAttributes(t);const a=await this.createPatient();return await this.printPatient(),a}async registerGuardian(e){return this.createPerson(e)}updatePerson(e){return new r["a"](e).update(this.personId)}async createPerson(e){const t=await new r["a"](e).create();return this.personId=t.person_id,t}createPatient(){return n["a"].createPatient(this.personId)}async createPersonAttributes(e){for(const t in e)await o.create({...e[t],person_id:this.personId})}printPatient(){return new l["a"](this.personId).printNidLbl()}}},"308a":function(e,t,a){"use strict";a.r(t);var i=a("7a23");function s(e,t,a,s,n,r){const o=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(o,{cancelDestinationPath:e.cancelDestination,fields:e.fields,onFinishAction:e.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}a("14d9");var n=a("d95e"),r=a("2706"),o=a("daa6"),l=a("cc6f");class d extends l["a"]{constructor(e,t){super(e,9,t)}}var u=a("3800"),c=a("b5e4"),h=a("b515"),g=a("aee2"),p=a("b446"),v=a("7f35"),b=a("9283"),m=a("5a0c"),_=a.n(m),T=a("2ef0"),f=a("80b5"),y=a("1f9a"),w=a("8e8b"),E=Object(i["defineComponent"])({mixins:[o["a"]],data:()=>({registration:{},prescription:{},dispensation:{},regimens:[],customRegimens:[],vitals:{}}),watch:{ready:{async handler(e){e&&(this.canShowStagingFields=!1,this.registration=new d(this.patientID,this.providerID),this.vitals=new h["a"](this.patientID,this.providerID),this.showStagingWeightChart=!1,this.fields=this.getRegistrationFields())},immediate:!0}},methods:{async onSubmit(e,t){var a;const i={...t};if(await this.registration.createEncounter(),this.hasStaging(e)&&(await this.submitStaging(t),await this.vitals.createEncounter(),await this.vitals.saveObservationList(await this.resolveObs(i,"vitals"))),await this.registration.saveObservationList(await this.resolveObs(i,"reg")),null!==e&&void 0!==e&&null!==(a=e.cell_phone_number)&&void 0!==a&&a.value){const e=new y["a"];e.setPersonID(this.patientID),await e.updatePerson(f["a"].resolvePerson(t)),w["a"].invalidate("ACTIVE_PATIENT")}Object(c["d"])("Clinic registration complete!"),this.nextTask()},buildDateObs(e,t,a){let i={};return i=t.match(/unknown/i)?this.registration.buildValueText(e,"Unknown"):a?this.registration.buildValueDateEstimated(e,t):this.registration.buildValueDate(e,t),i},getRegistrationFields(){return[{id:"followup_agreement",helpText:"Agrees to follow-up",type:n["b"].TT_MULTIPLE_YES_NO,summaryMapValue:({value:e,label:t})=>({value:e,label:t+" followup"}),validation:e=>this.validateSeries([()=>r["a"].required(e),()=>r["a"].anyEmpty(e)]),computedValue:e=>{const t=[];return e.forEach(({label:e,value:a})=>{t.push(this.registration.buildValueCoded(e,a)),t.push(this.registration.buildValueCoded("Agrees to followup",e))}),{tag:"reg",obs:t}},options:e=>Object(T["isEmpty"])(e.followup_agreement)?[{label:"Phone",value:"",other:{values:this.yesNoOptions()}},{label:"Home visit",value:"",other:{values:this.yesNoOptions()}}]:e.followup_agreement},(()=>({...f["a"].getCellNumberField(),config:{customKeyboard:[[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],[["+265","/"],["Delete"]]]},condition:e=>{const t=this.patient.getPhoneNumber();return e.followup_agreement.some(e=>"Phone"===e.label&&"Yes"===e.value&&(!t||/unknown|n\/a/i.test(t)))}}))(),{id:"has_linkage_code",helpText:"HTS Linkage number confirmation",type:n["b"].TT_YES_NO,summaryMapValue:e=>({label:"Has HTS Linkage number?",value:e}),validation:e=>r["a"].required(e),options:()=>[{label:"Does client have an HTS Linkage number?",value:"",values:this.yesNoOptions()}]},{id:"hts_serial_number",helpText:"HTS Linkage Number",type:n["b"].TT_LINKAGE_CODE,validation:e=>r["a"].validateSeries([()=>r["a"].required(e),()=>{var t;return null!==e&&void 0!==e&&null!==(t=e.other)&&void 0!==t&&t.isValidLinkageCode?null:["Invalid Scanform linkage code"]}]),condition:e=>"Yes"===e.has_linkage_code,computedValue:e=>({tag:"reg",obs:this.registration.buildValueText("HTC Serial number",e.value)})},{id:"received_arvs",helpText:"Ever received ARVs for treatment or prophylaxis?",type:n["b"].TT_SELECT,computedValue:({value:e})=>({tag:"reg",obs:this.registration.buildValueCoded("Ever received ART",e)}),validation:e=>r["a"].required(e),options:()=>this.yesNoOptions()},...Object(p["b"])({id:"date_last_taken_arvs",helpText:"Last taken ARVS",required:!0,minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.staging.getDate(),condition:e=>"Yes"===e.received_arvs.value,estimation:{allowUnknown:!0},computeValue:(e,t)=>({date:e,tag:"reg",isEstimate:t,obs:this.buildDateObs("Date ART last taken",e,t)})},this.registration.getDate()),{id:"taken_art_in_last_two_months",helpText:"Taken ARVs in the last two months?",type:n["b"].TT_SELECT,validation:e=>r["a"].required(e),computedValue:({value:e})=>({tag:"reg",obs:[this.registration.buildValueCoded("Has the patient taken ART in the last two months",e)]}),options:()=>this.yesNoUnknownOptions(),condition:e=>"Unknown"===e.year_date_last_taken_arvs.value},{id:"taken_art_in_last_two_weeks",helpText:"Taken ARV's in the last two weeks?",type:n["b"].TT_SELECT,computedValue:({value:e},t)=>{let a="";const i=[];let s=-1;return"Yes"===e?s=14:"Yes"===t.taken_art_in_last_two_months.value&&(s=60),s>0&&(a=b["b"].getDateBeforeByDays(this.registration.getDate(),s),i.push(this.registration.buildValueDateEstimated("Date ART last taken",a))),{date:a,tag:"reg",obs:[...i,this.registration.buildValueCoded("Has the patient taken ART in the last two weeks",e)]}},validation:e=>r["a"].required(e),condition:e=>"Yes"===e.taken_art_in_last_two_months.value,options:()=>this.yesNoUnknownOptions()},{id:"ever_registered_at_art_clinic",helpText:"Ever registered at an ART clinic?",type:n["b"].TT_SELECT,computedValue:({value:e})=>({tag:"reg",obs:this.registration.buildValueCoded("Ever registered at ART clinic",e)}),validation:e=>r["a"].required(e),condition:e=>"Yes"===e.received_arvs.value,options:()=>this.yesNoOptions()},{id:"location_of_art_initialization",helpText:"Location of ART initiation",type:n["b"].TT_SELECT,computedValue:({label:e})=>({tag:"reg",obs:this.registration.buildValueText("Location of ART initiation",e)}),validation:e=>r["a"].required(e),condition:e=>"Yes"===e.ever_registered_at_art_clinic.value,options:(e,t="")=>this.getFacilities(t),config:{showKeyboard:!0,isFilterDataViaApi:!0}},...Object(p["b"])({id:"date_started_art",helpText:"Started ART",required:!0,init:async()=>(await this.initStaging(this.patient),!0),beforeNext:e=>{const t=_()(e).diff(this.patient.getBirthdate(),"years");return this.staging.setAge(t),this.stagingFacts.age=t,this.stagingFacts.ageInMonths=12*t,!0},condition:e=>"Yes"===e.ever_registered_at_art_clinic.value,minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.staging.getDate(),estimation:{allowUnknown:!0,estimationFieldType:p["a"].MONTH_ESTIMATE_FIELD},computeValue:(e,t)=>(this.staging.setDate(e),this.vitals.setDate(e),{date:e,tag:"reg",isEstimate:t,obs:this.buildDateObs("Date ART started",e,t)})},this.registration.getDate()),{id:"previous_art_number",helpText:"ART number at previous location",type:n["b"].TT_TEXT,condition:e=>"Yes"===e.ever_registered_at_art_clinic.value,computedValue:e=>({tag:"reg",obs:this.registration.buildValueText("ART number at previous location",e.value)}),validation:e=>r["a"].required(e)},{id:"has_transfer_letter",helpText:"Has staging information?",type:n["b"].TT_SELECT,validation:e=>r["a"].required(e),computedValue:({value:e})=>({tag:"reg",obs:this.registration.buildValueCoded("Has transfer letter",e)}),options:()=>this.yesNoOptions(),condition:e=>"Yes"===e.ever_registered_at_art_clinic.value},{id:"height",helpText:"Height (CM)",type:n["b"].TT_NUMBER,condition:e=>"Yes"===e.has_transfer_letter.value,computedValue:({value:e})=>({tag:"vitals",obs:this.vitals.buildValueNumber("Height",e)}),validation:e=>this.validateSeries([()=>r["a"].required(e),()=>r["a"].isNumber(e),()=>r["a"].rangeOf(e,40,222)])},{id:"weight",helpText:"Weight (Kg)",type:n["b"].TT_TEXT,unload:async(e,t,a)=>{const i=a.weight.value,s=a.height.value,n=await g["a"].getBMI(i,s,this.patient.getGender(),this.patient.getAge());if(this.stagingFacts.bmi=n["index"],!this.staging.isPedaid())return;const r=await this.patient.getMedianWeightHeight();try{this.stagingFacts.weightPercentile=parseFloat(i)/parseFloat(r["weight"])*100}catch(o){this.stagingFacts.weightPercentile=0}},computedValue:({value:e})=>({tag:"vitals",obs:this.vitals.buildValueNumber("weight",e)}),condition:e=>"Yes"===e.has_transfer_letter.value,validation:e=>this.validateSeries([()=>{const t={...e,other:{modifier:"."}};return this.vitals.isNotEmptyandFloat(t)},()=>r["a"].rangeOf(e,1,300)]),config:{customKeyboard:[[["1","2","3",""],["4","5","6",""],["7","8","9","."],["","0","",""]],[["Delete"]]]}},...this.getStagingFields(),{id:"new_cd4_percent_available",helpText:"CD4 percent available",type:n["b"].TT_SELECT,options:()=>this.yesNoOptions(),condition:e=>"Yes"===e.has_transfer_letter.value,validation:e=>r["a"].required(e)},{id:"cd4_percent",helpText:"CD4 Percent",type:n["b"].TT_TEXT,condition:e=>"Yes"===e.new_cd4_percent_available.value,computedValue:({value:e})=>({tag:"staging",obs:this.registration.buildValueNumber("CD4 percent",parseInt(e.toString().substring(1)),"%")}),onValue:e=>!(e.value&&!this.staging.cd4CountIsValid(e.value))||(Object(c["e"])("Cd4 percentage invalid. Use one modifier or start with either of these symbols: >, < or ="),!1),validation:e=>r["a"].required(e),config:{customKeyboard:[u["b"],[["Delete"]]]}},{id:"type_of_confirmatory_hiv_test",helpText:"Confirmatory HIV test",type:n["b"].TT_SELECT,validation:e=>r["a"].required(e),onValue:async e=>("Not done"===e.value&&await Object(v["a"])("Reminder","UNKNOWN HIV CONFIRMATORY TEST","Please arrange for a confirmatory test",[{name:"Agreed",color:"success",slot:"start"}]),!0),computedValue:({value:e})=>({tag:"reg",obs:this.registration.buildValueCoded("Confirmatory hiv test type",e)}),options:e=>[{label:"Rapid antibody test",value:"HIV rapid test"},{label:"DNA PCR",value:"HIV DNA polymerase chain reaction"},{label:"Not done",value:"Not done",disabled:"Yes"===e.has_linkage_code}]},{id:"confirmatory_hiv_test_location",helpText:"Location of confirmatory HIV test",type:n["b"].TT_SELECT,defaultValue:e=>"Yes"===(e.ever_registered_at_art_clinic&&e.ever_registered_at_art_clinic.value)?"":d.getLocationName(),computedValue:e=>({tag:"reg",obs:this.registration.buildValueText("Confirmatory HIV test location",e.label)}),validation:e=>r["a"].required(e),condition:e=>"Not done"!=e.type_of_confirmatory_hiv_test.value,options:(e,t="")=>this.getFacilities(t),config:{showKeyboard:!0,isFilterDataViaApi:!0}},...Object(p["b"])({id:"date_of_confirmatory_hiv_test",helpText:"Confirmatory HIV test",beforeNext:async(e,t)=>{if("Yes"!=t.received_arvs.value){const t=_()(this.staging.getDate()).diff(e,"days");if(t>=20){const e=await Object(v["a"])("Data inconsistency warning",`Confirmatory Date for newly initiated ART patient is ${t} days ago`,"Are you sure this is accurate?",[{name:"No, Re-enter date",slot:"start",color:"success"},{name:"Yes, its accurate",slot:"end",color:"danger"}]);return"Yes, its accurate"===e}}return!0},condition:e=>e.confirmatory_hiv_test_location.value,required:!0,minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.staging.getDate(),estimation:{allowUnknown:!0,estimationFieldType:p["a"].MONTH_ESTIMATE_FIELD},computeValue:(e,t)=>({date:e,tag:"reg",isEstimate:t,obs:this.buildDateObs("Confirmatory HIV test date",e,t)})},this.registration.getDate()),this.getStagingSummaryField("Staging summary")]}}}),V=a("d959"),D=a.n(V);const k=D()(E,[["render",s]]);t["default"]=k},b515:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("14d9");var i=a("cc6f"),s=a("2ef0");class n extends i["a"]{constructor(e,t){super(e,6,t)}isNotEmptyandNumber(e){return(""+e.value).match(/^-?\d+\.?\d*$/)?null:["Invalid entry for "+e.label]}isNotEmptyandFloat(e){return(""+e.value).match(/^\d{1,3}\.\d{1,5}$/)?null:[`Invalid entry for ${e.label}. Don't forget to add a decimal. e.g. 56.2 ${e.other.modifier}`]}checkMinMax(e,t,a){const i=[];var s,n;parseFloat(""+e.value)<t&&i.push([`${e.label} entered is less than minimum ${t} ${(null===e||void 0===e||null===(s=e.other)||void 0===s?void 0:s.modifier)||""}`]);parseFloat(""+e.value)>a&&i.push([`${e.label} entered is greater than maximum ${a} ${(null===e||void 0===e||null===(n=e.other)||void 0===n?void 0:n.modifier)||""}`]);return i.length>0?i:null}validateAll(e){const t=[];return e.map(e=>{const a=this.validator(e);return Object(s["isArray"])(a)?t.push(a):null}),t.length>0?t:null}mergeErrors(e){const t=[];return e.forEach(e=>{Object(s["isArray"])(e)&&t.push(e)}),t.length>0?t:null}isValidBPReading(e){const t=[],a=(""+e.value).match(/^\d{1,3}\/\d{1,3}$/g)?null:["Invalid BP reading"];if(t.push(a),null==a){const a=(""+e.value).split("/"),i={label:"Systolic",value:a[0]},s={label:"Diastolic",value:a[1]};t.push(this.checkMinMax(s,30,200)),t.push(this.checkMinMax(i,40,250))}return this.mergeErrors(t)}validator(e){const t=[{name:"Weight",validator:e=>{const t=this.isNotEmptyandFloat(e),a=this.checkMinMax(e,2,250);return this.mergeErrors([t,a])}},{name:"Height",validator:e=>{const t=[];return t.push(this.isNotEmptyandNumber(e)),t.push(this.checkMinMax(e,40,220)),this.mergeErrors(t)}},{name:"BP",validator:e=>this.isValidBPReading(e)},{name:"Temp",validator:e=>{const t=this.isNotEmptyandNumber(e),a=this.checkMinMax(e,30,42);return this.mergeErrors([t,a])}},{name:"SP02",validator:e=>{const t=this.checkMinMax(e,40,100);return this.mergeErrors([t])}},{name:"Pulse",validator:e=>{const t=this.checkMinMax(e,50,120);return this.mergeErrors([t])}}],a=t.filter(t=>t.name===e.label);return a.length>0?a[0].validator(e):null}}}}]);
//# sourceMappingURL=chunk-18da28e2.650bce9f.js.map