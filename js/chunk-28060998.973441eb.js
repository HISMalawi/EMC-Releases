(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28060998"],{"4fc0":function(t,e,s){"use strict";s.r(e);var r=s("7a23");function i(t,e,s,i,a,n){const o=Object(r["resolveComponent"])("his-standard-form");return Object(r["openBlock"])(),Object(r["createBlock"])(o,{skipSummary:!0,cancelDestinationPath:t.cancelDestination,fields:t.fields},null,8,["cancelDestinationPath","fields"])}var a=s("d95e"),n=s("b5e4"),o=s("cc6f"),d=s("71c3");class u extends o["a"]{constructor(t,e){super(t,54,e),this.drugHistory=[],this.currentDrugOrder=[]}getDrugHistory(){return this.drugHistory}getCurrentOrder(){return this.currentDrugOrder}buildDispensations(t,e){return[{drug_order_id:t,date:this.date,quantity:e}]}saveDispensations(t){return o["a"].postJson("/dispensations",{dispensations:t,program_id:o["a"].getProgramID()})}async voidOrder(t){return o["a"].void("/dispensations/"+t,{})}async loadDrugHistory(){const t=await d["a"].getDrugOrderHistory(this.patientID);t&&(this.drugHistory=t)}async loadCurrentDrugOrder(){const t=await d["a"].getDrugOrders(this.patientID);t&&(this.currentDrugOrder=await Promise.all(t))}calcCompletePack(t,e){const s=t.barcodes.sort((function(t,e){return t.tabs-e.tabs}));if(0==s.length||0==e)return e;for(let a=0;a<=s.length-1;a++)if(parseInt(s[a].tabs)>=e)return s[a].tabs;const r=parseInt(s[0].tabs);let i=parseInt(s[s.length-1].tabs);while(i<e)i+=r;return i}}var c=s("7365"),p=s("9283"),g=Object(r["defineComponent"])({mixins:[c["a"]],data:()=>({dispensation:{}}),watch:{patient:{async handler(t){this.dispensation=new u(t.getID(),this.providerID),await this.dispensation.loadCurrentDrugOrder(),await this.dispensation.loadDrugHistory(),this.fields=this.getFields()},deep:!0}},methods:{saveDispensations(t){const e=this.buildDispensations(t);return this.dispensation.saveDispensations(e)},buildDispensations(t){return this.dispensation.buildDispensations(t.other.order_id,t.value)},buildMedicationHistory(){return this.dispensation.getDrugHistory().sort((t,e)=>{const s=new Date(t.order.start_date),r=new Date(e.order.start_date);return r-s}).map(t=>({medication:t.drug.name,date:p["b"].toStandardHisDisplayFormat(t.order.start_date),amount:t.quantity}))},buildOrderOptions(){return this.dispensation.getCurrentOrder().map(t=>({label:t.drug.name,value:t.quantity||0,other:{drug_id:t.drug.drug_id,order_id:t.order.order_id,amount_needed:this.calculateCompletePack(t)}}))},getPackSizesRows(t,e){const s=this.dispensation.getDrugPackSizes(t);return s.map(t=>{const s=e>0?e/t:"-";return[t,s,0,0]})},calculateCompletePack(t){const e=parseFloat(t.amount_needed)-(t.quantity||0),s=this.dispensation.calcCompletePack(t,e);return s<0?0:s},isDoneDispensing(t){return t.map(t=>0!=t.value).every(Boolean)},async isValidDispensation(t){let e=!0;const s=parseInt(t.value.toString()),r=t.other["amount_needed"],i=s/r*100;return i>110&&(e=await Object(n["a"])("Are you sure you want to dispense over 110% of the prescribed pill count?")),i<100&&(e=await Object(n["a"])("Are you sure you want to dispense less than 100% of the prescribe amount?")),e},getFields(){return[{id:"dispenses",helpText:"Dispensation",type:a["b"].TT_DRUG_DISPENSER,onValueUpdate:async(t,e)=>-1!=t.value&&this.isDoneDispensing(e)?this.gotoPatientDashboard():(t.other["amount_needed"]=0,await this.dispensation.loadCurrentDrugOrder(),this.buildOrderOptions()),onValue:async(t,e)=>{if(-1===t.value){const e=await this.dispensation.voidOrder(t.other.order_id);return!!e}if(!e){const e=await this.isValidDispensation(t);if(!e)return!1}const s=await this.saveDispensations(t);return!!s||(Object(n["e"])("Unable to save dispensation"),!1)},config:{medicationHistory:this.buildMedicationHistory(),toolbarInfo:[{label:"Name",value:this.patient.getFullName()},{label:"Gender",value:this.patient.getGender()},{label:"Date Of Birth",value:p["b"].toStandardHisDisplayFormat(this.patient.getBirthdate())}],hiddenFooterBtns:["Clear","Finish"]},options:()=>this.buildOrderOptions()}]}}}),l=s("6b0d"),h=s.n(l);const D=h()(g,[["render",i]]);e["default"]=D},"71c3":function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));var r=s("1c74");class i extends r["e"]{constructor(){super()}static create(t){return this.postJson("drug_orders",t)}static updateDispensationOrders(t){return this.postJson("dispensations",{program_id:this.getProgramID(),dispensations:t.map(t=>({date:this.getSessionDate(),drug_order_id:t["order_id"],quantity:t["quantity"]}))})}static getDrugOrderHistory(t){return this.getJson("drug_orders",{patient_id:t})}static getDrugOrders(t){return this.getJson("drug_orders",{patient_id:t,date:this.getSessionDate(),program_id:this.getProgramID()})}static getAllDrugOrders(t,e=1e3){return this.getJson("drug_orders",{patient_id:t,program_id:r["e"].getProgramID(),page_size:e})}static getLastDrugsReceived(t){return this.getJson(`patients/${t}/last_drugs_received`,{date:this.getSessionDate(),program_id:this.getProgramID()})}static getDrugDosages(t,e,s=this.getSessionDate()){const r={drug_id:e,date:s};return this.getJson(`programs/${this.getProgramID()}/patients/${t}/drug_doses`,r)}static getOrderByPatient(t,e){return this.getJson("/drug_orders",{patient_id:t,program_id:this.getProgramID(),...e})}}}}]);
//# sourceMappingURL=chunk-28060998.973441eb.js.map