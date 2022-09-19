(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-614857ee"],{"3be8":function(e,t,n){"use strict";n.r(t);var r=n("7a23");function a(e,t,n,a,i,o){var s=Object(r["resolveComponent"])("his-standard-form");return Object(r["openBlock"])(),Object(r["createBlock"])(s,{cancelDestinationPath:e.cancelDestination,fields:e.fields,onFinishAction:e.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}var i=n("5530"),o=n("1da1"),s=(n("96cf"),n("9441")),c=n("7365"),u=n("bee2"),l=n("d4ec"),d=n("262e"),p=n("2caf"),h=n("cc6f"),f=function(e){Object(d["a"])(n,e);var t=Object(p["a"])(n);function n(e,r){return Object(l["a"])(this,n),t.call(this,e,5,r)}return Object(u["a"])(n)}(h["a"]),m=n("2706"),v=n("d95e"),b=n("b5e4"),O=Object(r["defineComponent"])({components:{HisStandardForm:s["a"]},mixins:[c["a"]],data:function(){return{patientServicesService:{}}},watch:{ready:{handler:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e&&(t.patientServicesService=new f(t.patient.getID(),t.providerID),t.fields=t.getFields());case 1:case"end":return n.stop()}}),n)})))()},immediate:!0,deep:!0}},methods:{onSubmit:function(e,t){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.patientServicesService.createEncounter();case 2:if(r=e.sent,r){e.next=5;break}return e.abrupt("return",Object(b["e"])("Unable to create registration encounter"));case 5:return e.next=7,n.resolveObs(Object(i["a"])({},t));case 7:return a=e.sent,e.next=10,n.patientServicesService.saveObservationList(a);case 10:if(o=e.sent,o){e.next=13;break}return e.abrupt("return",Object(b["e"])("Unable to save observations"));case 13:n.nextTask();case 14:case"end":return e.stop()}}),e)})))()},getFields:function(){var e=this;return[{id:"referral",helpText:"Select service",type:v["b"].TT_SELECT,validation:function(e){return m["a"].required(e)},computedValue:function(t){return{obs:e.patientServicesService.buildValueText("Services ordered",t.value)}},options:function(){return e.mapOptions(["Casualty","Dental","Eye","Family Planing","Medical","OB/Gyn","Orthopedics","Pediatrics","Skin","STI Clinic","Surgical","Other"])}}]}}}),D=n("6b0d"),S=n.n(D);const E=S()(O,[["render",a]]);t["default"]=E},7365:function(e,t,n){"use strict";n("13d5");var r,a=n("7a23"),i=n("ad60"),o=n("2ef0"),s=n("0fa1"),c=n("1da1"),u=(n("99af"),n("96cf"),n("7f35")),l=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(r||(r={}));var d=function(e){return l["b"].toStandardHisDisplayFormat(e)},p={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.outcomeStartDate,e.next=3,Object(u["a"])("Data Integrity Issue Found","Patient died on ".concat(d(n)),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);case 3:return a=e.sent,e.abrupt("return","Cancel"===a?r.GO_TO_PATIENT_DASHBOARD:"Change outcome"===a?r.CHANGE_PATIENT_OUTCOME:r.CONTINUE);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},conditions:{outcome:function(e){return"Patient died"===e},outcomeStartDate:function(e,t){var n=t.sessionDate;return n>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.birthDate,a=t.sessionDate,e.next=3,Object(u["a"])("Data integrity issue found","","Session date ".concat(d(a)," is less than birth date of ").concat(d(n)),[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);case 3:return i=e.sent,e.abrupt("return","Change session date"===i?r.CHANGE_SESSION_DATE:r.GO_TO_PATIENT_DASHBOARD);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},conditions:{birthDate:function(e,t){var n=t.sessionDate;return n<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n,a,i,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.providers,a=t.encounterName,i=t.sessionDate,o=t.apiDate,e.next=3,Object(u["c"])("Please select a provider for ".concat(a),"BDE: ".concat(d(i)," | Current: ").concat(d(o)),n,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);case 3:return s=e.sent,e.abrupt("return","Cancel"===s.action?{value:-1,flowState:r.GO_TO_PATIENT_DASHBOARD}:{value:s.selection,flowState:r.SET_PROVIDER});case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},conditions:{isBdeMode:function(e){return e}}}},h=n("c21d"),f=n("7920"),m=n("b5e4"),v=n("8e8b"),b=Object(a["defineComponent"])({components:{HisStandardForm:f["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),v["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[r.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(o["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),r.CONTINUE},n[r.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),r.EXIT),n[r.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),r.EXIT),n[r.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),r.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(h["a"])(this.facts,p);for(const o in e){var t,n;const s=e[o];if(null!==s&&void 0!==s&&null!==(t=s.actions)&&void 0!==t&&t.alert){var a;const e=this.runflowState(await(null===s||void 0===s||null===(a=s.actions)||void 0===a?void 0:a.alert(this.facts)));if(e===r.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var i;const e=await(null===s||void 0===s||null===(i=s.actions)||void 0===i?void 0:i.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await v["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(m["c"])(""+e)}this.facts.sessionDate=i["a"].getSessionDate(),this.facts.apiDate=i["a"].getCachedApiDate(),this.facts.isBdeMode=i["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",i["a"].isBDE()&&(this.providers=await v["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),r=t.username.toUpperCase();return n<r?-1:n>r?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(o["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var r;const[t]=(null===(r=e.person)||void 0===r?void 0:r.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const O=b;t["a"]=O},7920:function(e,t,n){"use strict";var r=n("7a23");function a(e,t,n,a,i,o){return Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var i=n("9441"),o=Object(r["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:i["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=n("6b0d"),c=n.n(s);const u=c()(o,[["render",a]]);t["a"]=u},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("caad"),n("d3b7"),n("4e82"),n("a4d30"),n("e01a");function r(e,t){var n=[],r=[-1,"",null,void 0];for(var a in t)if(a in e){var i=e[a];r.includes(i)?n.push(!1):n.push(t[a](i,e))}return n.every(Boolean)}function a(e){return e.sort((function(e,t){return e.priority<t.priority?-1:1}))}function i(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=[];for(var s in t){var c=t[s],u=[c.target&&n&&c.target!=n,c.targetEvent&&i&&c.targetEvent!=i];u.some(Boolean)||r(e,c.conditions)&&(c.title=s,c.description&&(c.description.text=c.description.info(e)),o.push(c))}return a(o)}}}]);
//# sourceMappingURL=chunk-614857ee.8d2318f8.js.map