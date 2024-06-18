var M=Object.defineProperty;var f=(s,e,t)=>e in s?M(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var u=(s,e,t)=>(f(s,typeof e!="symbol"?e+"":e,t),t);import{P as l}from"./program_service-dfa5bbb7.js";import{i as O}from"./common-94ac9539.js";import{P as E}from"./index-95d3a767.js";import{a as p,d as b}from"./his_date-3ca53c6f.js";import{C as h,O as c}from"./form-c5c112ea.js";import{l as d,al as L,S as R}from"./index-1c16650e.js";import{U as V}from"./user_service-6565a8e9.js";import{P as D}from"./patient_service-29b1e70e.js";import{S as P}from"./services-f7c3fb9d.js";class S{static create(e){const t={...e};return"program_id"in t||Object.assign(t,{program_id:E}),"encounter_datetime"in t||Object.assign(t,{encounter_datetime:p()}),d.postJson("/encounters",t)}static voidEncounter(e,t="Unknown"){return d.void("/encounters/".concat(e),{reason:t})}static getSavedEncounters(e,t=E){return d.getJson("programs/".concat(t,"/patients/").concat(e,"/saved_encounters"))}static getEncounters(e,t={}){return d.getJson("/encounters",{program_id:E,patient_id:e,paginate:!1,...t})}}class y{static buildLabOrders(e,t){return t.map(r=>{const a=h.getCachedConceptID(r.reason,!0),n={accession_number:r.accessionNumber,encounter_id:e.encounter_id,tests:[{concept_id:r.concept_id}],reason_for_test_id:a,target_lab:P.getLocationName(),date:p(),requesting_clinician:P.getUserName()};return r.specimenConcept&&(n.specimen={concept_id:r.specimenConcept}),n})}static saveOrdersArray(e,t){return this.create({encounter_id:e,orders:t})}constructor(){}static create(e){return d.postJson("/lab/orders",e)}static getOrders(e,t={}){return d.getJson("/lab/orders",{patient_id:e,...t})}static getSpecimens(e){return d.getJson("/lab/specimen_types",{test_type:e})}}class i extends c{constructor(t,r,a=-1){super();u(this,"encounterTypeID");u(this,"programID");u(this,"encounterID");u(this,"providerID");u(this,"patientID");u(this,"date");this.encounterTypeID=r,this.patientID=t,this.encounterID=0,this.date=c.getSessionDate(),this.providerID=a,this.programID=E}getDate(){return this.date}setDate(t){this.date=t}setEncounterID(t){this.encounterID=t}getEncounterID(){return this.encounterID}getFirstValueCoded(t){return i.getFirstValueCoded(this.patientID,t,this.date)}getFirstValueNumber(t){return i.getFirstValueNumber(this.patientID,t,this.date)}getFirstValueDatetime(t){return i.getFirstValueDatetime(this.patientID,t,this.date)}async buildObs(t,r){const a={...r,person_id:this.patientID,obs_datetime:this.date};return a.concept_id=await h.getConceptID(t),typeof r.value_coded=="string"&&(a.value_coded=await h.getConceptID(r.value_coded)),a}buildValueText(t,r){return i.buildValueText(t,r,this.date)}buildValueCoded(t,r){return i.buildValueCoded(t,r,this.date)}buildGroupValueCoded(t,r,a){return i.buildGroupValueCoded(t,r,a,this.date)}buildValueCodedFromConceptId(t,r){return i.buildValueCodedFromConceptId(t,r,this.date)}buildValueNumber(t,r,a=null,n=null){return i.buildValueNumber(t,r,a,n,this.date)}buildValueDate(t,r){return i.buildValueDate(t,r,this.date)}buildValueDateEstimated(t,r){return this.buildObs(t,{value_datetime:r,value_text:"Estimated"})}buildDateObs(t,r,a){return/unknown/i.test(r)?this.buildValueText(t,"Unknown"):a?this.buildValueDateEstimated(t,r):this.buildValueDate(t,r)}async saveObservationList(t){return c.saveObsArray(this.encounterID,t)}async saveValueTextObs(t,r){const a=await c.buildValueText(t,r);return this.saveObs(a)}async saveValueCodedObs(t,r){const a=await c.buildValueCoded(t,r);return this.saveObs(a)}async saveValueNumericObs(t,r,a=null){const n=await c.buildValueNumber(t,r,a);return this.saveObs(n)}async saveValueDatetimeObs(t,r){const a=await c.buildValueDate(t,r,c.getSessionDate());return this.saveObs(a)}async createEncounter(){const t={encounter_type_id:this.encounterTypeID,patient_id:this.patientID,encounter_datetime:this.date};this.providerID!=-1&&(t.provider_id=this.providerID);const r=await S.create(t);if(r)return this.encounterID=r.data.encounter_id,r.data}saveObs(t){return i.saveObs(this.encounterID,t)}}class q extends l{constructor(t){super();u(this,"patientId");u(this,"programId");u(this,"stateId");u(this,"patientProgramId");u(this,"programDate");u(this,"stateDate");u(this,"removedStates",["Pre-ART (Continue)","On antiretrovirals","Treatment never started","Transferred internally","Discharged uninfected","Exposed Child (Continue)","Patient transferred in"]);this.patientId=t,this.patientProgramId=-1,this.programId=E,this.stateId=-1,this.programDate=p(),this.stateDate=""}getProgramId(){return this.programId}getStateDate(){return this.stateDate}getProgramDate(){return this.programDate}getPatientProgramId(){return this.patientProgramId}getPrograms(){return l.getPatientPrograms(this.patientId)}async getProgram(){const t={patientID:-1,programID:-1,program:"N/A",outcome:"N/A",startDate:"",endDate:""},r=await this.getPrograms();if(O(r))return t;const a=r.data.filter(n=>n.program.program_id===E).map(n=>{const o=n.patient_states;let m="",C="",A="N/A";if(!O(o)){const g=o.length-1;m=o[g].start_date,C=o[g].end_date,A=o[g].name}return{patientID:n.patient_id,programID:n.program_id,program:n.program.name,outcome:A,startDate:m,endDate:C}});return O(a)?t:a[0]}getProgramStates(){return l.getPatientStates(this.patientId,this.programId)}async getProgramOutcomes(){const t=(await l.getProgramWorkflows(this.programId)).data;return t.length>0?t[0].states:[]}voidProgram(t){return l.voidProgram(this.patientProgramId,t)}voidState(t){return l.voidState(this.patientId,this.programId,this.stateId,t)}enrollProgram(){return l.enrollProgram(this.patientId,this.programId,this.programDate)}printTransferout(t){}async transferOutEncounter(t,r=""){const a=new i(this.patientId,119);if(a.setDate(this.stateDate),!await a.createEncounter())throw"Unable to transfer out encounter";return r&&await a.saveValueTextObs("Reason for transfer out",r),a.saveValueTextObs("Transfer to",t.name)}updateState(){return l.createState(this.patientId,this.programId,{state:this.stateId,date:this.stateDate})}setProgramDate(t){this.programDate=t}setStateDate(t){this.stateDate=t}setPatientProgramId(t){this.patientProgramId=t}setProgramId(t){this.programId=t}setStateId(t){this.stateId=t}}class j extends i{constructor(e,t){super(e,6,t)}isNotEmptyandNumber(e){return"".concat(e.value).match(/^-?\d+\.?\d*$/)?null:["Invalid entry for ".concat(e.label)]}isNotEmptyandFloat(e){var t;return"".concat(e.value).match(/^\d{1,3}\.\d{1,5}$/)?null:["Invalid entry for ".concat(e.label,". Don't forget to add a decimal. e.g. 56.2 ").concat(((t=e.other)==null?void 0:t.modifier)||"")]}checkMinMax(e,t,r){var n,o;const a=[];return parseFloat("".concat(e.value))<t&&a.push(["".concat(e.label," entered is less than minimum ").concat(t," ").concat(((n=e==null?void 0:e.other)==null?void 0:n.modifier)||"")]),parseFloat("".concat(e.value))>r&&a.push(["".concat(e.label," entered is greater than maximum ").concat(r," ").concat(((o=e==null?void 0:e.other)==null?void 0:o.modifier)||"")]),a.length>0?a:null}validateAll(e){const t=[];return e.map(r=>{const a=this.validator(r);return Array.isArray(a)?t.push(a):null}),t.length>0?t:null}mergeErrors(e){const t=[];return e.forEach(r=>{Array.isArray(r)&&t.push(r)}),t.length>0?t:null}isValidBPReading(e){const t=[],r="".concat(e.value).match(/^\d{1,3}\/\d{1,3}$/g)?null:["Invalid BP reading"];if(t.push(r),r==null){const a="".concat(e.value).split("/"),n={label:"Systolic",value:a[0]},o={label:"Diastolic",value:a[1]};t.push(this.checkMinMax(o,30,200)),t.push(this.checkMinMax(n,40,250))}return this.mergeErrors(t)}validator(e){const r=[{name:"Weight",validator:a=>{const n=this.isNotEmptyandFloat(a),o=this.checkMinMax(a,2,250);return this.mergeErrors([n,o])}},{name:"Height",validator:a=>{const n=[];return n.push(this.isNotEmptyandNumber(a)),n.push(this.checkMinMax(a,40,220)),this.mergeErrors(n)}},{name:"BP",validator:a=>this.isValidBPReading(a)},{name:"Temp",validator:a=>{const n=this.isNotEmptyandNumber(a),o=this.checkMinMax(a,30,42);return this.mergeErrors([n,o])}},{name:"SP02",validator:a=>{const n=this.checkMinMax(a,40,100);return this.mergeErrors([n])}},{name:"Pulse",validator:a=>{const n=this.checkMinMax(a,50,120);return this.mergeErrors([n])}}].filter(a=>a.name===e.label);return r.length>0?r[0].validator(e):null}}class W extends i{constructor(e,t){super(e,53,t)}getFamilyPlanningMethods(){return["ORAL CONTRACEPTIVE PILLS","DEPO-PROVERA","INTRAUTERINE CONTRACEPTION","CONTRACEPTIVE IMPLANT","MALE CONDOMS","FEMALE CONDOMS","TUBAL LIGATION","NONE"]}async getTptTreatmentStatus(){return d.getJson("/patients/".concat(this.patientID,"/tpt_status"))}async patientHitMenopause(){const e=await c.getFirstObs(this.patientID,"Why does the woman not use birth control");return e&&typeof(e==null?void 0:e.value_text)=="string"?!!e.value_text.match(/menopause/i)&&i.obsInValidPeriod(e):!1}async hasTreatmentHistoryObs(){const e=await c.getFirstObs(this.patientID,"Previous TB treatment history");return e&&i.obsInValidPeriod(e)}getDrugSideEffects(){return d.getJson("programs/".concat(E,"/patients/").concat(this.patientID,"/medication_side_effects"),{date:this.date})}getClient(){return i.getFirstValueCoded(this.patientID,"Patient present")}async clientLastScreened(){const e=await d.getJson("last_cxca_screening_details",{id:this.patientID,date:this.date});return!O(e)}async clientDueForCxCa(){const e=await d.getJson("last_cxca_screening_details",{id:this.patientID,date:this.date});if(!O(e)){const t=e.date_screened;return b(this.date).diff(t,"years")>=1}return!0}async clientHasHadAHysterectomy(){return await i.getFirstValueCoded(this.patientID,"Reason for NOT offering CxCa")==="Hysterectomy"||await i.getFirstValueText(this.patientID,"Treatment")==="Hysterectomy"}async getTLObs(){const e=r=>r&&r.value_coded==="Tubal ligation"&&i.obsInValidPeriod(r),t=await i.getFirstObs(this.patientID,"Family planning");if(e(t))return e(t);{const r=await i.getFirstObs(this.patientID,"Method of family planning");return e(r)}}async getPreviousDrugs(){const e=await d.getJson("patients/".concat(this.patientID,"/drugs_received"));if(!e)return;const t={};return e.data.forEach(r=>{t[r.drug_inventory_id]=r}),t}familyPlanningMethods(e,t){const a={"ORAL CONTRACEPTIVE PILLS":{"DEPO-PROVERA":"N","INTRAUTERINE CONTRACEPTION":"N","CONTRACEPTIVE IMPLANT":"N","MALE CONDOMS":"Y","FEMALE CONDOMS":"Y","RYTHM METHOD":"N","TUBAL LIGATION":"N",VASECTOMY:"N"},"DEPO-PROVERA":{"ORAL CONTRACEPTIVE PILLS":"N","INTRAUTERINE CONTRACEPTION":"N","CONTRACEPTIVE IMPLANT":"N","MALE CONDOMS":"Y","FEMALE CONDOMS":"Y","RYTHM METHOD":"N","TUBAL LIGATION":"N",VASECTOMY:"N"},"INTRAUTERINE CONTRACEPTION":{"ORAL CONTRACEPTIVE PILLS":"N","DEPO-PROVERA":"N","CONTRACEPTIVE IMPLANT":"N","MALE CONDOMS":"Y","FEMALE CONDOMS":"Y","RYTHM METHOD":"N","TUBAL LIGATION":"N",VASECTOMY:"N"},"CONTRACEPTIVE IMPLANT":{"ORAL CONTRACEPTIVE PILLS":"N","DEPO-PROVERA":"N","INTRAUTERINE CONTRACEPTION":"N","MALE CONDOMS":"Y","FEMALE CONDOMS":"Y","RYTHM METHOD":"N","TUBAL LIGATION":"N",VASECTOMY:"N"},"MALE CONDOMS":{"ORAL CONTRACEPTIVE PILLS":"Y","DEPO-PROVERA":"Y","INTRAUTERINE CONTRACEPTION":"Y","CONTRACEPTIVE IMPLANT":"Y","FEMALE CONDOMS":"Y","RYTHM METHOD":"Y","TUBAL LIGATION":"N",VASECTOMY:"Y"},"FEMALE CONDOMS":{"ORAL CONTRACEPTIVE PILLS":"Y","DEPO-PROVERA":"Y","INTRAUTERINE CONTRACEPTION":"Y","CONTRACEPTIVE IMPLANT":"Y","MALE CONDOMS":"Y","RYTHM METHOD":"Y","TUBAL LIGATION":"N",VASECTOMY:"Y"},"RYTHM METHOD":{"ORAL CONTRACEPTIVE PILLS":"N","DEPO-PROVERA":"N","INTRAUTERINE CONTRACEPTION":"N","MALE CONDOMS":"Y","FEMALE CONDOMS":"Y","CONTRACEPTIVE IMPLANT":"N","TUBAL LIGATION":"N",VASECTOMY:"N"},"TUBAL LIGATION":{"ORAL CONTRACEPTIVE PILLS":"N","DEPO-PROVERA":"N","INTRAUTERINE CONTRACEPTION":"N","MALE CONDOMS":"N","FEMALE CONDOMS":"N","CONTRACEPTIVE IMPLANT":"N","RYTHM METHOD":"N",VASECTOMY:"N"},VASECTOMY:{"ORAL CONTRACEPTIVE PILLS":"N","DEPO-PROVERA":"Y","INTRAUTERINE CONTRACEPTION":"N","MALE CONDOMS":"Y","FEMALE CONDOMS":"N","CONTRACEPTIVE IMPLANT":"Y","RYTHM METHOD":"N","TUBAL LIGATION":"N"},NONE:{"ORAL CONTRACEPTIVE PILLS":"N","DEPO-PROVERA":"N","INTRAUTERINE CONTRACEPTION":"N","MALE CONDOMS":"N","FEMALE CONDOMS":"N","CONTRACEPTIVE IMPLANT":"N","RYTHM METHOD":"N","TUBAL LIGATION":"N"}}[e];return t.map(n=>a[n.label]==="N"?{label:n.label,value:n.value,isChecked:!1,disabled:!0}:{label:n.label,value:n.value,isChecked:n.isChecked,disabled:!1})}}class v{static isLoggedIn(){return!!sessionStorage.apiKey}cachingIsEnabled(){const e=this.getAppConf("dataCaching");return typeof e=="boolean"?e:!0}getAppConf(e){const t=sessionStorage.getItem("appConf");if(t)try{return JSON.parse(t)[e]}catch(r){console.error(r)}return null}isLoggedIn(){return!!sessionStorage.apiKey}}function N(){return new v().cachingIsEnabled()}const _={CURRENT_LOCATION:{get:async()=>L.getCurrentFacility(),canReloadCache:s=>!N()||O(s.state)},ACTIVE_PATIENT:{get:async s=>{const e=await D.findByID(s.patientID);return e?new D(e.data):{}},canReloadCache:({state:s,params:e})=>!N()||!(!O(s)&&typeof e.patientID=="number"&&typeof(s==null?void 0:s.getID)=="function"&&s.getID()===e.patientID)},PROVIDERS:{get:()=>V.getUsers(),canReloadCache:s=>!N()||O(s.state)},PATIENT_LAB_ORDERS:{get:s=>typeof s.patientID=="number"?y.getOrders(s.patientID):[],canReloadCache:({params:s,state:e})=>!N()||!(s.patientID&&Array.isArray(e)&&e.length&&e[0].patient_id===s.patientID)}},Y=_,I=R({}),T=R({}),K={async get(s,e={}){var r,a,n;const t=Y;if(s in t){const o=e||{};return typeof((r=t[s])==null?void 0:r.canReloadCache)=="function"&&((a=t[s])!=null&&a.canReloadCache({params:o,state:I.value[s]}))&&(T.value[s]||(T.value[s]=(n=t[s])==null?void 0:n.get(o)),I.value[s]=await T.value[s],T.value[s]=void 0),I.value[s]}else throw"Store ".concat(s," not found")},set(s,e){return I.value[s]=e,I.value[s]},invalidate(s){I.value[s]=void 0},invalidateAll(){Object.keys(I.value).forEach(s=>{I.value[s]=void 0})}};export{i as A,W as C,S as E,y as O,q as P,K as S,j as V};
