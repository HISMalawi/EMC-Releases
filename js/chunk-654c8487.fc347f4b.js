(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-654c8487"],{7365:function(e,t,n){"use strict";n("13d5");var r,a=n("7a23"),i=n("ad60"),o=n("2ef0"),s=n("0fa1"),c=n("1da1"),u=(n("99af"),n("96cf"),n("7f35")),d=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(r||(r={}));var l=function(e){return d["b"].toStandardHisDisplayFormat(e)},p={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.outcomeStartDate,e.next=3,Object(u["a"])("Data Integrity Issue Found","Patient died on ".concat(l(n)),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);case 3:return a=e.sent,e.abrupt("return","Cancel"===a?r.GO_TO_PATIENT_DASHBOARD:"Change outcome"===a?r.CHANGE_PATIENT_OUTCOME:r.CONTINUE);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},conditions:{outcome:function(e){return"Patient died"===e},outcomeStartDate:function(e,t){var n=t.sessionDate;return n>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.birthDate,a=t.sessionDate,e.next=3,Object(u["a"])("Data integrity issue found","","Session date ".concat(l(a)," is less than birth date of ").concat(l(n)),[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);case 3:return i=e.sent,e.abrupt("return","Change session date"===i?r.CHANGE_SESSION_DATE:r.GO_TO_PATIENT_DASHBOARD);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},conditions:{birthDate:function(e,t){var n=t.sessionDate;return n<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n,a,i,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.providers,a=t.encounterName,i=t.sessionDate,o=t.apiDate,e.next=3,Object(u["c"])("Please select a provider for ".concat(a),"BDE: ".concat(l(i)," | Current: ").concat(l(o)),n,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);case 3:return s=e.sent,e.abrupt("return","Cancel"===s.action?{value:-1,flowState:r.GO_TO_PATIENT_DASHBOARD}:{value:s.selection,flowState:r.SET_PROVIDER});case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},conditions:{isBdeMode:function(e){return e}}}},h=n("c21d"),f=n("7920"),m=n("b5e4"),v=n("8e8b"),b=Object(a["defineComponent"])({components:{HisStandardForm:f["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),v["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[r.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(o["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),r.CONTINUE},n[r.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),r.EXIT),n[r.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),r.EXIT),n[r.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),r.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(h["a"])(this.facts,p);for(const o in e){var t,n;const s=e[o];if(null!==s&&void 0!==s&&null!==(t=s.actions)&&void 0!==t&&t.alert){var a;const e=this.runflowState(await(null===s||void 0===s||null===(a=s.actions)||void 0===a?void 0:a.alert(this.facts)));if(e===r.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var i;const e=await(null===s||void 0===s||null===(i=s.actions)||void 0===i?void 0:i.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await v["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(m["c"])(""+e)}this.facts.sessionDate=i["a"].getSessionDate(),this.facts.apiDate=i["a"].getCachedApiDate(),this.facts.isBdeMode=i["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",i["a"].isBDE()&&(this.providers=await v["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),r=t.username.toUpperCase();return n<r?-1:n>r?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(o["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var r;const[t]=(null===(r=e.person)||void 0===r?void 0:r.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const O=b;t["a"]=O},7920:function(e,t,n){"use strict";var r=n("7a23");function a(e,t,n,a,i,o){return Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var i=n("9441"),o=Object(r["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:i["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=n("6b0d"),c=n.n(s);const u=c()(o,[["render",a]]);t["a"]=u},ba9c:function(e,t,n){"use strict";n.r(t);var r=n("7a23");function a(e,t,n,a,i,o){var s=Object(r["resolveComponent"])("his-standard-form");return Object(r["openBlock"])(),Object(r["createBlock"])(s,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!0,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])}var i=n("1da1"),o=(n("96cf"),n("d95e")),s=n("7920"),c=n("2706"),u=n("7365"),d=n("bee2"),l=n("d4ec"),p=n("262e"),h=n("2caf"),f=n("cc6f"),m=function(e){Object(p["a"])(n,e);var t=Object(h["a"])(n);function n(e,r){return Object(l["a"])(this,n),t.call(this,e,184,r)}return Object(d["a"])(n)}(f["a"]),v=n("b5e4"),b=Object(r["defineComponent"])({mixins:[u["a"]],components:{HisStandardForm:s["a"]},data:function(){return{reception:{}}},watch:{patient:{handler:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.reception=new m(e.patientID,e.providerID),e.fields=e.getFields();case 2:case"end":return t.stop()}}),t)})))()},deep:!0}},methods:{onFinish:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.reception.createEncounter();case 2:if(r=n.sent,r){n.next=5;break}return n.abrupt("return",Object(v["e"])("Unable to create encounter"));case 5:return a=e["reason_for_visit"],n.next=8,t.reception.buildValueCoded("Reason for visit",a.value);case 8:return i=n.sent,n.next=11,t.reception.saveObs(i);case 11:n.sent,Object(v["d"])("Observations and encounter created!"),t.nextTask();case 14:case"end":return n.stop()}}),n)})))()},getFields:function(){var e=this;return[{id:"reason_for_visit",helpText:"Reason for visit",type:o["b"].TT_SELECT,validation:function(e){return c["a"].required(e)},options:function(){return e.mapOptions(["Initial screening","Postponed treatment","One year subsequent check-up after treatment","Subsequent screening","Problem visit after treatment","Referral"])}}]}}}),O=n("6b0d"),D=n.n(O);const E=D()(b,[["render",a]]);t["default"]=E},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("caad"),n("d3b7"),n("4e82"),n("a4d30"),n("e01a");function r(e,t){var n=[],r=[-1,"",null,void 0];for(var a in t)if(a in e){var i=e[a];r.includes(i)?n.push(!1):n.push(t[a](i,e))}return n.every(Boolean)}function a(e){return e.sort((function(e,t){return e.priority<t.priority?-1:1}))}function i(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=[];for(var s in t){var c=t[s],u=[c.target&&n&&c.target!=n,c.targetEvent&&i&&c.targetEvent!=i];u.some(Boolean)||r(e,c.conditions)&&(c.title=s,c.description&&(c.description.text=c.description.info(e)),o.push(c))}return a(o)}}}]);
//# sourceMappingURL=chunk-654c8487.fc347f4b.js.map