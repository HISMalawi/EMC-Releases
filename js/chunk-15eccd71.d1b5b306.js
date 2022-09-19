(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15eccd71"],{"1c9e":function(t,e,n){"use strict";n.r(e);var a=n("7a23");function r(t,e,n,r,i,o){var s=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(s,{fields:t.fields,onFinishAction:t.onFinish,skipSummary:!0,cancelDestinationPath:t.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])}var i=n("1da1"),o=(n("caad"),n("2532"),n("96cf"),n("d95e")),s=n("7920"),c=n("2706"),u=n("b5e4"),p=n("7365"),d=n("83af"),l=n("4db7"),h=n("3e53"),m=Object(a["defineComponent"])({mixins:[p["a"]],components:{HisStandardForm:s["a"]},data:function(){return{appointmentDate:"",medicationRunOutDate:"",appointment:{},app:h["a"].getActiveApp()}},watch:{ready:{handler:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t&&(e.appointment=new d["a"](e.patientID,e.providerID),e.init());case 1:case"end":return n.stop()}}),n)})))()},immediate:!0}},methods:{onFinish:function(t,e){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,i,o,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.appointment.createEncounter();case 2:if(a=t.sent,a){t.next=5;break}return t.abrupt("return",Object(u["e"])("Unable to create encounter"));case 5:return t.next=7,n.resolveObs(e,"obs");case 7:return r=t.sent,t.next=10,n.appointment.buildValueDate("Estimated date",n.appointmentDate);case 10:return i=t.sent,r.push(i),t.next=14,n.appointment.saveObservationList(r);case 14:if(o=t.sent,o){t.next=17;break}return t.abrupt("return",Object(u["e"])("Unable to create Obs"));case 17:if(Object(u["d"])("Encounter created"),s=new l["a"](n.patientID),c=["CxCa","ANC"],c.includes(n.app.applicationName)){t.next=23;break}return t.next=23,s.printVisitSummaryLbl();case 23:n.nextTask();case 24:case"end":return t.stop()}}),t)})))()},init:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.appointment.getNextAppointment();case 3:n=e.sent,t.appointmentDate=n.appointment_date,t.medicationRunOutDate=n.drugs_run_out_date,t.fields=t.getFields(),e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](0),Object(u["e"])("Next appointment is not available"),t.gotoPatientDashboard();case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))()},getFields:function(){var t=this;return[{id:"set_appointment",helpText:"Appointments booking",type:o["b"].TT_APPOINTMENTS_ENTRY,validation:function(t){return c["a"].required(t)},computedValue:function(e){return{tag:"obs",obs:t.appointment.buildValueDate("Appointment date",e.value)}},config:{patientAge:this.patient.getAge(),hiddenFooterBtns:["Clear"]},options:function(){return[{label:"",value:"",other:{runOutDate:t.medicationRunOutDate,appointmentDate:t.appointmentDate}}]}}]}}}),f=n("6b0d"),v=n.n(f);const b=v()(m,[["render",r]]);e["default"]=b},7365:function(t,e,n){"use strict";n("13d5");var a,r=n("7a23"),i=n("ad60"),o=n("2ef0"),s=n("0fa1"),c=n("1da1"),u=(n("99af"),n("96cf"),n("7f35")),p=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(a||(a={}));var d=function(t){return p["b"].toStandardHisDisplayFormat(t)},l={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.outcomeStartDate,t.next=3,Object(u["a"])("Data Integrity Issue Found","Patient died on ".concat(d(n)),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);case 3:return r=t.sent,t.abrupt("return","Cancel"===r?a.GO_TO_PATIENT_DASHBOARD:"Change outcome"===r?a.CHANGE_PATIENT_OUTCOME:a.CONTINUE);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},conditions:{outcome:function(t){return"Patient died"===t},outcomeStartDate:function(t,e){var n=e.sessionDate;return n>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.birthDate,r=e.sessionDate,t.next=3,Object(u["a"])("Data integrity issue found","","Session date ".concat(d(r)," is less than birth date of ").concat(d(n)),[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);case 3:return i=t.sent,t.abrupt("return","Change session date"===i?a.CHANGE_SESSION_DATE:a.GO_TO_PATIENT_DASHBOARD);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},conditions:{birthDate:function(t,e){var n=e.sessionDate;return n<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){var n,r,i,o,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.providers,r=e.encounterName,i=e.sessionDate,o=e.apiDate,t.next=3,Object(u["c"])("Please select a provider for ".concat(r),"BDE: ".concat(d(i)," | Current: ").concat(d(o)),n,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);case 3:return s=t.sent,t.abrupt("return","Cancel"===s.action?{value:-1,flowState:a.GO_TO_PATIENT_DASHBOARD}:{value:s.selection,flowState:a.SET_PROVIDER});case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},conditions:{isBdeMode:function(t){return t}}}},h=n("c21d"),m=n("7920"),f=n("b5e4"),v=n("8e8b"),b=Object(r["defineComponent"])({components:{HisStandardForm:m["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),v["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[a.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(o["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),a.CONTINUE},n[a.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),a.EXIT),n[a.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),a.EXIT),n[a.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),a.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(h["a"])(this.facts,l);for(const o in t){var e,n;const s=t[o];if(null!==s&&void 0!==s&&null!==(e=s.actions)&&void 0!==e&&e.alert){var r;const t=this.runflowState(await(null===s||void 0===s||null===(r=s.actions)||void 0===r?void 0:r.alert(this.facts)));if(t===a.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var i;const t=await(null===s||void 0===s||null===(i=s.actions)||void 0===i?void 0:i.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await v["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(f["c"])(""+t)}this.facts.sessionDate=i["a"].getSessionDate(),this.facts.apiDate=i["a"].getCachedApiDate(),this.facts.isBdeMode=i["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",i["a"].isBDE()&&(this.providers=await v["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),a=e.username.toUpperCase();return n<a?-1:n>a?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(o["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var a;const[e]=(null===(a=t.person)||void 0===a?void 0:a.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const D=b;e["a"]=D},7920:function(t,e,n){"use strict";var a=n("7a23");function r(t,e,n,r,i,o){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var i=n("9441"),o=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:i["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),s=n("6b0d"),c=n.n(s);const u=c()(o,[["render",r]]);e["a"]=u},"83af":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("cc6f");class r extends a["a"]{constructor(t,e){super(t,7,e)}async getNextAppointment(){const t=a["a"].getProgramID();return a["a"].getJson(`/programs/${t}/patients/${this.patientID}/next_appointment_date`,{date:this.date})}static async getDailiyAppointments(t){const e=a["a"].getProgramID();return a["a"].getJson(`/programs/${e}/booked_appointments`,{date:t,paginate:!1})}}},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("caad"),n("d3b7"),n("4e82"),n("a4d30"),n("e01a");function a(t,e){var n=[],a=[-1,"",null,void 0];for(var r in e)if(r in t){var i=t[r];a.includes(i)?n.push(!1):n.push(e[r](i,t))}return n.every(Boolean)}function r(t){return t.sort((function(t,e){return t.priority<e.priority?-1:1}))}function i(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=[];for(var s in e){var c=e[s],u=[c.target&&n&&c.target!=n,c.targetEvent&&i&&c.targetEvent!=i];u.some(Boolean)||a(t,c.conditions)&&(c.title=s,c.description&&(c.description.text=c.description.info(t)),o.push(c))}return r(o)}}}]);
//# sourceMappingURL=chunk-15eccd71.d1b5b306.js.map