(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50f87f26"],{"40e3":function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));var o=r("4971"),a=r("2ef0"),n=r("1c74"),i=r("5a0c"),l=r.n(i);function s(e){try{return e.replace(/<(?:.|\n)*?>/gm," ").replace(/\n/g," ").replace(/\t/g," ").replace(/\s{2,}/g," ").replace(/=/g," ").replace(/,/g," ").trim()}catch(t){return e}}function c({columns:e,rows:t,quarter:r,period:i,filters:c}){let d=e.filter(e=>!1!==e.exportable).map(e=>e.label).join(",");return d+="\n",d+=Object(o["sortRows"])(t,(null===c||void 0===c?void 0:c.sort)||[]).map(t=>e.filter(e=>!1!==e.exportable).map(e=>{let r=Object(a["get"])(t,e.path);return"function"===typeof e.formatter&&r&&(r=e.formatter(r,t)),s(e.drillable&&Array.isArray(r)?r.length:r)}).join(",")).join("\n"),d+="\nDate Created:  "+l()().format("DD/MMM/YYYY HH:MM:ss"),r&&(d+="\nQuarter: "+r),i&&(d+="\nQuarter: "+i),d+="\ne-Mastercard Version : "+n["e"].getAppVersion(),d+="\nAPI Version "+n["e"].getApiVersion(),d+="\nSite UUID: "+n["e"].getSiteUUID(),d}function d(e){const t=new Blob([c(e)],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a");r.href=window.URL.createObjectURL(t),r.setAttribute("download",e.filename+".csv"),document.body.appendChild(r),r.click(),document.body.removeChild(r)}},8727:function(e,t,r){"use strict";var o=r("7a23");const a=["src"],n=["innerHTML"],i=["innerHTML"],l={key:1},s={key:2},c={key:3},d={key:4};function u(e,t,r,u,p,m){const b=Object(o["resolveComponent"])("ion-col"),g=Object(o["resolveComponent"])("ion-row"),f=Object(o["resolveComponent"])("ion-grid"),j=Object(o["resolveComponent"])("ion-card-header"),h=Object(o["resolveComponent"])("data-table"),y=Object(o["resolveComponent"])("ion-card-content"),O=Object(o["resolveComponent"])("ion-card"),w=Object(o["resolveComponent"])("Layout");return Object(o["openBlock"])(),Object(o["createBlock"])(w,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(O,{style:{padding:"0 !important"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(j,{style:{"border-bottom":"1px solid #c2c2c2","font-weight":"500",color:"#000"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(f,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(g,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(b,{size:"1",class:"ion-padding ion-margin-end"},{default:Object(o["withCtx"])(()=>[Object(o["createElementVNode"])("img",{src:"assets/images/"+e.reportIcon,style:Object(o["normalizeStyle"])({height:e.subtitle?7:"5rem",width:e.subtitle?7:"5rem"})},null,12,a)]),_:1}),Object(o["createVNode"])(b,null,{default:Object(o["withCtx"])(()=>[Object(o["createElementVNode"])("h1",{innerHTML:e.title},null,8,n),e.subtitle?(Object(o["openBlock"])(),Object(o["createElementBlock"])("h3",{key:0,innerHTML:e.subtitle,style:{color:"#818181"}},null,8,i)):Object(o["createCommentVNode"])("",!0),e.useDateRangeFilter?(Object(o["openBlock"])(),Object(o["createElementBlock"])("h5",l," Period: "+Object(o["toDisplayString"])(e.period),1)):e.useQuarterFilter?(Object(o["openBlock"])(),Object(o["createElementBlock"])("h5",s," Quarter: "+Object(o["toDisplayString"])(e.quarter.value),1)):e.useDateFilter?(Object(o["openBlock"])(),Object(o["createElementBlock"])("h5",c,"Date: "+Object(o["toDisplayString"])(e.dayjs(e.date).format("DD/MMM/YYYY")),1)):Object(o["createCommentVNode"])("",!0),e.totalClients?(Object(o["openBlock"])(),Object(o["createElementBlock"])("h5",d,"Total Clients: "+Object(o["toDisplayString"])(e.totalClients),1)):Object(o["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})]),_:1}),Object(o["createVNode"])(y,{class:"ion-no-padding",style:{"min-height":"45vh"}},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(h,{rows:e.rows,"async-rows":e.asyncRows,columns:e.columns,"actions-buttons":e.actionBtns,"row-actions-buttons":e.rowActionButtons,"custom-filters":e.filters,config:{showIndices:e.showIndices},onCustomFilter:e.onCustomFilter,onDrilldown:e.onDrilldown,color:"custom"},Object(o["createSlots"])({_:2},[Object(o["renderList"])(e.$slots,(t,r)=>({name:r,fn:Object(o["withCtx"])(({filter:t})=>[Object(o["renderSlot"])(e.$slots,r,{filter:t})])}))]),1032,["rows","async-rows","columns","actions-buttons","row-actions-buttons","custom-filters","config","onCustomFilter","onDrilldown"])]),_:3})]),_:3})]),_:3})}r("14d9");var p=r("d867"),m=r("ad8d"),b=r("5a0c"),g=r.n(b),f=r("8d56"),j=r("5969"),h=r("4971"),y=r("b5e4"),O=r("2ef0"),w=r("40e3"),v=Object(o["defineComponent"])({name:"BaseReportTable",components:{IonCard:p["IonCard"],IonCardHeader:p["IonCardHeader"],IonCardContent:p["IonCardContent"],Layout:f["a"],IonGrid:p["IonGrid"],IonRow:p["IonRow"],IonCol:p["IonCol"],DataTable:h["DataTable"]},props:{title:{type:String,default:"Report"},subtitle:{type:String,default:""},period:{type:String,default:""},date:{type:String,default:""},quarter:{type:Object,default:()=>({})},totalClients:{type:Number,default:0},reportIcon:{type:String,default:"reports/report.png"},columns:{type:Array,default:()=>[]},rows:{type:Array,default:()=>[]},asyncRows:{type:Function},actionButtons:{type:Array,default:()=>[]},rowActionButtons:{type:Array,default:()=>[]},canExportCsv:{type:Boolean,default:!0},canExportPDF:{type:Boolean,default:!0},showRefreshButton:{type:Boolean,default:!0},useDateRangeFilter:{type:Boolean,default:!1},useQuarterFilter:{type:Boolean,default:!1},useDateFilter:{type:Boolean,default:!1},customFilters:{type:Array,default:()=>[]},showIndices:{type:Boolean,default:!1},filename:{type:String,default:""}},emits:["regenerate","customFilter","drilldown"],setup(e,{emit:t}){const r=Object(o["computed"])(()=>`${m["b"].getLocationName()} ${e.filename||e.title} ${e.period?e.period:e.date}`),a=Object(o["computed"])(()=>{const o=[...e.actionButtons];return e.showRefreshButton&&o.push({label:"Refresh/Rebuild",color:"success",action:()=>t("regenerate")}),e.canExportCsv&&o.push({label:"CSV",color:"primary",action:async(t,o,a,n)=>{var i;return Object(w["a"])({rows:o,filters:a,columns:n,quarter:null===(i=e.quarter)||void 0===i?void 0:i.label,period:e.period,filename:r.value})}}),o}),n=Object(o["computed"])(()=>{const t=[...e.customFilters];return e.useDateRangeFilter?t.push({id:"dateRange",label:"Date Range",type:"dateRange",gridSize:5,value:{startDate:e.period.split("-")[0],endDate:e.period.split("-")[1]}}):e.useQuarterFilter?t.push({id:"quarter",label:"Quarter:",type:"select",value:e.quarter,options:j["a"].getReportQuarters().map(e=>({label:e.name,value:e.name,other:e}))}):e.useDateFilter&&t.push({id:"date",label:"Date",type:"date",value:e.date}),t}),i=e=>"dateRange"in e&&new Date(e.dateRange.startDate)>new Date(e.dateRange.endDate)?Object(y["e"])("Invalid date range"):n.value.every(t=>!1===t.required||(Object(O["isEmpty"])(e[t.id])||"object"!==typeof e[t.id]?!Object(O["isEmpty"])(e[t.id]):Object.values(e[t.id]).every(e=>!Object(O["isEmpty"])(e))))?t("customFilter",e):void Object(y["e"])("Invalid filters"),l=e=>{t("drilldown",e)};return{actionBtns:a,filters:n,onCustomFilter:i,onDrilldown:l,dayjs:g.a}}}),A=r("d959"),P=r.n(A);const C=P()(v,[["render",u]]);t["a"]=C},"87e7":function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return i})),r.d(t,"e",(function(){return l})),r.d(t,"a",(function(){return s})),r.d(t,"d",(function(){return c}));var o=r("ade3"),a=r("5969");const n=["0A","2A","4A","5A","6A","7A","8A","9A","10A","11A","12A","13A","14A","15A","16A","17A","0P","2P","4PP","4PA","9PP","9PA","11PP","11PA","12PP","12PA","14PP","14PA","15PP","15PA","16P","17PP","17PA"],i=["0A","2A","4A","5A","6A","7A","8A","9A","10A","11A","12A","13A","14A","15A","16A","17A","0P","2P","4P","4PP","4PA","9P","9PP","9PA","11P","11PP","11PA","12PP","12PA","14P","14PP","14PA","15P","15PP","15PA","16P","17P","17PP","17PA"],l=["10 - 13.9 Kg","14 - 19.9 Kg","20 - 24.9 Kg","25 - 29.9 Kg","3 - 3.9 Kg","30 - 34.9 Kg","35 - 39.9 Kg","4 - 4.9 Kg","40 Kg +","40 - 49.9 Kg","50 Kg +","6 - 9.9 Kg","Unknown"],s=["pellets","tablets","granules"];class c extends a["a"]{constructor(){super(),Object(o["a"])(this,"type",void 0),this.type="pepfar"}setReportType(e){this.type=e}getTptNewInitiations(){return this.getReport(`programs/${this.programID}/reports/tpt_newly_initiated`)}getRegimenFormulationReport(e,t){return this.getReport(`programs/${this.programID}/reports/regimens_and_formulations`,{regimen:e,formulation:t})}getRegimenReport(){return this.getReport("regimen_report",{type:this.type})}getRegimenSwitchReport(e=!1){return this.getReport("regimen_switch",{pepfar:e})}getRegimensByWeight(){return this.getReport(`programs/${this.programID}/reports/regimens_by_weight_and_gender`)}getSCReport(e=!1){return this.getReport("sc_arvdisp",{pepfar:e})}}},cd6a:function(e,t,r){"use strict";r.r(t);var o=r("7a23");function a(e,t,r,a,n,i){const l=Object(o["resolveComponent"])("base-report-table");return Object(o["openBlock"])(),Object(o["createBlock"])(l,{title:"MoH Viral Load Report","report-icon":"reports/vl.png",period:e.period,columns:e.columns,rows:e.rows,"custom-filters":e.filters,useDateRangeFilter:"",onRegenerate:t[0]||(t[0]=()=>e.regenerateReport()),onCustomFilter:e.fetchData},null,8,["period","columns","rows","custom-filters","onCustomFilter"])}r("14d9");var n=r("b211"),i=r("8727"),l=r("87e7"),s=r("df93"),c=r("ad8d"),d=r("2ef0"),u=r("9283"),p=Object(o["defineComponent"])({name:"ViralLoad",components:{BaseReportTable:i["a"]},setup(){const e=Object(o["ref"])([]),t=Object(o["ref"])(),r=Object(o["ref"])(),a=Object(o["ref"])("-"),i=[{path:"index",label:"#",initialSort:!0,initialSortOrder:"asc"},{path:"ageGroup",label:"Age Group"},...l["b"].map(e=>({path:e,label:e})),{path:"N/A",label:"Uknown"}],p=async o=>{await n["a"].show();const i=new s["a"];t.value=o.minVL,r.value=o.maxVL,i.setStartDate(o.dateRange.startDate),i.setEndDate(o.dateRange.endDate),a.value=i.getDateIntervalPeriod();const u=await i.getViralLoad({from:t.value,to:r.value});let p=0;const m=[];for(let e of c["a"]){e=e.replace("-"," - ");const t={index:p++,ageGroup:e};for(const r of[...l["b"],"N/A"])t[r]=Object(d["get"])(u,`${e}.${r}`,0);m.push(t)}await n["a"].hide(),e.value=m},m=async()=>{const[e,o]=a.value.split(" - ");e&&o&&await p({dateRange:{startDate:u["c"].toStandardHisFormat(e),endDate:u["c"].toStandardHisFormat(o)},minVL:t.value,maxVL:r.value})},b=Object(o["computed"])(()=>[{id:"minVL",placeholder:"Min Viral Load",type:"number",value:t.value,required:!1},{id:"maxVL",placeholder:"Max Viral Load",type:"number",value:r.value,required:!1}]);return{period:a,rows:e,columns:i,filters:b,regenerateReport:m,fetchData:p}}}),m=r("d959"),b=r.n(m);const g=b()(p,[["render",a]]);t["default"]=g},df93:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var o=r("bef6"),a=r("5969");class n extends a["a"]{constructor(){super()}getVLCoverage(e={}){return this.getReport(`programs/${this.programID}/reports/viral_load_coverage`,{rebuild_outcomes:!0,...e})}getMaternalStatus(e){const t=o["a"].parameterizeObjToString({start_date:this.startDate,end_date:this.endDate,date:this.date,program_id:this.programID,report_definition:"pepfar"});return a["a"].postJson("vl_maternal_status?"+t,{patient_ids:e})}getViralLoad(e={}){return this.getReport(`programs/${this.programID}/reports/vl_disaggregated`,e)}}}}]);
//# sourceMappingURL=chunk-50f87f26.0a151b30.js.map