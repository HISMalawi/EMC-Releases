(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03e87f92"],{"72e3":function(t,e,a){"use strict";a.r(e);var n=a("7a23");const o={key:0,style:{color:"green"}},s={slot:"end"},i=Object(n["createTextVNode"])("add riskfactors"),r=Object(n["createVNode"])("h1",{style:{"text-align":"center"}},"Actions",-1),c=Object(n["createTextVNode"])(" cancel "),l=Object(n["createTextVNode"])(" Refer to clinician "),d=Object(n["createTextVNode"])(" Hypertension Diagnosis "),h=Object(n["createTextVNode"])(" Enroll in HTN "),u=Object(n["createTextVNode"])(" Finish ");function b(t,e,a,b,p,m){const O=Object(n["resolveComponent"])("ion-title"),g=Object(n["resolveComponent"])("ion-button"),j=Object(n["resolveComponent"])("ion-toolbar"),f=Object(n["resolveComponent"])("ion-header"),v=Object(n["resolveComponent"])("data-table"),w=Object(n["resolveComponent"])("ion-content"),k=Object(n["resolveComponent"])("ion-label"),y=Object(n["resolveComponent"])("ion-radio"),C=Object(n["resolveComponent"])("ion-item"),N=Object(n["resolveComponent"])("ion-col"),T=Object(n["resolveComponent"])("ion-row"),D=Object(n["resolveComponent"])("ion-grid"),I=Object(n["resolveComponent"])("ion-radio-group"),x=Object(n["resolveComponent"])("ion-footer"),V=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(V,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])("span",null,"BP management screening on "+Object(n["toDisplayString"])(t.date),1),t.patientOnBPDrugs?(Object(n["openBlock"])(),Object(n["createBlock"])("small",o," (Patient already on BP drugs)")):Object(n["createCommentVNode"])("",!0)]),_:1}),Object(n["createVNode"])("span",s,[t.totalRiskFactors>0?(Object(n["openBlock"])(),Object(n["createBlock"])(g,{key:0,color:"danger",onClick:t.showRiskFactors},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("View/Edit risk factors "+Object(n["toDisplayString"])(t.totalRiskFactors),1)]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),0===t.totalRiskFactors?(Object(n["openBlock"])(),Object(n["createBlock"])(g,{key:1,onClick:t.showRiskFactors},{default:Object(n["withCtx"])(()=>[i]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}),Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(v,{config:{showIndex:!1},columns:t.columns,rows:t.rows},null,8,["columns","rows"])]),_:1}),Object(n["createVNode"])(x,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,null,{default:Object(n["withCtx"])(()=>[r,Object(n["createVNode"])(I,{modelValue:t.action,"onUpdate:modelValue":e[1]||(e[1]=e=>t.action=e)},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(D,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(T,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(t.items,(t,e)=>(Object(n["openBlock"])(),Object(n["createBlock"])(N,{size:"4",key:e},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(C,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(k,{style:{"font-size":"1.0rem","font-weight":"bold"}},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(t.label),1)]),_:2},1024),Object(n["createVNode"])(y,{value:t},null,8,["value"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),Object(n["createVNode"])(j,{color:"dark"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,{size:"large",color:"danger",slot:"start",onClick:t.gotoPatientDashboard},{default:Object(n["withCtx"])(()=>[c]),_:1},8,["onClick"]),t.showClinicianButton?(Object(n["openBlock"])(),Object(n["createBlock"])(g,{key:0,size:"large",color:"danger",slot:"start",onClick:t.referPatient},{default:Object(n["withCtx"])(()=>[l]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),t.patientHasHyperTensionObs?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(g,{key:1,size:"large",slot:"end",onClick:t.goToDiagnosis},{default:Object(n["withCtx"])(()=>[d]),_:1},8,["onClick"])),t.patientHasHyperTensionObs&&!t.isEnrolledInHTN?(Object(n["openBlock"])(),Object(n["createBlock"])(g,{key:2,size:"large",slot:"end",onClick:t.enrollInHTN},{default:Object(n["withCtx"])(()=>[h]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),t.patientHasHyperTensionObs?(Object(n["openBlock"])(),Object(n["createBlock"])(g,{key:3,size:"large",color:"success",slot:"end",onClick:t.onFinish},{default:Object(n["withCtx"])(()=>[u]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})}var p=a("8a30"),m=a("b5e4"),O=a("7365"),g=a("77fd"),j=a("7957"),f=a("8158"),v=a("1c74"),w=a("9283"),k=a("2ef0"),y=a("32b3"),C=a("c1e4"),N=a("ad60"),T=a("b515"),D=a("74f4"),I=a("80e3"),x=a("9ceb"),V=a("7f35");const P={background:"#444444"};var B=Object(n["defineComponent"])({mixins:[O["a"]],components:{DataTable:I["a"],IonTitle:p["R"],IonToolbar:p["S"],IonHeader:p["q"],IonContent:p["n"],IonGrid:p["p"],IonRow:p["H"],IonButton:p["d"],IonRadioGroup:p["F"],IonRadio:p["E"],IonCol:p["m"],IonFooter:p["o"],IonPage:p["D"],IonItem:p["w"],IonLabel:p["x"]},data:()=>({htn:{},hasARVNumber:!0,suggestedNumber:"",columns:[[x["a"].thTxt("Date",{style:P}),x["a"].thTxt("Systolic",{style:P}),x["a"].thTxt("Diastolic",{style:P}),x["a"].thTxt("BP Drugs",{style:P}),x["a"].thTxt("Action / Note",{style:P})]],bpGradeColorMap:{"N/A":"#ffffff",normal:"#ffffff","grade 1":"#FFC3CE","grade 2":"#F20056","grade 3":"#FF3333"},rows:[],riskFactors:[],action:null,trail:[],date:null,patientOnBPDrugs:!1,patientFirstVisit:!1,normatensive:!1,patientHasHyperTensionObs:!1,currentDrugs:[],items:[],isEnrolledInHTN:!1,isAliveOnHTN:!1,HTNProgramID:20,aliveState:160,refer:!1}),watch:{ready:{async handler(t){if(!t)return;const e=await p["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present(),this.htn=new y["a"](this.patientID,this.providerID),this.trail=await this.htn.getBPTrail(),this.rows=this.formatBpTrailRows(this.trail),this.normatensive=y["a"].isBpNormotensive(this.trail),this.riskFactors=await this.getRiskFactors(),this.date=w["b"].toStandardHisDisplayFormat(v["e"].getSessionDate()),await this.isTransfered(),await this.hasHyperTenstion(),await this.getTreatmentStatus(),await this.getProgramStatus(),p["X"].dismiss(),this.patientFirstVisit&&this.patientOnBPDrugs&&await this.alertTransferIn(),this.getItems()},immediate:!0}},computed:{totalRiskFactors(){return this.riskFactors.filter(t=>"Yes"===t.value).length},showClinicianButton(){return!(C["a"].isClinician()&&C["a"].isDoctor())}},methods:{async onFinish(){if(this.action||this.refer){const a=await this.htn.createEncounter();if(!a)return Object(m["e"])("Unable to create encounter");if(this.refer){const t=await this.htn.saveValueCodedObs("Refer patient to clinician","Yes");if(!t)return Object(m["e"])("Unable to create Obs");this.gotoPatientDashboard()}else{var t,e;const a=await this.htn.saveValueTextObs("Plan",this.action.label);if(!a)return Object(m["e"])("Unable to create Obs");const n={state:this.action.value};if(await this.htn.enrollPatient(n),"function"===typeof(null===(t=this.action)||void 0===t||null===(e=t.other)||void 0===e?void 0:e.action))return this.action.other.action();this.nextTask()}}else Object(m["e"])("Please select an action")},referPatient(){this.refer=!0,this.onFinish()},goToDiagnosis(){return this.$router.push({path:"/art/encounters/hypertension_diagnosis/"+this.patientID})},async hasHyperTenstion(){const t=await j["a"].getFirstValueCoded(this.patientID,"Patient has hypertension");this.patientHasHyperTensionObs=!!(""+t).match(/yes|no/i)},async isTransfered(){const t=await j["a"].getFirstValueCoded(this.patientID,"Transferred");this.patientFirstVisit=!t},async getTreatmentStatus(){const t=await j["a"].getFirstValueText(this.patientID,"Treatment status");this.patientOnBPDrugs=!(!t||!t.match(/BP Drugs started/i))},async getProgramStatus(){const t=await N["a"].getPatientPrograms(this.patientID);this.isEnrolledInHTN=t.filter(t=>"HYPERTENSION PROGRAM"===t.program.name).length>0,this.isEnrolledInHTN&&await this.programState()},async programState(){const t=await N["a"].getPatientStates(this.patientID,this.HTNProgramID);this.isAliveOnHTN=t.filter(t=>"Alive"===t.name).length>0},async getRiskFactors(){const t=f["a"].getConceptsByCategory("risk factors"),e=t.map(async t=>{const e=await j["a"].getFirstValueCoded(this.patientID,t.name);return{concept:t.name,value:e}});return Promise.all(e)},formatBpTrailRows(t){return Object.keys(t).map(e=>{const a=w["b"].toStandardHisDisplayFormat(e);this.currentDrugs=this.currentDrugs.concat(t[e]["drugs"]);const n=()=>{const a=y["a"].getBpGrade(parseInt(t[e].sbp),parseInt(t[e].dbp));return this.bpGradeColorMap[a]},o={background:n()};return[x["a"].tdDate(a,{style:o}),x["a"].td(t[e].sbp,{style:o}),x["a"].td(t[e].dbp,{style:o}),x["a"].td(t[e]["drugs"].join(", "),{style:o}),x["a"].td(t[e].note,{style:o})]})},async showRiskFactors(){const t=await p["Z"].create({component:g["a"],backdropDismiss:!1,cssClass:"large-modal",componentProps:{factors:this.riskFactors}});t.present();const{data:e}=await t.onDidDismiss();Object(k["isEmpty"])(e)||(this.riskFactors=e.map(t=>{const e=!0===t.isChecked?"Yes":"No";return{concept:t.concept,value:e}}))},async alertTransferIn(){const t=await Object(V["a"])("Transfer in","Does the patient want to transfer in for HTN management?","",[{name:"Yes",slot:"end",color:"success"},{name:"No",slot:"start",color:"danger"}]);"Yes"===t?(await this.enrollInHTN(),await this.setHtnTransferred("Yes"),this.patientFirstVisit=!1,await this.getItems()):(await this.setHtnTransferred("No"),this.nextTask())},async enrollInHTN(){try{const t=new D["a"](this.patientID);t.setProgramId(this.HTNProgramID),t.setStateDate(N["a"].getSessionDate()),t.setStateId(this.aliveState),await t.enrollProgram(),await t.updateState(),this.isEnrolledInHTN=!0,Object(m["d"])("Patient is now enrolled in HTN")}catch(t){console.error(t),Object(m["e"])(t)}},async setHtnTransferred(t){const e=new T["a"](this.patientID,this.providerID),a=await e.createEncounter();if(a){const a=await e.saveValueCodedObs("Transferred",t);a||Object(m["e"])("Unable to create observation Transferred for patient")}else Object(m["e"])("Unable to create patient transfer encounter")},async getItems(){this.currentDrugs.length>0?this.items=[{label:"Did not take prescribed drugs",value:"on treatment",other:{action:()=>this.$router.push("/art/encounters/bp_adherence/"+this.patientID)}},{label:"Continue drugs",value:"on treatment",other:{action:()=>this.$router.push("/art/encounters/bp_adherence/"+this.patientID)}},{label:"Review drugs",value:"on treatment",other:{action:()=>this.$router.push(`/art/encounters/bp_adherence/${this.patientID}?review=true`)}}]:(this.items=[{label:"Lifestyle advice given",value:"Lifestyle changes only"},{label:"Not yet stable on ART",value:"Symptomatic but not in treatment"},{label:"Patient declining BP drugs ",value:"Symptomatic but not in treatment"}],this.normatensive&&this.items.push({label:"Return to annual screening",value:"Alive"}),this.items.push({label:"Start anti hypertensives",value:"On treatment",other:{action:()=>this.$router.push("/art/encounters/bp_prescription/"+this.patientID)}}))}}}),F=a("6b0d"),H=a.n(F);const E=H()(B,[["render",b]]);e["default"]=E},b515:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var n=a("cc6f"),o=a("2ef0");class s extends n["a"]{constructor(t,e){super(t,6,e)}isNotEmptyandNumber(t){return(""+t.value).match(/^-?\d+\.?\d*$/)?null:["Invalid entry for "+t.label]}isNotEmptyandFloat(t){return(""+t.value).match(/^\d{1,3}\.\d{1,5}$/)?null:[`Invalid entry for ${t.label}. Don't forget to add a decimal. e.g. 56.2 ${t.other.modifier}`]}checkMinMax(t,e,a){const n=[];var o,s;parseFloat(""+t.value)<e&&n.push([`${t.label} entered is less than minimum ${e} ${(null===t||void 0===t||null===(o=t.other)||void 0===o?void 0:o.modifier)||""}`]);parseFloat(""+t.value)>a&&n.push([`${t.label} entered is greater than maximum ${a} ${(null===t||void 0===t||null===(s=t.other)||void 0===s?void 0:s.modifier)||""}`]);return n.length>0?n:null}validateAll(t){const e=[];return t.map(t=>{const a=this.validator(t);return Object(o["isArray"])(a)?e.push(a):null}),e.length>0?e:null}mergeErrors(t){const e=[];return t.forEach(t=>{Object(o["isArray"])(t)&&e.push(t)}),e.length>0?e:null}isValidBPReading(t){const e=[],a=(""+t.value).match(/^\d{1,3}\/\d{1,3}$/g)?null:["Invalid BP reading"];if(e.push(a),null==a){const a=(""+t.value).split("/"),n={label:"Systolic",value:a[0]},o={label:"Diastolic",value:a[1]};e.push(this.checkMinMax(o,30,200)),e.push(this.checkMinMax(n,40,250))}return this.mergeErrors(e)}validator(t){const e=[{name:"Weight",validator:t=>{const e=this.isNotEmptyandFloat(t),a=this.checkMinMax(t,2,250);return this.mergeErrors([e,a])}},{name:"Height",validator:t=>{const e=[];return e.push(this.isNotEmptyandNumber(t)),e.push(this.checkMinMax(t,40,220)),this.mergeErrors(e)}},{name:"BP",validator:t=>this.isValidBPReading(t)},{name:"Temp",validator:t=>{const e=this.isNotEmptyandNumber(t),a=this.checkMinMax(t,30,42);return this.mergeErrors([e,a])}},{name:"SP02",validator:t=>{const e=this.checkMinMax(t,40,100);return this.mergeErrors([e])}},{name:"Pulse",validator:t=>{const e=this.checkMinMax(t,50,120);return this.mergeErrors([e])}}],a=e.filter(e=>e.name===t.label);return a.length>0?a[0].validator(t):null}}}}]);
//# sourceMappingURL=chunk-03e87f92.e3e63356.js.map