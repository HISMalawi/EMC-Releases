(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03e87f92"],{"72e3":function(t,e,a){"use strict";a.r(e);var n=a("7a23");const o={key:0,style:{color:"green"}},s={slot:"end"},i=Object(n["createElementVNode"])("h1",{style:{"text-align":"center"}},"Actions",-1);function r(t,e,a,r,c,l){const d=Object(n["resolveComponent"])("ion-title"),h=Object(n["resolveComponent"])("ion-button"),u=Object(n["resolveComponent"])("ion-toolbar"),b=Object(n["resolveComponent"])("ion-header"),m=Object(n["resolveComponent"])("data-table"),p=Object(n["resolveComponent"])("ion-content"),O=Object(n["resolveComponent"])("ion-label"),g=Object(n["resolveComponent"])("ion-radio"),j=Object(n["resolveComponent"])("ion-item"),f=Object(n["resolveComponent"])("ion-col"),v=Object(n["resolveComponent"])("ion-row"),w=Object(n["resolveComponent"])("ion-grid"),k=Object(n["resolveComponent"])("ion-radio-group"),y=Object(n["resolveComponent"])("ion-footer"),C=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(C,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(b,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("span",null,"BP management screening on "+Object(n["toDisplayString"])(t.date),1),t.patientOnBPDrugs?(Object(n["openBlock"])(),Object(n["createElementBlock"])("small",o," (Patient already on BP drugs)")):Object(n["createCommentVNode"])("",!0)]),_:1}),Object(n["createElementVNode"])("span",s,[t.totalRiskFactors>0?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:0,color:"danger",onClick:t.showRiskFactors},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("View/Edit risk factors "+Object(n["toDisplayString"])(t.totalRiskFactors),1)]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),0===t.totalRiskFactors?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:1,onClick:t.showRiskFactors},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])("add riskfactors")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0)])]),_:1})]),_:1}),Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(m,{config:{showIndex:!1},columns:t.columns,rows:t.rows},null,8,["columns","rows"])]),_:1}),Object(n["createVNode"])(y,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,null,{default:Object(n["withCtx"])(()=>[i,Object(n["createVNode"])(k,{modelValue:t.action,"onUpdate:modelValue":e[0]||(e[0]=e=>t.action=e)},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(w,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(v,null,{default:Object(n["withCtx"])(()=>[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(t.items,(t,e)=>(Object(n["openBlock"])(),Object(n["createBlock"])(f,{size:"4",key:e},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(j,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,{style:{"font-size":"1.0rem","font-weight":"bold"}},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(t.label),1)]),_:2},1024),Object(n["createVNode"])(g,{value:t},null,8,["value"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),Object(n["createVNode"])(u,{color:"dark"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,{size:"large",color:"danger",slot:"start",onClick:t.gotoPatientDashboard},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" cancel ")]),_:1},8,["onClick"]),t.showClinicianButton?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:0,size:"large",color:"danger",slot:"start",onClick:t.referPatient},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Refer to clinician ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),t.patientHasHyperTensionObs?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:1,size:"large",slot:"end",onClick:t.goToDiagnosis},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Hypertension Diagnosis ")]),_:1},8,["onClick"])),t.patientHasHyperTensionObs&&!t.isEnrolledInHTN?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:2,size:"large",slot:"end",onClick:t.enrollInHTN},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Enroll in HTN ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0),t.patientHasHyperTensionObs?(Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:3,size:"large",color:"success",slot:"end",onClick:t.onFinish},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(" Finish ")]),_:1},8,["onClick"])):Object(n["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})}a("14d9");var c=a("d867"),l=a("b5e4"),d=a("7365"),h=a("77fd"),u=a("7957"),b=a("8158"),m=a("1c74"),p=a("9283"),O=a("2ef0"),g=a("32b3"),j=a("c1e4"),f=a("ad60"),v=a("b515"),w=a("74f4"),k=a("80e3"),y=a("9ceb"),C=a("7f35");const N={background:"#444444"};var T=Object(n["defineComponent"])({mixins:[d["a"]],components:{DataTable:k["a"],IonTitle:c["R"],IonToolbar:c["S"],IonHeader:c["q"],IonContent:c["n"],IonGrid:c["p"],IonRow:c["H"],IonButton:c["d"],IonRadioGroup:c["F"],IonRadio:c["E"],IonCol:c["m"],IonFooter:c["o"],IonPage:c["D"],IonItem:c["w"],IonLabel:c["x"]},data:()=>({htn:{},hasARVNumber:!0,suggestedNumber:"",columns:[[y["a"].thTxt("Date",{style:N}),y["a"].thTxt("Systolic",{style:N}),y["a"].thTxt("Diastolic",{style:N}),y["a"].thTxt("BP Drugs",{style:N}),y["a"].thTxt("Action / Note",{style:N})]],bpGradeColorMap:{"N/A":"#ffffff",normal:"#ffffff","grade 1":"#FFC3CE","grade 2":"#F20056","grade 3":"#FF3333"},rows:[],riskFactors:[],action:null,trail:[],date:null,patientOnBPDrugs:!1,patientFirstVisit:!1,normatensive:!1,patientHasHyperTensionObs:!1,currentDrugs:[],items:[],isEnrolledInHTN:!1,isAliveOnHTN:!1,HTNProgramID:20,aliveState:160,refer:!1}),watch:{ready:{async handler(t){if(!t)return;const e=await c["X"].create({message:"Please wait...",backdropDismiss:!1});await e.present(),this.htn=new g["a"](this.patientID,this.providerID),this.trail=await this.htn.getBPTrail(),this.rows=this.formatBpTrailRows(this.trail),this.normatensive=g["a"].isBpNormotensive(this.trail),this.riskFactors=await this.getRiskFactors(),this.date=p["b"].toStandardHisDisplayFormat(m["e"].getSessionDate()),await this.isTransfered(),await this.hasHyperTenstion(),await this.getTreatmentStatus(),await this.getProgramStatus(),c["X"].dismiss(),this.patientFirstVisit&&this.patientOnBPDrugs&&await this.alertTransferIn(),this.getItems()},immediate:!0}},computed:{totalRiskFactors(){return this.riskFactors.filter(t=>"Yes"===t.value).length},showClinicianButton(){return!(j["a"].isClinician()&&j["a"].isDoctor())}},methods:{async onFinish(){if(this.action||this.refer){const a=await this.htn.createEncounter();if(!a)return Object(l["e"])("Unable to create encounter");if(this.refer){const t=await this.htn.saveValueCodedObs("Refer patient to clinician","Yes");if(!t)return Object(l["e"])("Unable to create Obs");this.gotoPatientDashboard()}else{var t,e;const a=await this.htn.saveValueTextObs("Plan",this.action.label);if(!a)return Object(l["e"])("Unable to create Obs");const n={state:this.action.value};if(await this.htn.enrollPatient(n),"function"===typeof(null===(t=this.action)||void 0===t||null===(e=t.other)||void 0===e?void 0:e.action))return this.action.other.action();this.nextTask()}}else Object(l["e"])("Please select an action")},referPatient(){this.refer=!0,this.onFinish()},goToDiagnosis(){return this.$router.push({path:"/art/encounters/hypertension_diagnosis/"+this.patientID})},async hasHyperTenstion(){const t=await u["a"].getFirstValueCoded(this.patientID,"Patient has hypertension");this.patientHasHyperTensionObs=!!(""+t).match(/yes|no/i)},async isTransfered(){const t=await u["a"].getFirstValueCoded(this.patientID,"Transferred");this.patientFirstVisit=!t},async getTreatmentStatus(){const t=await u["a"].getFirstValueText(this.patientID,"Treatment status");this.patientOnBPDrugs=!(!t||!t.match(/BP Drugs started/i))},async getProgramStatus(){const t=await f["a"].getPatientPrograms(this.patientID);this.isEnrolledInHTN=t.filter(t=>"HYPERTENSION PROGRAM"===t.program.name).length>0,this.isEnrolledInHTN&&await this.programState()},async programState(){const t=await f["a"].getPatientStates(this.patientID,this.HTNProgramID);this.isAliveOnHTN=t.filter(t=>"Alive"===t.name).length>0},async getRiskFactors(){const t=b["a"].getConceptsByCategory("risk factors"),e=t.map(async t=>{const e=await u["a"].getFirstValueCoded(this.patientID,t.name);return{concept:t.name,value:e}});return Promise.all(e)},formatBpTrailRows(t){return Object.keys(t).map(e=>{const a=p["b"].toStandardHisDisplayFormat(e);this.currentDrugs=this.currentDrugs.concat(t[e]["drugs"]);const n=()=>{const a=g["a"].getBpGrade(parseInt(t[e].sbp),parseInt(t[e].dbp));return this.bpGradeColorMap[a]},o={background:n()};return[y["a"].tdDate(a,{style:o}),y["a"].td(t[e].sbp,{style:o}),y["a"].td(t[e].dbp,{style:o}),y["a"].td(t[e]["drugs"].join(", "),{style:o}),y["a"].td(t[e].note,{style:o})]})},async showRiskFactors(){const t=await c["Z"].create({component:h["a"],backdropDismiss:!1,cssClass:"large-modal",componentProps:{factors:this.riskFactors}});t.present();const{data:e}=await t.onDidDismiss();Object(O["isEmpty"])(e)||(this.riskFactors=e.map(t=>{const e=!0===t.isChecked?"Yes":"No";return{concept:t.concept,value:e}}))},async alertTransferIn(){const t=await Object(C["a"])("Transfer in","Does the patient want to transfer in for HTN management?","",[{name:"Yes",slot:"end",color:"success"},{name:"No",slot:"start",color:"danger"}]);"Yes"===t?(await this.enrollInHTN(),await this.setHtnTransferred("Yes"),this.patientFirstVisit=!1,await this.getItems()):(await this.setHtnTransferred("No"),this.nextTask())},async enrollInHTN(){try{const t=new w["a"](this.patientID);t.setProgramId(this.HTNProgramID),t.setStateDate(f["a"].getSessionDate()),t.setStateId(this.aliveState),await t.enrollProgram(),await t.updateState(),this.isEnrolledInHTN=!0,Object(l["d"])("Patient is now enrolled in HTN")}catch(t){console.error(t),Object(l["e"])(""+t)}},async setHtnTransferred(t){const e=new v["a"](this.patientID,this.providerID),a=await e.createEncounter();if(a){const a=await e.saveValueCodedObs("Transferred",t);a||Object(l["e"])("Unable to create observation Transferred for patient")}else Object(l["e"])("Unable to create patient transfer encounter")},async getItems(){this.currentDrugs.length>0?this.items=[{label:"Did not take prescribed drugs",value:"on treatment",other:{action:()=>this.$router.push("/art/encounters/bp_adherence/"+this.patientID)}},{label:"Continue drugs",value:"on treatment",other:{action:()=>this.$router.push("/art/encounters/bp_adherence/"+this.patientID)}},{label:"Review drugs",value:"on treatment",other:{action:()=>this.$router.push(`/art/encounters/bp_adherence/${this.patientID}?review=true`)}}]:(this.items=[{label:"Lifestyle advice given",value:"Lifestyle changes only"},{label:"Not yet stable on ART",value:"Symptomatic but not in treatment"},{label:"Patient declining BP drugs ",value:"Symptomatic but not in treatment"}],this.normatensive&&this.items.push({label:"Return to annual screening",value:"Alive"}),this.items.push({label:"Start anti hypertensives",value:"On treatment",other:{action:()=>this.$router.push("/art/encounters/bp_prescription/"+this.patientID)}}))}}}),D=a("d959"),I=a.n(D);const x=I()(T,[["render",r]]);e["default"]=x},b515:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));a("14d9");var n=a("cc6f"),o=a("2ef0");class s extends n["a"]{constructor(t,e){super(t,6,e)}isNotEmptyandNumber(t){return(""+t.value).match(/^-?\d+\.?\d*$/)?null:["Invalid entry for "+t.label]}isNotEmptyandFloat(t){return(""+t.value).match(/^\d{1,3}\.\d{1,5}$/)?null:[`Invalid entry for ${t.label}. Don't forget to add a decimal. e.g. 56.2 ${t.other.modifier}`]}checkMinMax(t,e,a){const n=[];var o,s;parseFloat(""+t.value)<e&&n.push([`${t.label} entered is less than minimum ${e} ${(null===t||void 0===t||null===(o=t.other)||void 0===o?void 0:o.modifier)||""}`]);parseFloat(""+t.value)>a&&n.push([`${t.label} entered is greater than maximum ${a} ${(null===t||void 0===t||null===(s=t.other)||void 0===s?void 0:s.modifier)||""}`]);return n.length>0?n:null}validateAll(t){const e=[];return t.map(t=>{const a=this.validator(t);return Object(o["isArray"])(a)?e.push(a):null}),e.length>0?e:null}mergeErrors(t){const e=[];return t.forEach(t=>{Object(o["isArray"])(t)&&e.push(t)}),e.length>0?e:null}isValidBPReading(t){const e=[],a=(""+t.value).match(/^\d{1,3}\/\d{1,3}$/g)?null:["Invalid BP reading"];if(e.push(a),null==a){const a=(""+t.value).split("/"),n={label:"Systolic",value:a[0]},o={label:"Diastolic",value:a[1]};e.push(this.checkMinMax(o,30,200)),e.push(this.checkMinMax(n,40,250))}return this.mergeErrors(e)}validator(t){const e=[{name:"Weight",validator:t=>{const e=this.isNotEmptyandFloat(t),a=this.checkMinMax(t,2,250);return this.mergeErrors([e,a])}},{name:"Height",validator:t=>{const e=[];return e.push(this.isNotEmptyandNumber(t)),e.push(this.checkMinMax(t,40,220)),this.mergeErrors(e)}},{name:"BP",validator:t=>this.isValidBPReading(t)},{name:"Temp",validator:t=>{const e=this.isNotEmptyandNumber(t),a=this.checkMinMax(t,30,42);return this.mergeErrors([e,a])}},{name:"SP02",validator:t=>{const e=this.checkMinMax(t,40,100);return this.mergeErrors([e])}},{name:"Pulse",validator:t=>{const e=this.checkMinMax(t,50,120);return this.mergeErrors([e])}}],a=e.filter(e=>e.name===t.label);return a.length>0?a[0].validator(t):null}}}}]);
//# sourceMappingURL=chunk-03e87f92.a19ccfd1.js.map