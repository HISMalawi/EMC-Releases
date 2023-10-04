(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-da4654ee"],{"0cb1":function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var a=i("cc6f");class n extends a["a"]{constructor(e,t){super(e,57,t)}}},7365:function(e,t,i){"use strict";i("14d9"),i("13d5");var a,n=i("7a23"),s=i("ad60"),o=i("2ef0"),r=i("0fa1"),c=i("7f35"),l=i("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(a||(a={}));const d=e=>l["b"].toStandardHisDisplayFormat(e),u={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+d(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?a.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?a.CHANGE_PATIENT_OUTCOME:a.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const i=await Object(c["a"])("Data integrity issue found","",`Session date ${d(t)} is less than birth date of ${d(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===i?a.CHANGE_SESSION_DATE:a.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:i,apiDate:n})=>{const s=await Object(c["c"])("Please select a provider for "+t,`BDE: ${d(i)} | Current: ${d(n)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===s.action?{value:-1,flowState:a.GO_TO_PATIENT_DASHBOARD}:{value:s.selection,flowState:a.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var p=i("c21d"),h=i("7920"),m=i("b5e4"),b=i("8e8b"),v=Object(n["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),b["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const i={};if(i[a.SET_PROVIDER]=e=>{const[t]=e.split(" "),i=Object(o["find"])(this.providers,{username:t});return i&&(this.providerID=i.person_id),a.CONTINUE},i[a.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),a.EXIT),i[a.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),a.EXIT),i[a.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),a.EXIT),e in i)return i[e](t)},async checkEncounterGuidelines(){const e=Object(p["a"])(this.facts,u);for(const o in e){var t,i;const r=e[o];if(null!==r&&void 0!==r&&null!==(t=r.actions)&&void 0!==t&&t.alert){var n;const e=this.runflowState(await(null===r||void 0===r||null===(n=r.actions)||void 0===n?void 0:n.alert(this.facts)));if(e===a.EXIT)return}if(null!==r&&void 0!==r&&null!==(i=r.actions)&&void 0!==i&&i.selection){var s;const e=await(null===r||void 0===r||null===(s=r.actions)||void 0===s?void 0:s.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await b["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(m["c"])(""+e)}this.facts.sessionDate=s["a"].getSessionDate(),this.facts.apiDate=s["a"].getCachedApiDate(),this.facts.isBdeMode=s["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",s["a"].isBDE()&&(this.providers=await b["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const i=e.username.toUpperCase(),a=t.username.toUpperCase();return i<a?-1:i>a?1:0}).map(e=>{var t;let i=""+e.username;if(!Object(o["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var a;const[t]=(null===(a=e.person)||void 0===a?void 0:a.names)||[];i+=` (${t.given_name} ${t.family_name})`}return i}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const i=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const i=t.obs?t.obs:t;return Array.isArray(i)?e=e.concat(i):"function"===typeof i?e.push(i()):e.push(i),e},[]);return Promise.all(i)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(i){return!1}},validateSeries(e){try{for(const t in e){const i=e[t]();if(i)return i}}catch(t){return[t]}}}});const f=v;t["a"]=f},c21d:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));i("14d9");function a(e,t){const i=[],a=[-1,"",null,void 0];for(const n in t){if(!(n in e))continue;const s=e[n];a.includes(s)?i.push(!1):i.push(t[n](s,e))}return i.every(Boolean)}function n(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function s(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function o(e,t,i="",o="",r="priority"){const c=[];for(const n in t){const s=t[n],r=[s.target&&i&&s.target!=i,s.targetEvent&&o&&s.targetEvent!=o];r.some(Boolean)||a(e,s.conditions)&&(s.title=n,s.description&&(s.description.text=s.description.info(e)),c.push(s))}return"priority"===r?n(c):s(c)}},fabb:function(e,t,i){"use strict";i.r(t);var a=i("7a23");function n(e,t,i,n,s,o){const r=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(r,{fields:e.fields,onFinishAction:e.onSubmit},null,8,["fields","onFinishAction"])}i("14d9");var s=i("d95e"),o=i("7365"),r=i("e86e"),c=i("2706"),l=i("9c73"),d=i("9b7c"),u=i("8158"),p=i("80b5"),h=i("d1ca"),m=i("9283"),b=i("0cb1"),v=i("8e8b"),f=i("b5e4"),g=i("1c74"),_=i("d867"),D=Object(a["defineComponent"])({mixins:[o["a"]],data:()=>({patientID:-1,service:{},fields:[],barcode:"",activityType:"",canScanDBS:!1,isNextBtnDisabled:!0,verifyingBarcode:!1}),async created(){this.canScanDBS=await h["b"].canScanDBS()},watch:{$route:{handler({query:e,params:t}){e&&t&&(this.patientID=t.patient_id,this.activityType=e.type,this.service=new l["a"](this.patientID),this.fields=[this.getClinianGivenNameField(),this.getClinianFamilyNameField(),this.getFacililityLocationField(),this.getReasonForTestField(),this.getTestSpecimensField(),this.getTestSelectionField(),this.getBarcodeInput(),this.getTestCombinationField()])},immediate:!0,deep:!0}},methods:{async onSubmit(e,t){const i=await u["a"].getConceptID("HIV viral load"),a=await u["a"].getConceptID("Plasma");if(t.specimen.concept_id!=a){const e=t.tests.findIndex(e=>e.concept_id===i);if(-1!==e){const i=new b["a"](parseInt(this.patientID),this.providerID),a=await i.createEncounter();if(a){const i=t.tests.splice(e,1)[0],n=this.buildLabOrders(t,i.concept_id,a),s=await d["a"].saveOrdersArray(a.encounter_id,n);if(!s)return Object(f["e"])("Unable to save lab orders");v["a"].invalidate("PATIENT_LAB_ORDERS");const o=await Object(f["a"])("Lab orders and encounter created!, print out your last orders?",{confirmBtnLabel:"Yes",cancelBtnLabel:"No"});o&&await this.service.printSpecimenLabel(s[0].order_id),t.tests.length<=0&&this.$router.push("/patient/dashboard/"+this.patientID)}}}if(t.tests.length>0){const e=await this.service.placeOrder(t);e&&(await this.service.printSpecimenLabel(e[0].order_id),this.$router.push("/patient/dashboard/"+this.patientID))}},buildLabOrders(e,t,i){return[{accession_number:this.barcode,encounter_id:i.encounter_id,tests:[{concept_id:t}],reason_for_test_id:e.reason_for_test_id,target_lab:e.target_lab,date:m["b"].toStandardHisFormat(g["e"].getSessionDate()),requesting_clinician:e.requesting_clinician,specimen:{concept_id:e.specimen.concept_id}}]},async verifyingScanedBarcode(e){if(this.verifyingBarcode=!this.verifyingBarcode,this.verifyingBarcode)return!1;(await _["X"].create({message:"Checking "+e})).present(),this.isNextBtnDisabled=!0;const t=/^([A-Z]{1})?[0-9]{7,8}$/i.test((""+e).trim());if(!t)return Object(f["e"])("Invalid Barcode"),this.verifyingBarcode=!1,_["X"].getTop().then(e=>e&&_["X"].dismiss()),!1;try{if(!await d["a"].accessionNumExists(e))return this.barcode=e,this.isNextBtnDisabled=!1,!0;Object(f["e"])(`Barcode ${e} was already used`)}catch(i){Object(f["c"])("Failed to confirm barcode "+e+", Please try again later",8e3)}this.verifyingBarcode=!1,_["X"].getTop().then(e=>e&&_["X"].dismiss())},getFacililityLocationField(){return{id:"target_lab",helpText:"Requesting location",type:s["b"].TT_SELECT,defaultValue:()=>l["a"].getLocationName(),validation:e=>c["a"].required(e),options:(e,t="")=>Object(r["b"])(t),computedValue:e=>e.label,config:{showKeyboard:!0,isFilterDataViaApi:!0}}},getClinianGivenNameField(){const e=p["a"].getGivenNameField();return e.helpText="Requesting clinician - First name",e.proxyID="requesting_clinician",e.condition=()=>"DRAW_SAMPLES"===this.activityType,e.appearInSummary=()=>!1,e},getClinianFamilyNameField(){const e=p["a"].getFamilyNameField();return e.helpText="Requesting clinician - Last name",e.proxyID="requesting_clinician",e.condition=()=>"DRAW_SAMPLES"===this.activityType,e.summaryMapValue=(e,t)=>({label:"Clinician name",value:`${t.given_name.value} ${e.value}`}),e.computedValue=(e,t)=>`${t.given_name.value} ${e.value}`,e},getReasonForTestField(){return{id:"reason_for_test_id",helpText:"Reason for test",type:s["b"].TT_SELECT,validation:e=>c["a"].required(e),computedValue:e=>u["a"].getCachedConceptID(e.value,!0),options:()=>[{label:"Routine",value:"Routine"},{label:"Targeted",value:"Targeted"},{label:"Confirmatory",value:"Confirmatory"},{label:"Repeat / Missing",value:"Repeat / Missing"},{label:"Stat",value:"Stat"}]}},getTestSpecimensField(){return{id:"specimen",helpText:"Select specimen",type:s["b"].TT_SELECT,condition:()=>"DRAW_SAMPLES"===this.activityType,validation:e=>c["a"].required(e),computedValue:e=>({concept_id:e.value}),options:async()=>{const e=await d["a"].getSpecimens("");return e.map(e=>({label:e.name,value:e.concept_id}))},config:{showKeyboard:!0}}},getTestSelectionField(){let e="";return{id:"tests",helpText:"Select tests",type:s["b"].TT_GRID_SELECTOR,validation:e=>c["a"].required(e),computedValue:e=>e.map(e=>({concept_id:e.value})),options:async(t,i,a)=>{if(t.specimen&&t.specimen.label!=e){e=t.specimen.label;const i=await d["a"].getTestTypesBySpecimen(t.specimen.label);return i.map(e=>({label:e.name,value:e.concept_id,isChecked:!1,other:e}))}return a}}},getBarcodeInput(){return{id:"barcode",helpText:"Scan viral load barcode",type:s["b"].TT_BARCODE,onValue:async e=>await this.verifyingScanedBarcode(e),summaryMapValue:e=>({label:"Scaned Barcode",value:e}),condition:e=>e.tests.some(e=>"HIV viral load"===e.label&&this.canScanDBS)&&"Plasma"!==e.specimen.label,config:{hiddenFooterBtns:["Clear"],overrideDefaultFooterBtns:{nextBtn:{name:"Next",state:{disabled:{default:()=>this.isNextBtnDisabled}}}},showScannedBarcode:!0}}},getTestCombinationField(){return{id:"combine_tests",helpText:"Combine test(s) in one order",type:s["b"].TT_SELECT,computedValue:e=>"Yes"===e.value,condition:e=>e.tests.length>1,validation:e=>c["a"].required(e),options:()=>this.yesNoOptions()}}}}),y=i("d959"),T=i.n(y);const S=T()(D,[["render",n]]);t["default"]=S}}]);
//# sourceMappingURL=chunk-da4654ee.1d75073a.js.map