(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a23d2a6"],{"3a8c":function(e,t,r){"use strict";function n(e){return parseInt(e.split("-")[2])||0}r.d(t,"a",(function(){return n}))},"40e3":function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));var n=r("4971"),o=r("2ef0"),a=r("1c74"),s=r("5a0c"),i=r.n(s);function l(e){try{return e.replace(/<(?:.|\n)*?>/gm," ").replace(/\n/g," ").replace(/\t/g," ").replace(/\s{2,}/g," ").replace(/=/g," ").replace(/,/g," ").trim()}catch(t){return e}}function c({columns:e,rows:t,quarter:r,period:s,filters:c}){let d=e.filter(e=>!1!==e.exportable).map(e=>e.label).join(",");return d+="\n",d+=Object(n["sortRows"])(t,(null===c||void 0===c?void 0:c.sort)||[]).map(t=>e.filter(e=>!1!==e.exportable).map(e=>{let r=Object(o["get"])(t,e.path);return"function"===typeof e.formatter&&r&&(r=e.formatter(r,t)),l(e.drillable&&Array.isArray(r)?r.length:r)}).join(",")).join("\n"),d+="\nDate Created:  "+i()().format("DD/MMM/YYYY HH:MM:ss"),r&&(d+="\nQuarter: "+r),s&&(d+="\nQuarter: "+s),d+="\ne-Mastercard Version : "+a["e"].getAppVersion(),d+="\nAPI Version "+a["e"].getApiVersion(),d+="\nSite UUID: "+a["e"].getSiteUUID(),d}function d(e){const t=new Blob([c(e)],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a");r.href=window.URL.createObjectURL(t),r.setAttribute("download",e.filename+".csv"),document.body.appendChild(r),r.click(),document.body.removeChild(r)}},"564f":function(e,t,r){"use strict";var n=r("7a23");function o(e,t,r,o,a,s){const i=Object(n["resolveComponent"])("IonIcon"),l=Object(n["resolveComponent"])("IonButton"),c=Object(n["resolveComponent"])("IonButtons"),d=Object(n["resolveComponent"])("IonTitle"),u=Object(n["resolveComponent"])("IonToolbar"),p=Object(n["resolveComponent"])("IonHeader"),b=Object(n["resolveComponent"])("data-table"),g=Object(n["resolveComponent"])("IonContent"),m=Object(n["resolveComponent"])("IonPage");return Object(n["openBlock"])(),Object(n["createBlock"])(m,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(c,{slot:"end"},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(l,{slot:"end",onClick:t[0]||(t[0]=t=>e.modal.hide()),"icon-only":""},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(i,{icon:e.close},null,8,["icon"])]),_:1})]),_:1}),Object(n["createVNode"])(d,null,{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.title),1)]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(b,{rows:e.rows,"async-rows":e.asyncRows,columns:e.columns,"row-actions-buttons":e.rowActionButtons,"actions-buttons":e.actionBtns,color:"custom"},null,8,["rows","async-rows","columns","row-actions-buttons","actions-buttons"])]),_:1})]),_:1})}r("14d9");var a=r("d867"),s=r("4971"),i=r("ff79"),l=r("da44"),c=r("5a0c"),d=r.n(c),u=r("40e3"),p=Object(n["defineComponent"])({name:"DrilldownTable",components:{DataTable:s["DataTable"],IonButton:a["IonButton"],IonPage:a["IonPage"],IonHeader:a["IonHeader"],IonContent:a["IonContent"],IonToolbar:a["IonToolbar"],IonButtons:a["IonButtons"],IonTitle:a["IonTitle"],IonIcon:a["IonIcon"]},props:{title:{type:String,default:"Report"},rows:{type:Array,default:()=>[]},asyncRows:{type:Function},columns:{type:Array,default:()=>[]},rowActionButtons:{type:Array,default:()=>[]},actionButtons:{type:Array,default:()=>[]},canExportCsv:{type:Boolean,default:!0},period:{type:String,default:""}},setup(e){const t=Object(n["computed"])(()=>{const t=[...e.actionButtons];return e.canExportCsv&&t.push({label:"CSV",color:"primary",action:async(t,r,n,o)=>Object(u["a"])({rows:r,filters:n,columns:o,period:e.period.includes("Custom")?e.period.substring(6):e.period,filename:`${e.title}-${d()().format("DD-MMM-YYYY")}`})}),t});return{close:i["close"],modal:l["a"],actionBtns:t}}}),b=r("d959"),g=r.n(b);const m=g()(p,[["render",o]]);t["a"]=m},5969:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r("ade3"),o=(r("14d9"),r("1c74")),a=r("9283"),s=r("bef6"),i=r("5a0c"),l=r.n(i);class c extends o["e"]{constructor(){super(),Object(n["a"])(this,"programID",void 0),Object(n["a"])(this,"startDate",void 0),Object(n["a"])(this,"endDate",void 0),Object(n["a"])(this,"date",void 0),Object(n["a"])(this,"quarter",void 0),this.endDate="",this.startDate="",this.quarter="",this.date=o["e"].getSessionDate(),this.programID=o["e"].getProgramID()}getDateIntervalPeriod(){return`${a["c"].toStandardHisDisplayFormat(this.startDate)} - ${a["c"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(e){this.startDate=e}setEndDate(e){this.endDate=e}setQuarter(e){this.quarter=e}getReport(e,t={}){return o["e"].getJson(e,this.buildRequest(t))}getMaternalStatus(e,t="pepfar"){const r=s["a"].parameterizeObjToString(this.buildRequest({report_definition:t}));return o["e"].postJson("vl_maternal_status?"+r,{patient_ids:e})}buildRequest(e={}){const t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.quarter&&(t["quarter"]=this.quarter),{...t,...e}}static getQuarterBounds(e){const t=t=>l()(`${e}-${t}-01`).daysInMonth(),r=t=>`${e}-${t}-01 00:00`,n=r=>`${e}-${r}-${t(r)} 00:00`;return{Q1:{qtr:1,start:r("01"),end:n("03")},Q2:{qtr:2,start:r("04"),end:n("06")},Q3:{qtr:3,start:r("07"),end:n("09")},Q4:{qtr:4,start:r("10"),end:n("12")}}}static getQtrByDate(e){const t=this.getQuarterBounds(e.getFullYear());for(const r in t){const{start:n,end:o}=t[r];if(e>=new Date(n)&&e<=new Date(o))return t[r]}return null}static buildQtrObj(e,t){const r=this.getQuarterBounds(t),{start:n,end:o}=r[e];return{start:n,end:o,name:`${e} ${t}`}}static getReportQuarters(e=5){const t=[];let r=new Date,n=r.getFullYear();const o=n;r=new Date(`${o}-${r.getMonth()+1}-${r.getDate()} 00:00`);const a=this.getQtrByDate(r);let s=a.qtr,i=0;4===s&&t.push(this.buildQtrObj("Q1",n+1));while(i<e)0===i&&s<4&&t.push(this.buildQtrObj("Q"+(s+1),n)),t.push(this.buildQtrObj("Q"+s,n)),s=s>0?s-=1:s,n=0==s?n-1:n,s=0==s?s+=4:s,i++;return t}}},8727:function(e,t,r){"use strict";var n=r("7a23");const o=["src"],a=["innerHTML"],s=["innerHTML"],i={key:1},l={key:2},c={key:3},d={key:4};function u(e,t,r,u,p,b){const g=Object(n["resolveComponent"])("ion-col"),m=Object(n["resolveComponent"])("ion-row"),h=Object(n["resolveComponent"])("ion-grid"),f=Object(n["resolveComponent"])("ion-card-header"),y=Object(n["resolveComponent"])("data-table"),j=Object(n["resolveComponent"])("ion-card-content"),O=Object(n["resolveComponent"])("ion-card"),w=Object(n["resolveComponent"])("Layout");return Object(n["openBlock"])(),Object(n["createBlock"])(w,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(O,{style:{padding:"0 !important"}},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(f,{style:{"border-bottom":"1px solid #c2c2c2","font-weight":"500",color:"#000"}},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(h,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(m,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(g,{size:"1",class:"ion-padding ion-margin-end"},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("img",{src:"assets/images/"+e.reportIcon,style:Object(n["normalizeStyle"])({height:e.subtitle?7:"5rem",width:e.subtitle?7:"5rem"})},null,12,o)]),_:1}),Object(n["createVNode"])(g,null,{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("h1",{innerHTML:e.title},null,8,a),e.subtitle?(Object(n["openBlock"])(),Object(n["createElementBlock"])("h3",{key:0,innerHTML:e.subtitle,style:{color:"#818181"}},null,8,s)):Object(n["createCommentVNode"])("",!0),e.useDateRangeFilter?(Object(n["openBlock"])(),Object(n["createElementBlock"])("h5",i," Period: "+Object(n["toDisplayString"])(e.period),1)):e.useQuarterFilter?(Object(n["openBlock"])(),Object(n["createElementBlock"])("h5",l," Quarter: "+Object(n["toDisplayString"])(e.quarter.value),1)):e.useDateFilter?(Object(n["openBlock"])(),Object(n["createElementBlock"])("h5",c,"Date: "+Object(n["toDisplayString"])(e.dayjs(e.date).format("DD/MMM/YYYY")),1)):Object(n["createCommentVNode"])("",!0),e.totalClients?(Object(n["openBlock"])(),Object(n["createElementBlock"])("h5",d,"Total Clients: "+Object(n["toDisplayString"])(e.totalClients),1)):Object(n["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})]),_:1}),Object(n["createVNode"])(j,{class:"ion-no-padding",style:{"min-height":"45vh"}},{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(y,{rows:e.rows,"async-rows":e.asyncRows,columns:e.columns,"actions-buttons":e.actionBtns,"row-actions-buttons":e.rowActionButtons,"custom-filters":e.filters,config:{showIndices:e.showIndices},onCustomFilter:e.onCustomFilter,onDrilldown:e.onDrilldown,color:"custom"},Object(n["createSlots"])({_:2},[Object(n["renderList"])(e.$slots,(t,r)=>({name:r,fn:Object(n["withCtx"])(({filter:t})=>[Object(n["renderSlot"])(e.$slots,r,{filter:t})])}))]),1032,["rows","async-rows","columns","actions-buttons","row-actions-buttons","custom-filters","config","onCustomFilter","onDrilldown"])]),_:3})]),_:3})]),_:3})}r("14d9");var p=r("d867"),b=r("ad8d"),g=r("5a0c"),m=r.n(g),h=r("8d56"),f=r("5969"),y=r("4971"),j=r("b5e4"),O=r("2ef0"),w=r("40e3"),D=Object(n["defineComponent"])({name:"BaseReportTable",components:{IonCard:p["IonCard"],IonCardHeader:p["IonCardHeader"],IonCardContent:p["IonCardContent"],Layout:h["a"],IonGrid:p["IonGrid"],IonRow:p["IonRow"],IonCol:p["IonCol"],DataTable:y["DataTable"]},props:{title:{type:String,default:"Report"},subtitle:{type:String,default:""},period:{type:String,default:""},date:{type:String,default:""},quarter:{type:Object,default:()=>({})},totalClients:{type:Number,default:0},reportIcon:{type:String,default:"reports/report.png"},columns:{type:Array,default:()=>[]},rows:{type:Array,default:()=>[]},asyncRows:{type:Function},actionButtons:{type:Array,default:()=>[]},rowActionButtons:{type:Array,default:()=>[]},canExportCsv:{type:Boolean,default:!0},canExportPDF:{type:Boolean,default:!0},showRefreshButton:{type:Boolean,default:!0},useDateRangeFilter:{type:Boolean,default:!1},useQuarterFilter:{type:Boolean,default:!1},useDateFilter:{type:Boolean,default:!1},customFilters:{type:Array,default:()=>[]},showIndices:{type:Boolean,default:!1}},emits:["regenerate","customFilter","drilldown"],setup(e,{emit:t}){const r=Object(n["computed"])(()=>`${b["b"].getLocationName()} ${e.title} ${e.period?e.period:e.date}`),o=Object(n["computed"])(()=>{const n=[...e.actionButtons];return e.showRefreshButton&&n.push({label:"Refresh/Rebuild",color:"success",action:()=>t("regenerate")}),e.canExportCsv&&n.push({label:"CSV",color:"primary",action:async(t,n,o,a)=>{var s;return Object(w["a"])({rows:n,filters:o,columns:a,quarter:null===(s=e.quarter)||void 0===s?void 0:s.label,period:e.period,filename:r.value})}}),n}),a=Object(n["computed"])(()=>{const t=[...e.customFilters];return e.useDateRangeFilter?t.push({id:"dateRange",label:"Date Range",type:"dateRange",gridSize:5,value:{startDate:e.period.split("-")[0],endDate:e.period.split("-")[1]}}):e.useQuarterFilter?t.push({id:"quarter",label:"Quarter:",type:"select",value:e.quarter,options:f["a"].getReportQuarters().map(e=>({label:e.name,value:e.name,other:e}))}):e.useDateFilter&&t.push({id:"date",label:"Date",type:"date",value:e.date}),t}),s=e=>"dateRange"in e&&new Date(e.dateRange.startDate)>new Date(e.dateRange.endDate)?Object(j["e"])("Invalid date range"):a.value.every(t=>!1===t.required||(Object(O["isEmpty"])(e[t.id])||"object"!==typeof e[t.id]?!Object(O["isEmpty"])(e[t.id]):Object.values(e[t.id]).every(e=>!Object(O["isEmpty"])(e))))?t("customFilter",e):void Object(j["e"])("Invalid filters"),i=e=>{t("drilldown",e)};return{actionBtns:o,filters:a,onCustomFilter:s,onDrilldown:i,dayjs:m.a}}}),v=r("d959"),C=r.n(v);const I=C()(D,[["render",u]]);t["a"]=I},"9a5e":function(e,t,r){"use strict";r.d(t,"b",(function(){return c})),r.d(t,"a",(function(){return d}));var n=r("ade3"),o=(r("14d9"),r("13d5"),r("5969")),a=r("bef6"),s=r("2ef0"),i=r("ad8d");const l=["F","M"],c=["Died","IIT <3 mo","IIT 3-5 mo","IIT 6+ mo","Tranferred out","Refused (Stopped)"];class d extends o["a"]{constructor(){super(),Object(n["a"])(this,"org",void 0),Object(n["a"])(this,"initializeArvRefillReportTables",void 0),this.org="pepfar",this.initializeArvRefillReportTables=!0}initArvRefillPeriod(e){this.initializeArvRefillReportTables=e}setOrg(e){this.org=e}getClinicTxRtt(){return this.getReport(`programs/${this.programID}/reports/clinic_tx_rtt`)}getTxMMDClientLevelData(e){const t=a["a"].parameterizeObjToString({start_date:this.startDate,end_date:this.endDate,program_id:this.programID,date:this.date,org:this.org}),r="tx_mmd_client_level_data?"+t;return o["a"].postJson(r,{patient_ids:e})}remapTxClientLevelData(e){return e.map(e=>{let t=null;const r=[];for(const n in e){const o=Object.values(e[n]);o.forEach(e=>{for(const n in e){const o=e[n];t||(t={id:o.arv_number,dob:o.birthdate,dispenseDate:o.start_date}),r.push({name:o.drug_name,quantity:o.quantity,dose:o.dose_per_day})}})}return{...t,drugs:r}})}getTxCurrMMDReport(e,t){return this.getReport("arv_refill_periods",{org:this.org,min_age:""+e,max_age:""+t,initialize_tables:""+this.initializeArvRefillReportTables})}getTxMlReport(){return this.getReport("tx_ml")}getTxRttReport(){return this.getReport("tx_rtt")}buildTxMlReportData(e){const t=[];return l.forEach(r=>{i["a"].forEach(n=>{const o={gender:r,age_group:n};c.forEach((t,a)=>{o[t]=Object(s["get"])(e,`${n}.${r}[${a}]`,[])}),t.push(o)})}),t}aggregateTxML(e,t,r){return Object.values(e).reduce((e,n)=>n[t]?[...n[t][c.indexOf(r)],...e]:e,[])}getAggregatedTxMLMaleData(e){const t={gender:"Male",age_group:"All"};for(const r of c)t[r]=this.aggregateTxML(e,"M",r);return t}async getAggregatedTxMLMaternalStatus(e){const t=c.reduce((t,r)=>[...t,{indicator:r,data:this.aggregateTxML(e,"F",r)}],[]),r=Object(s["uniq"])(t.reduce((e,t)=>[...e,...t.data],[]).map(e=>e.patient_id)),n=await this.getMaternalStatus(r),o=n.FBf.concat(n.FP),a=[];for(const s of["FP","FNP","FBf"]){const e={gender:s,age_group:"All"};for(const r of c)e[r]=t.reduce((e,t)=>t.indicator===r?[...e,...t.data]:e,[]).filter(e=>"FNP"===s?!o.includes(e.patient_id):n[s].includes(e.patient_id));a.push(e)}return a}}},ad8d:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return a}));var n=r("5969");const o=["<1 year","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90 plus years"];class a extends n["a"]{constructor(){super()}getBookedAppointments(e){return n["a"].getJson(`programs/${this.programID}/scheduled_appointments`,{date:e})}getViralLoadResults(e){return this.getReport(`/programs/${this.programID}/reports/high_vl_patients`,{range:e})}getOtherOutcome(e){return this.getReport("patient_outcome_list",{outcome:e})}getPatientVisitTypes(){return this.getReport("patient_visit_types")}getClientsDueForVl(){return this.getReport("clients_due_vl")}getClientRentention(){return this.getReport(`/programs/${this.programID}/reports/retention`)}getExternalConsultationClients(){return this.getReport(this.programID+"/external_consultation_clients")}getMissedAppointments(){return this.getReport("missed_appointments")}getPregnantWomen(){return this.getReport(`/programs/${this.programID}/reports/pregnant_patients`)}getArchivingCandidates(){return n["a"].getJson(`programs/${this.programID}/reports/archiving_candidates`,{start_date:this.date})}getIncompleteVisits(){return this.getReport("incomplete_visits",{tool_name:"INCOMPLETE VISITS"})}}},c5a9:function(e,t,r){"use strict";r.r(t);var n=r("7a23");function o(e,t,r,o,a,s){const i=Object(n["resolveComponent"])("base-report-table");return Object(n["openBlock"])(),Object(n["createBlock"])(i,{title:"PEPFAR TX CURR MMD Report",subtitle:"Clients that are alive and on treatment in the reporting period and\n      the difference in days between their clinical dispensation visit and \n      next appointment / drug-runout date is: 3 months (1 - 89 days), \n      3 - 5 months (90 - 179 days), 6+ months (180 or more days)","report-icon":"reports/px.png",columns:e.columns,rows:e.rows,period:e.period,useDateRangeFilter:"",onCustomFilter:e.fetchData,onDrilldown:e.onDrilldown},null,8,["columns","rows","period","onCustomFilter","onDrilldown"])}r("14d9");var a=r("b211"),s=r("8727"),i=r("da44"),l=r("564f"),c=r("ad8d"),d=r("9a5e"),u=r("23e6"),p=r("9283"),b=r("5a0c"),g=r.n(b),m=r("0011"),h=r("3a8c"),f=Object(n["defineComponent"])({name:"TBPrev",components:{BaseReportTable:s["a"]},setup(){const e=Object(n["ref"])("-"),t=Object(n["ref"])([]),r=[{path:"index",label:"#",initialSort:!0,initialSortOrder:"asc"},{path:"age_group",label:"Age group"},{path:"gender",label:"Gender",formatter:m["g"]},{path:"underThree",label:"# of clients on <3 months of ARVs",drillable:!0},{path:"betweenThreeAndFive",label:"# of clients on 3 - 5 months of ARVs",drillable:!0},{path:"overSix",label:"# of clients on >= 6 months of ARVs",drillable:!0}],o=e=>{const t=Object.keys(e);return{underThree:t.filter(t=>e[t]["prescribed_days"]<90),betweenThreeAndFive:t.filter(t=>e[t]["prescribed_days"]>=90&&e[t]["prescribed_days"]<=150),overSix:t.filter(t=>e[t]["prescribed_days"]>150)}},s=async({dateRange:r})=>{await a["a"].show();const n=new d["a"];n.setStartDate(r.startDate),n.setEndDate(r.endDate),e.value=n.getDateIntervalPeriod(),n.initArvRefillPeriod(!0);let s=1,i=21,l=0,u=0;const p=[],b=[];for(const e of c["a"]){if("<1 year"===e)l=0,u=0;else if("90 plus years"===e)l=90,u=1e3;else{const[t,r]=e.split("-");l=parseInt(t),u=parseInt(r)}const t=await n.getTxCurrMMDReport(l,u),r=!!t&&"Male"in t,a=!!t&&"Female"in t;p.push({index:i++,age_group:e,gender:"Male",...o(r?t["Male"]:{})}),b.push({index:s++,age_group:e,gender:"Female",...o(a?t["Female"]:{})}),n.initArvRefillPeriod(!1)}t.value=[...b,...p],await a["a"].hide()},b=async e=>{const t=[{path:"arv_number",label:"ARV Number",preSort:h["a"],initialSort:!0},{path:"birthdate",label:"Date of Birth",formatter:e=>g()(e).format(p["a"])},{path:"gender",label:"Gender",formatter:m["g"]},{path:"address",label:"Address"}],r=e.row[e.column.path],n=[];for(const o of r){const e=await u["a"].findByID(o),t=new u["a"](e);n.push({arv_number:t.getArvNumber(),birthdate:t.getBirthdate(),gender:t.getGender(),address:""+t.getCurrentVillage()})}await i["a"].show(l["a"],{title:`${e.row.age_group} ${e.column.label} ${e.row.gender}s`,columns:t,rows:n})};return{rows:t,columns:r,period:e,fetchData:s,onDrilldown:b}}}),y=r("d959"),j=r.n(y);const O=j()(f,[["render",o]]);t["default"]=O},da44:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r("d867");const o={async show(e,t,r="custom-modal",o=!0){const a=await n["modalController"].create({component:e,cssClass:r,backdropDismiss:o,componentProps:t});a.present();const{data:s}=await a.onWillDismiss();if(s)return s},async hide(e){await n["modalController"].dismiss(e)}}}}]);
//# sourceMappingURL=chunk-4a23d2a6.328a90af.js.map