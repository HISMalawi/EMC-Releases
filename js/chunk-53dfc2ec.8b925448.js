(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53dfc2ec"],{3383:function(t,e,n){"use strict";n.r(e);var i=n("7a23");function a(t,e,n,a,o,r){const s=Object(i["resolveComponent"])("his-standard-form"),c=Object(i["resolveComponent"])("ion-page");return Object(i["openBlock"])(),Object(i["createBlock"])(c,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(s,{formLabel:"ART (Re-) Initiation",fields:t.fields,onFinishAction:t.onFinish,cancelDestinationPath:t.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}var o=n("7365"),r=n("d95e"),s=n("d867"),c=n("c39b"),l=n("e86e"),u=n("0011"),d=n("2ef0"),h=Object(i["defineComponent"])({components:{IonPage:s["D"]},mixins:[o["a"]],data:()=>({service:{}}),watch:{ready:{handler(t){t&&(this.service=new c["a"](this.patientID,this.providerID),this.fields=[this.referralForArtInitiation(),this.intendedArtSiteField(),this.artAppointmentDataField(),this.htsLinkageCodeField(),this.hiddenArtReferralOutcomeStatusField()])},immediate:!0}},methods:{onFinish(t,e){this.saveFormEncounterAndProceed({encounterTypeID:this.service.encounterTypeID,formData:t,computedData:e})},referralForArtInitiation(){return{id:"is_referral",helpText:"Referral for ART (Re-)Initiation",type:r["b"].TT_YES_NO,isRequired:()=>!0,finalComputedValue:t=>({obs:this.service.buildValueText("ART referral",t)}),options:()=>[{label:"Do you want to refer client?",value:"",values:this.yesNoOptions()}]}},intendedArtSiteField(){return{id:"art_site",helpText:"Intended Site for ART",type:r["b"].TT_SELECT,isRequired:()=>!0,finalComputedValue:({label:t})=>({obs:this.service.buildValueText("Referral location",t)}),options:(t,e="")=>Object(l["b"])(e),condition:t=>"Yes"===t.is_referral,defaultValue:()=>c["a"].getLocationName(),config:{footerBtns:[{name:"Here",slot:"end",onClickComponentEvents:{setValue:()=>c["a"].getLocationName()},onClick:()=>null}],showKeyboard:!0,isFilterDataViaApi:!0}}},artAppointmentDataField(){return{id:"art_appointment_date",helpText:"Appointment Date for ART Referral",type:r["b"].TT_DATE_PICKER,isRequired:()=>!0,defaultValue:()=>this.service.date,condition:t=>"Yes"===t.is_referral,finalComputedValue:t=>({obs:this.service.buildValueDate("Appointment date",""+t.value)}),config:{minDate:()=>this.service.date,infoItems:t=>[{label:"Set appointment date",value:Object(u["g"])(t)}],hiddenFooterBtns:["Clear"]}}},htsLinkageCodeField(){let t=[];return{id:"linkage_code",helpText:"LINKAGE CODE",type:r["b"].TT_LINKAGE_CODE,isRequired:()=>!0,validation:e=>{var n;return null!==e&&void 0!==e&&null!==(n=e.other)&&void 0!==n&&n.isValidLinkageCode?null:(t=Object(d["uniq"])(t.concat(""+e.value)),["Invalid Scanform linkage code"])},condition:t=>"Yes"===t.is_referral,finalComputedValue:e=>({obs:[this.service.buildValueText("HTC Serial number",""+e.value),...t.map(t=>this.service.buildValueText("Invalid",t))]})}},hiddenArtReferralOutcomeStatusField(){return{id:"art_outcome_field",helpText:"Art outcome",type:r["b"].TT_HIDDEN,defaultValue:()=>this.toOption("Unknown"),finalComputedValue:t=>({obs:this.service.buildValueCoded("Antiretroviral status or outcome",t.value)})}}}}),p=n("6b0d"),f=n.n(p);const m=f()(h,[["render",a]]);e["default"]=m},7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var i,a=n("7a23"),o=n("ad60"),r=n("2ef0"),s=n("0fa1"),c=n("7f35"),l=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(i||(i={}));const u=t=>l["b"].toStandardHisDisplayFormat(t),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:a})=>{const o=await Object(c["c"])("Please select a provider for "+e,`BDE: ${u(n)} | Current: ${u(a)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var h=n("c21d"),p=n("7920"),f=n("b5e4"),m=n("8e8b"),b=n("b432"),v=n("5a0c"),D=n.n(v),g=n("cc6f"),O=n("2ed9"),T=Object(a["defineComponent"])({components:{HisStandardForm:p["a"]},data:()=>({offlineID:null,patient:{},fields:[],patientID:"",providerID:-1,providers:[],encounterStartTime:null,facts:{age:-1,gender:"",birthDate:"",sessionDate:"",apiDate:"",isEnrolledInProgam:!1,encounterName:"N/A",providers:[],isBdeMode:!1,outcome:"",outcomeStartDate:"",village:"",district:"",currentTA:""},formLabel:"",ready:!1}),created(){this.$route.params.patient_id&&(this.offlineID=this.$route.params.patient_id,this.patientID=parseInt(""+this.$route.params.patient_id),this.goOffline()?this.initOfflineData():m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,Object(r["isEmpty"])(this.patient)||Object(b["a"])().cachePatient(this.patient),this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0,this.setStartTime()}).catch(t=>console.log(t))}).catch(()=>{this.goOffline()&&this.initOfflineData()})}))},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{setStartTime(){this.encounterStartTime=(new Date).getTime()},goOffline(){return!b["c"].value||b["b"].value},isOnline(){return b["c"].value},isOfflineMode(){return b["b"].value},initOfflineData(){var t;const e=Object(b["a"])().findByID(this.offlineID),n=null===e||void 0===e||null===(t=e.personParams)||void 0===t?void 0:t.person;n&&(this.facts.birthDate=n.birthdate,this.facts.age=D()(o["a"].getSessionDate()).diff(this.facts.birthDate,"years"),this.facts.district=n.current_district,this.facts.village=n.current_village,this.facts.currentTA=n.current_traditional_authority,this.facts.gender=n.gender,this.ready=!0,this.setStartTime())},async saveFormEncounterAndProceed(t={}){let e="Pending",n=!1,i=null;const a=(new Date).getTime(),o=(a-this.encounterStartTime)/1e3,r=o/60;try{const e=await g["a"].buildValueText("Device",Object(O["f"])()),n=await g["a"].buildValueNumber("Review Time",r);i=[...await this.resolveObs(t.computedData),e,n]}catch(s){return console.error(""+s),Object(f["e"])("Unable to resolve observations")}if(!this.isOfflineMode()){try{const a=new g["a"](this.patientID,t.encounterTypeID,this.providerID);await a.createEncounter()&&await a.saveObservationList(i)&&(e="Success"),"function"===typeof t.callback&&await t.callback(a),n=!0}catch(s){n=!1,/NetworkError|Failed to fetch/i.test(""+s)?e="NetworkError":(e="Exception",console.error("Exception while saving an encounter: "+s))}if("Exception"===e)return Object(f["c"])("An error has occured!")}Object(b["a"])().saveObsOffline({observations:i,id:this.offlineID,uploadStatus:e,encounterName:this.$route.name,encounterTypeID:t.encounterTypeID,meta:t.formData,labOrders:t.labOrders,created:n},n),t.skipNextTask||this.nextTask()},runflowState(t,e=null){const n={};if(n[i.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(r["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(h["a"])(this.facts,d);for(const r in t){var e,n;const s=t[r];if(null!==s&&void 0!==s&&null!==(e=s.actions)&&void 0!==e&&e.alert){var a;const t=this.runflowState(await(null===s||void 0===s||null===(a=s.actions)||void 0===a?void 0:a.alert(this.facts)));if(t===i.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var o;const t=await(null===s||void 0===s||null===(o=s.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.isEnrolledInProgam=t.programID===o["a"].getProgramID(),this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(f["c"])(""+t)}this.facts.currentTA=this.patient.getCurrentTA(),this.facts.district=this.patient.getCurrentDistrict(),this.facts.village=this.patient.getCurrentVillage(),this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.age=this.patient.getAge(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),i=e.username.toUpperCase();return n<i?-1:n>i?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(r["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var i;const[e]=(null===(i=t.person)||void 0===i?void 0:i.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>"string"===typeof t||"number"===typeof t?{label:t,value:t}:t)},patientDashboardUrl(){return"/patient/dashboard/"+this.$route.params.patient_id},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},async nextTask(){try{const t=this.offlineID||this.patientID;await Object(s["b"])(t,this.$router,this.$route)}catch(t){console.error("Workflow error "+t),this.gotoPatientDashboard()}},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},toConditionalOptions(t){const e=[];for(const n of t)("boolean"!==typeof n[1]||n[1])&&e.push(this.toOption(n[0]));return e},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const I=T;e["a"]=I},7920:function(t,e,n){"use strict";var i=n("7a23");function a(t,e,n,a,o,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),s=n("6b0d"),c=n.n(s);const l=c()(r,[["render",a]]);e["a"]=l},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("14d9");function i(t,e){const n=[],i=[-1,"",null,void 0];for(const a in e){if(!(a in t))continue;const o=t[a];i.includes(o)?n.push(!1):n.push(e[a](o,t))}return n.every(Boolean)}function a(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function o(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function r(t,e,n="",r="",s="priority"){const c=[];for(const a in e){const o=e[a],s=[o.target&&n&&o.target!=n,o.targetEvent&&r&&o.targetEvent!=r];s.some(Boolean)||i(t,o.conditions)&&(o.title=a,o.description&&(o.description.text=o.description.info(t)),c.push(o))}return"priority"===s?a(c):o(c)}},c39b:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n("ade3"),a=n("cc6f"),o=n("b89f");class r extends a["a"]{constructor(t,e=-1){super(t,79,e),Object(i["a"])(this,"patientID",void 0),Object(i["a"])(this,"printoutService",new o["a"]),this.patientID=t}async printHtsLinkageId(t){await this.printoutService.printLbl(`/patients/${this.patientID}/labels/print_hts_linkage_code/${t}`)}async getHtsCode(){return await this.getFirstValueText("HTC serial number")||"Un-assigned"}validLinkID(t){const e={A:0,C:1,H:2,K:3,L:4,N:5,P:6,W:7,X:8,Y:9},n=/^(\d{1,4})-(\d{1,3})-(\d{1,2})-([A-CE-HK-NP-Y])$/,i=n.exec(t);if(!i)return["Invalid LinkID format"];const a=parseInt(i[1],10),o=parseInt(i[2],10),r=parseInt(i[3],10),s=i[4];return i[1].length!==a.toString().length||i[3].length!==r.toString().length||i[2].length!==o.toString().length?["Invalid LinkID, book number and row number should not have leading zeros"]:isNaN(a)||isNaN(o)||isNaN(r)||a<1||a>9999||o<1||o>999||r<1||r>99?["Invalid LinkID format on book, page, or row number"]:e.hasOwnProperty(s)?null:["Invalid check digit"]}}},e86e:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"d",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"f",(function(){return c})),n.d(e,"e",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"g",(function(){return d})),n.d(e,"h",(function(){return h}));var i=n("5713"),a=n("2ef0");async function o(t=""){const e=await i["a"].getFacilities({name:t});return e.filter(t=>!Object(a["isEmpty"])(t)&&""!=t.name.trim()).map(t=>({label:t.name,value:t.location_id,other:t}))}async function r(t=""){const e=await i["a"].getLabs({search_name:t});return e.map(t=>({label:t,value:t}))}async function s(t=""){const e=await i["a"].getFacilities({name:t,tag:"Facility adult sections"});return e.map(t=>({label:t.name,value:t.name,other:t}))}async function c(){const t=await i["a"].getSpecialistClinics();return t.map(t=>({label:t.name,value:t.name,other:t}))}async function l(){const t=await i["a"].getRegions();return t.map(t=>({label:t.name,value:t.region_id,other:t}))}async function u(t){const e=await i["a"].getDistricts(t);return e.map(t=>({label:t.name,value:t.district_id,other:t}))}async function d(t,e=""){const n=await i["a"].getTraditionalAuthorities(t,e);return n.map(t=>({label:t.name,value:t.traditional_authority_id,other:t}))}async function h(t,e=""){const n=await i["a"].getVillages(t,e);return n.map(t=>({label:t.name,value:t.village_id,other:t}))}}}]);
//# sourceMappingURL=chunk-53dfc2ec.8b925448.js.map