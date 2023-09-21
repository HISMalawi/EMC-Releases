(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57c68121"],{"10be":function(e,t,n){"use strict";var r=n("7a23");const o={class:"keypad"};function i(e,t,n,i,a,c){const s=Object(r["resolveComponent"])("ion-input"),l=Object(r["resolveComponent"])("ion-chip"),u=Object(r["resolveComponent"])("center"),d=Object(r["resolveComponent"])("base-keyboard"),T=Object(r["resolveComponent"])("ion-content");return Object(r["openBlock"])(),Object(r["createBlock"])(T,null,{default:Object(r["withCtx"])(()=>[Object(r["createElementVNode"])("div",o,[Object(r["createVNode"])(s,{value:e.value,disabled:!0,class:"keypad-input"},null,8,["value"]),Object(r["createVNode"])(u,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(l,null,{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.title||"keypad"),1)]),_:1})]),_:1}),Object(r["createVNode"])(d,{btnSize:"96px",layout:e.keypad,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])])]),_:1})}var a=n("c924"),c=n("3800"),s=n("2345"),l=n("fe70"),u=Object(r["defineComponent"])({components:{BaseKeyboard:a["a"]},props:{title:{type:String},preset:{type:String},onKeyPress:{type:Function,required:!0},strictNumbers:{type:Boolean,default:!1}},data:()=>({value:"0",keypad:c["d"]}),watch:{preset:{handler(e){e&&(this.value=e.toString())},immediate:!0}},methods:{async keypress(e){if(e.match(/done/i))await l["j"].dismiss(this.value);else if(this.strictNumbers){if(e.includes(".")&&this.value.includes("."))return;e.includes(".")||"0"!==this.value||(this.value=""),this.value=Object(s["a"])(e,this.value),this.value||(this.value="0"),""+parseInt(this.value)===this.value?this.onKeyPress(parseInt(this.value)):this.onKeyPress(this.value)}else this.value=Object(s["a"])(e,this.value),this.onKeyPress(this.value)}}}),d=(n("27f1"),n("6b0d")),T=n.n(d);const m=T()(u,[["render",i],["__scopeId","data-v-7454247c"]]);t["a"]=m},2345:function(e,t,n){"use strict";function r(e,t,n){let r=t;if(e.match(/enter/i))return r+"\r\n";if(e.match(/clear/i))return"";if(r=e.match(/delete|del/i)?r.match(/unknown/i)||r.match(/n\/a/i)?"":r.substring(0,r.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":r.match(/unknown/i)||r.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof r&&r)switch(n){case"lowercase":r=r.toLowerCase();break;case"uppercase":r=r.toUpperCase();break;default:r=r.charAt(0).toUpperCase()+r.slice(1);break}return r}n.d(t,"a",(function(){return r}))},"27f1":function(e,t,n){"use strict";n("a3fb")},"32b3":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a}));var r,o=n("cc6f"),i=n("7957");(function(e){e["Prescription"]="htnPrescription"})(r||(r={}));class a extends o["a"]{constructor(e,t){super(e,48,t)}static getBpGrade(e,t){return e<140&&t<90?"normal":e>=140&&e<160||t>=100&&t<110?"grade 1":e>=180&&t>110||e>=180?"grade 3":e>=160&&e<180||t>=110?"grade 2":"N/A"}static isBpNormotensive(e){const[t,n]=Object.values(e).sort((e,t)=>e.date<t.date?1:0).map(e=>this.getBpGrade(e.sbp,e.dbp));return"normal"===t&&"normal"===n}getSystolicBp(){return i["a"].getFirstValueNumber(this.patientID,"Systolic blood pressure")}getDiastolicBp(){return i["a"].getFirstValueNumber(this.patientID,"Diastolic blood pressure")}async onBpDrugs(){const e=await i["a"].getFirstValueCoded(this.patientID,"Treatment status");return!!e&&"Yes"===e}async getBPTrail(){return await o["a"].getJson(`/patients/${this.patientID}/bp_trail`)}async getCurrentDrugs(){return await o["a"].getJson(`/patients/${this.patientID}/current_bp_drugs`)}async getLastDrugs(){return await o["a"].getJson(`/patients/${this.patientID}/last_bp_drugs_dispensation`)}async getAdherence(e,t){return await o["a"].postJson(`/patients/${this.patientID}/remaining_bp_drugs`,{drug_id:e,pills:t})}async enrollPatient(e){return await o["a"].postJson(`/patients/${this.patientID}/update_or_create_htn_state`,e)}static htnDrugReferences(){return[{drug_id:275,drug_name:"HCZ (25mg tablet)",units:"tab(s)",am:0,noon:0,pm:1,frequency:"Daily (QOD)"},{drug_id:942,drug_name:"Enalapril (5mg tablet)",units:"tab(s)",am:0,noon:0,pm:1,frequency:"Daily (QOD)"},{drug_id:943,drug_name:"Enalapril (10mg tablet)",units:"tab(s)",am:0,noon:0,pm:1,frequency:"Daily (QOD)"},{drug_id:558,drug_name:"Amlodipine (5mg tablet)",units:"tab(s)",am:0,noon:0,pm:1,frequency:"Daily (QOD)"},{drug_id:559,drug_name:"Amlodipine (10mg tablet)",units:"tab(s)",am:0,noon:0,pm:1,frequency:"Daily (QOD)"},{drug_id:117,drug_name:"Atenolol (50mg tablet)",units:"tab(s)",am:0,noon:0,pm:1,frequency:"Daily (QOD)"},{drug_id:11,drug_name:"Atenolol(100mg tablet)",units:"tab(s)",am:0,noon:0,pm:1,frequency:"Daily (QOD)"}]}getDrugs(){return{HCZ:{drugs:[{drugName:"HCZ (25mg tablet)",drugID:275,amount:"25mg",current:!1,selected:!1,isChecked:!1,dispensed:null,expectedRemaining:null,adherence:null}],selected:null,notes:[]},Enalapril:{drugs:[{drugName:"Enalapril (5mg tablet)",drugID:942,amount:"5mg",current:!1,selected:!1,isChecked:!1,dispensed:null,expectedRemaining:null,adherence:null,remaining:null},{drugName:"Enalapril (10mg tablet)",drugID:943,amount:"10mg",current:!1,selected:!1,isChecked:!1,dispensed:null,expectedRemaining:null,adherence:null,remaining:null}],selected:null,notes:[]},Amlodipine:{drugs:[{drugName:"Amlodipine (5mg tablet)",drugID:558,amount:"5mg",current:!1,selected:!1,isChecked:!1,dispensed:null,expectedRemaining:null,adherence:null,remaining:null},{drugName:"Amlodipine (10mg tablet)",drugID:559,amount:"10mg",current:!1,selected:!1,isChecked:!1,dispensed:null,expectedRemaining:null,adherence:null,remaining:null}],selected:null,notes:[]},Atenolol:{drugs:[{drugName:"Atenolol (50mg tablet)",drugID:117,amount:"50mg",current:!1,selected:!1,isChecked:!1,dispensed:null,expectedRemaining:null,adherence:null,remaining:null},{drugName:"Atenolol(100mg tablet)",drugID:11,amount:"100mg",current:!1,selected:!1,isChecked:!1,dispensed:null,expectedRemaining:null,adherence:null,remaining:null}],selected:null,notes:[]}}}}},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"k",(function(){return o})),n.d(t,"f",(function(){return i})),n.d(t,"n",(function(){return a})),n.d(t,"e",(function(){return c})),n.d(t,"b",(function(){return s})),n.d(t,"m",(function(){return l})),n.d(t,"j",(function(){return u})),n.d(t,"h",(function(){return d})),n.d(t,"a",(function(){return T})),n.d(t,"l",(function(){return m})),n.d(t,"c",(function(){return p})),n.d(t,"i",(function(){return h})),n.d(t,"g",(function(){return b}));const r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],s=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],T=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],m=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],p=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],h=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],b=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"3f4a":function(e,t,n){"use strict";n.r(t);var r=n("7a23");const o=e=>(Object(r["pushScopeId"])("data-v-15839c59"),e=e(),Object(r["popScopeId"])(),e),i=o(()=>Object(r["createElementVNode"])("label",{class:"his-title"}," BP Drug management ",-1)),a={key:0,class:"view-port-content"},c={id:"main-table",style:{width:"100%"}},s=o(()=>Object(r["createElementVNode"])("th",null," ",-1)),l=o(()=>Object(r["createElementVNode"])("td",{class:"td-current td-title"},[Object(r["createElementVNode"])("span",null,"Current")],-1)),u=o(()=>Object(r["createElementVNode"])("td",{class:"td-remaining td-title"},[Object(r["createElementVNode"])("span",null,"Pills remaining")],-1)),d=o(()=>Object(r["createElementVNode"])("p",null,null,-1)),T={id:"table-notes",style:{width:"100%"}},m=o(()=>Object(r["createElementVNode"])("caption",{style:{"font-size":"1.4em"}}," Adherence summary ",-1)),p=o(()=>Object(r["createElementVNode"])("p",null,null,-1)),h=o(()=>Object(r["createElementVNode"])("tr",null,[Object(r["createElementVNode"])("th",{style:{width:"25%"}},[Object(r["createElementVNode"])("span",null,"Drug")]),Object(r["createElementVNode"])("th",{style:{width:"25%"}},[Object(r["createElementVNode"])("span",null,"Pills dispensed during last visit")]),Object(r["createElementVNode"])("th",{style:{width:"25%"}},[Object(r["createElementVNode"])("span",null,"Expected pills remaining")]),Object(r["createElementVNode"])("th",{style:{width:"25%"}},[Object(r["createElementVNode"])("span",null,"Adherence for drug")])],-1)),b={class:"date-td today-td"},E={class:"date-td today-td"},_={class:"date-td today-td"},O={class:"date-td today-td"};function g(e,t,n,o,g,N){const I=Object(r["resolveComponent"])("ion-col"),D=Object(r["resolveComponent"])("ion-row"),C=Object(r["resolveComponent"])("ion-toolbar"),f=Object(r["resolveComponent"])("ion-header"),j=Object(r["resolveComponent"])("ion-checkbox"),y=Object(r["resolveComponent"])("ion-input"),v=Object(r["resolveComponent"])("view-port"),S=Object(r["resolveComponent"])("ion-content"),A=Object(r["resolveComponent"])("ion-button"),P=Object(r["resolveComponent"])("ion-footer"),k=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(k,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(C,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(D,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(I,null,{default:Object(r["withCtx"])(()=>[i]),_:1})]),_:1})]),_:1})]),_:1}),Object(r["createVNode"])(S,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(v,null,{default:Object(r["withCtx"])(()=>[e.drugs?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",a,[Object(r["createElementVNode"])("table",c,[Object(r["createElementVNode"])("tr",null,[s,(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.drugs,(e,t)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("th",{key:t},[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t)+" ",1),Object(r["createVNode"])(D,null,{default:Object(r["withCtx"])(()=>[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.drugs,(e,t)=>(Object(r["openBlock"])(),Object(r["createBlock"])(I,{class:"col-borders",key:t},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.amount||"0mg"),1)]),_:2},1024))),128))]),_:2},1024)]))),128))]),Object(r["createElementVNode"])("tr",null,[l,(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.drugs,(e,t)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("td",{class:"td-current td-value",key:t},[Object(r["createVNode"])(D,null,{default:Object(r["withCtx"])(()=>[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.drugs,(e,t)=>(Object(r["openBlock"])(),Object(r["createBlock"])(I,{key:t},{default:Object(r["withCtx"])(()=>[e.current?(Object(r["openBlock"])(),Object(r["createBlock"])(j,{key:0,checked:e.current,disabled:""},null,8,["checked"])):Object(r["createCommentVNode"])("",!0)]),_:2},1024))),128))]),_:2},1024)]))),128))]),Object(r["createElementVNode"])("tr",null,[u,(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.drugs,(t,n)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("td",{key:n,class:"td-current td-value"},[Object(r["createVNode"])(D,null,{default:Object(r["withCtx"])(()=>[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(t.drugs,(t,o)=>(Object(r["openBlock"])(),Object(r["createBlock"])(I,{key:o},{default:Object(r["withCtx"])(()=>[t.dispensed?(Object(r["openBlock"])(),Object(r["createBlock"])(y,{key:0,type:"number",modelValue:t.remaining,"onUpdate:modelValue":e=>t.remaining=e,onClick:t=>e.launchKeyPad(n,o)},null,8,["modelValue","onUpdate:modelValue","onClick"])):Object(r["createCommentVNode"])("",!0)]),_:2},1024))),128))]),_:2},1024)]))),128))])]),d,Object(r["createElementVNode"])("table",T,[m,p,h,(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.selectedDrugs,(e,t)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("tr",{key:t,class:"dispensation-row"},[Object(r["createElementVNode"])("td",b,Object(r["toDisplayString"])(e.drugName),1),Object(r["createElementVNode"])("td",E,Object(r["toDisplayString"])(e.dispensed),1),Object(r["createElementVNode"])("td",_,Object(r["toDisplayString"])(e.expectedRemaining),1),Object(r["createElementVNode"])("td",O,Object(r["toDisplayString"])(e.adherence?e.adherence+" %":"?"),1)]))),128))])])):Object(r["createCommentVNode"])("",!0)]),_:1})]),_:1}),Object(r["createVNode"])(P,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(C,{color:"dark"},{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(A,{size:"large",color:"danger",slot:"start",onClick:e.gotoPatientDashboard},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(" cancel ")]),_:1},8,["onClick"]),Object(r["createVNode"])(A,{size:"large",color:"primary",slot:"end",onClick:e.goToPrescription},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(" Change drugs ")]),_:1},8,["onClick"]),Object(r["createVNode"])(A,{size:"large",color:"success",slot:"end",onClick:e.onFinish},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(" Continue ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})}n("14d9"),n("13d5");var N=n("0a79"),I=n("d867"),D=n("7365"),C=n("32b3"),f=n("10be"),j=n("7f35"),y=n("2ef0"),v=Object(r["defineComponent"])({mixins:[D["a"]],components:{ViewPort:N["a"],IonToolbar:I["S"],IonHeader:I["q"],IonContent:I["n"],IonRow:I["H"],IonInput:I["v"],IonButton:I["d"],IonCol:I["m"],IonFooter:I["o"],IonPage:I["D"],IonCheckbox:I["k"]},watch:{ready:{async handler(e){e&&(this.HTN=new C["a"](this.patientID,this.providerID),this.drugs=this.HTN.getDrugs(),await this.getCurrentDrugs())},immediate:!0}},data:()=>({HTN:{},drugs:null}),methods:{onFinish(){this.selectNextAction()},goToPrescription(){this.$router.push("/art/encounters/bp_prescription/"+this.patientID)},gotoTreatment(){const e=this.selectedDrugs.map(e=>Object(y["find"])(C["a"].htnDrugReferences(),{drug_id:e.drugID})),t={};t[this.patientID]=e,sessionStorage.setItem(C["b"].Prescription,JSON.stringify(t)),this.$router.push("/art/encounters/prescriptions/"+this.patientID)},async selectNextAction(){const e=await Object(j["c"])("Action confirmation","Please specify how to proceed with patient",["Continue with current BP Drugs","Continue without BP Drugs","Change BP drugs"],[{name:"Cancel",color:"danger",slot:"start"},{name:"Confirm",color:"primary",slot:"end",role:"action"}]);if(e.selection&&"Cancel"!=e.action)switch(e.selection){case"Continue without BP Drugs":return sessionStorage.removeItem(C["b"].Prescription),this.nextTask();case"Continue with current BP Drugs":return this.gotoTreatment();case"Change BP drugs":this.goToPrescription()}},async getCurrentDrugs(){const e=await this.HTN.getCurrentDrugs(),t=await this.HTN.getLastDrugs();e.drugs.forEach(e=>{for(const n in this.drugs)this.drugs[n].drugs.forEach((r,o)=>{e.drug_id===r.drugID&&(this.drugs[n].drugs[o].current=!0,this.drugs[n].drugs[o].selected=!0,this.drugs[n].selected=e.drug_id);const i=this.drugs[n].drugs[o].drugName;Object.prototype.hasOwnProperty.call(t,i)&&(this.drugs[n].drugs[o].expectedRemaining=t[i].remaining,this.drugs[n].drugs[o].dispensed=t[i].value_numeric)})})},async launchKeyPad(e,t){const n=await I["Z"].create({component:f["a"],backdropDismiss:!1,cssClass:"keypad-modal",componentProps:{strictNumbers:!0,onKeyPress:async n=>{const r=await this.HTN.getAdherence(this.drugs[e].drugs[t].drugID,n);this.drugs[e].drugs[t].adherence=r.adherence,this.drugs[e].drugs[t].remaining=n}}});n.present()}},computed:{selectedDrugs(){return Object.values(this.drugs).map(e=>e.drugs).reduce((e,t)=>e.concat(t),[]).filter(e=>e.dispensed)}}}),S=(n("abd7"),n("6b0d")),A=n.n(S);const P=A()(v,[["render",g],["__scopeId","data-v-15839c59"]]);t["default"]=P},7365:function(e,t,n){"use strict";n("14d9"),n("13d5");var r,o=n("7a23"),i=n("ad60"),a=n("2ef0"),c=n("0fa1"),s=n("7f35"),l=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(r||(r={}));const u=e=>l["b"].toStandardHisDisplayFormat(e),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(s["a"])("Data Integrity Issue Found","Patient died on "+u(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?r.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?r.CHANGE_PATIENT_OUTCOME:r.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const n=await Object(s["a"])("Data integrity issue found","",`Session date ${u(t)} is less than birth date of ${u(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?r.CHANGE_SESSION_DATE:r.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:n,apiDate:o})=>{const i=await Object(s["c"])("Please select a provider for "+t,`BDE: ${u(n)} | Current: ${u(o)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===i.action?{value:-1,flowState:r.GO_TO_PATIENT_DASHBOARD}:{value:i.selection,flowState:r.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var T=n("c21d"),m=n("7920"),p=n("b5e4"),h=n("8e8b"),b=Object(o["defineComponent"])({components:{HisStandardForm:m["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),h["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[r.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(a["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),r.CONTINUE},n[r.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),r.EXIT),n[r.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),r.EXIT),n[r.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),r.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(T["a"])(this.facts,d);for(const a in e){var t,n;const c=e[a];if(null!==c&&void 0!==c&&null!==(t=c.actions)&&void 0!==t&&t.alert){var o;const e=this.runflowState(await(null===c||void 0===c||null===(o=c.actions)||void 0===o?void 0:o.alert(this.facts)));if(e===r.EXIT)return}if(null!==c&&void 0!==c&&null!==(n=c.actions)&&void 0!==n&&n.selection){var i;const e=await(null===c||void 0===c||null===(i=c.actions)||void 0===i?void 0:i.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await h["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(p["c"])(""+e)}this.facts.sessionDate=i["a"].getSessionDate(),this.facts.apiDate=i["a"].getCachedApiDate(),this.facts.isBdeMode=i["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",i["a"].isBDE()&&(this.providers=await h["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),r=t.username.toUpperCase();return n<r?-1:n>r?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(a["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var r;const[t]=(null===(r=e.person)||void 0===r?void 0:r.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(c["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const E=b;t["a"]=E},7920:function(e,t,n){"use strict";var r=n("7a23");function o(e,t,n,o,i,a){return Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var i=n("9441"),a=Object(r["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:i["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),c=n("6b0d"),s=n.n(c);const l=s()(a,[["render",o]]);t["a"]=l},a3fb:function(e,t,n){},abd7:function(e,t,n){"use strict";n("b993")},b993:function(e,t,n){},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("14d9");function r(e,t){const n=[],r=[-1,"",null,void 0];for(const o in t){if(!(o in e))continue;const i=e[o];r.includes(i)?n.push(!1):n.push(t[o](i,e))}return n.every(Boolean)}function o(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function i(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function a(e,t,n="",a="",c="priority"){const s=[];for(const o in t){const i=t[o],c=[i.target&&n&&i.target!=n,i.targetEvent&&a&&i.targetEvent!=a];c.some(Boolean)||r(e,i.conditions)&&(i.title=o,i.description&&(i.description.text=i.description.info(e)),s.push(i))}return"priority"===c?o(s):i(s)}},c924:function(e,t,n){"use strict";var r=n("7a23");function o(e,t,n,o,i,a){const c=Object(r["resolveComponent"])("ion-button");return Object(r["openBlock"])(),Object(r["createElementBlock"])("table",null,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(e.layout,(t,n)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("tr",{key:n},[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(t,(n,o)=>(Object(r["openBlock"])(),Object(r["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+o},[n?(Object(r["openBlock"])(),Object(r["createBlock"])(c,{key:0,style:Object(r["normalizeStyle"])({width:e.btnSize}),class:Object(r["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(r["withCtx"])(()=>[Object(r["createTextVNode"])(Object(r["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(r["createCommentVNode"])("",!0)]))),128))]))),128))])}var i=n("d867"),a=Object(r["defineComponent"])({components:{IonButton:i["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),c=n("6b0d"),s=n.n(c);const l=s()(a,[["render",o]]);t["a"]=l},d95e:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(r||(r={}));const o=[r.TT_LINKAGE_CODE,r.TT_MULTI_SELECT_GRID,r.TT_AGE_INPUT,r.TT_BARCODE,r.TT_NOTE,r.TT_SELECT,r.TT_CARD_SELECTOR,r.TT_MULTIPLE_SELECT,r.TT_TEXT,r.TT_NUMBER,r.TT_MONTHLY_DAYS,r.TT_ART_REGIMEN_SELECTION,r.TT_NEXT_VISIT_INTERVAL_SELECTION,r.TT_TABLE_VIEWER,r.TT_DOSAGE_INPUT,r.TT_YES_NO,r.TT_MULTIPLE_YES_NO,r.TT_WEIGHT_CHART,r.TT_VITALS_ENTRY,r.TT_APPOINTMENTS_ENTRY,r.TT_COMPLAINTS_PICKER,r.TT_CLINIC_HOLIDAY_PICKER,r.TT_SUMMARY,r.TT_ART_STAGING_SUMMARY,r.TT_ADHERENCE_INPUT,r.TT_LAB_ORDERS,r.TT_PERSON_RESULT_VIEW,r.TT_PROGRAM_SELECTION,r.TT_DATE_PICKER,r.TT_RELATION_SELECTION,r.TT_FILING_NUMBER_VIEW,r.TT_PERSON_MATCH_VIEW,r.TT_FULL_DATE,r.TT_BATCH_ENTRY,r.TT_BATCH_VERIFICATION,r.TT_BATCH_MOVEMENT,r.TT_IP_ADDRESS,r.TT_TEXT_BANNER,r.TT_DISPENSATION_INPUT,r.TT_DATA_TABLE,r.TT_GROUP_SELECTOR,r.TT_ANC_PREGNANCY_INPUT_CONFIG,r.TT_ANC_PREGNANCY_DETAILS_INPUT,r.TT_ANC_LMP_DATE_INPUT,r.TT_DRUG_TRANSFER_IN,r.TT_GRID_SELECTOR,r.TT_ANC_DRUGSET_INPUT,r.TT_RADIOLOGY_PICKER,r.TT_PRESCRIPTION_INPUT,r.TT_INFINITE_SCROLL_MULTIPLE_SELECT,r.TT_DRUG_DISPENSER]},f159:function(e,t,n){var r={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-182277b5","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-182277b5","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-182277b5","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-f0823c9c","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function o(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],o=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(o)}))}o.keys=function(){return Object.keys(r)},o.id="f159",e.exports=o}}]);
//# sourceMappingURL=chunk-57c68121.21c53f4c.js.map