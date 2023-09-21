(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10ecdc1e"],{"44e3":function(t,e,a){"use strict";a("14d9");var r=a("1c74"),n=a("7a23"),o=a("b446"),i=a("23e6"),s=a("9283"),l=a("d867"),c=a("d6aa"),d=a("5969"),u=a("d95e"),p=a("2706"),h=a("9ceb"),m=a("2ef0"),w=a("8e8b"),b=a("3e53"),g=a("0011"),D=Object(n["defineComponent"])({data:()=>({app:b["a"].getActiveApp(),fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",isMilitarySite:!1,drillDownCache:{}}),methods:{formatGender(t){return Object(g["b"])(t)},toDate(t){return s["b"].toStandardHisDisplayFormat(t)},sortByArvNumber(t,e="arv_number"){try{return t.sort((t,a)=>this.getArvInt(t[e])>this.getArvInt(a[e])?1:-1)}catch(a){return console.error(a),t}},getArvInt(t){if("string"===typeof t){const[e,a,r]=t.split("-"),n=parseInt(r);return"number"===typeof n?n:0}return 0},tdARV(t,e={}){return h["a"].td(t,{sortValue:this.getArvInt(t),...e})},confirmPatient(t){return this.$router.push("/patients/confirm?person_id="+t)},async drilldownAsyncRows(t,e,a,r=!0){const n=await l["Z"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:t,columns:e,asyncRows:a,canExport:r,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["Z"].dismiss()}});n.present()},async drilldownData(t,e,a,r){const n=await l["Z"].create({component:c["a"],cssClass:"large-modal",componentProps:{title:t,columns:e,rows:a,rowParser:r,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>l["Z"].dismiss()}});n.present()},getDefaultDrillDownTable(){const t=[[h["a"].thTxt("ARV number"),h["a"].thTxt("Gender"),h["a"].thTxt("Birth Date"),h["a"].thTxt("Actions")]],e=async t=>{let e=0;const a=t.map(async t=>{let a=null,r=null;if(Object(m["isArray"])(t)){const[e,a]=t;if(r=e,a in this.drillDownCache){const[t,...e]=this.drillDownCache[a];return[r,...e]}}else if(a=t,a in this.drillDownCache)return this.drillDownCache[a];const n=await i["a"].findByID(a),o=new i["a"](n),s=[];return r&&(e=1,s.push(r)),s.push(this.tdARV(o.getArvNumber())),s.push(h["a"].td(this.formatGender(o.getGender()))),s.push(h["a"].tdDate(o.getBirthdate().toString())),s.push(h["a"].tdBtn("Show",async()=>{await l["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+a})})),this.drillDownCache[a]=s,s}),r=await Promise.all(a);return r.sort((t,a)=>t[e].sortValue>a[e].sortValue?1:-1)};return{rowParser:e,columns:t}},runTableDrill(t,e="Drilldown patients"){const{columns:a,rowParser:r}=this.getDefaultDrillDownTable();this.drilldownData(e,a,t,r)},drill(t,e="Drill table"){return t&&t.length>0?h["a"].tdLink(t.length,()=>this.runTableDrill(t,e)):h["a"].td(0)},getQuaterOptions(){const t=d["a"].getReportQuarters();return t.map(t=>({label:t.name,value:t.start,other:t}))},getDateDurationFields(t=!1,e=!1,a=5,n=r["e"].getSessionDate()){const i="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:u["b"].TT_SELECT,condition:()=>t,validation:t=>p["a"].required(t),options:()=>{const t=d["a"].getReportQuarters(a);let r=t.map(t=>({label:t.name,value:t.start,other:t}));return e&&(r=[{label:"Set custom period",value:"custom_period",other:{}},...r]),r}},...Object(o["b"])({id:"start_date",helpText:"Start",required:!0,condition:e=>e.quarter&&"custom_period"===e.quarter.value||!t,minDate:()=>i,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:t=>t}),...Object(o["b"])({id:"end_date",helpText:"End",required:!0,condition:e=>e.quarter&&"custom_period"===e.quarter.value||!t,unload:(t,e,a,r)=>{"next"===e&&(this.endDate=r.end_date)},minDate:(t,e)=>e.start_date,maxDate:()=>n,estimation:{allowUnknown:!1},computeValue:t=>t}),{id:"occupation",helpText:"Report Group",type:u["b"].TT_SELECT,init:async()=>(this.isMilitarySite=await w["a"].get("IS_MILITARY_SITE"),!0),computedValue:t=>t.value,condition:()=>{var t;return"ART"===(null===(t=this.app)||void 0===t?void 0:t.applicationName)&&this.isMilitarySite},validation:t=>p["a"].required(t),options:()=>[{label:"All",value:"All"},{label:"Military",value:"Military"},{label:"Civilian",value:"Civilian"}]}]}}});const v=D;e["a"]=v},6955:function(t,e,a){"use strict";a.r(e);var r=a("7a23");function n(t,e,a,n,o,i){const s=Object(r["resolveComponent"])("report-template"),l=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(l,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(s,{title:t.title,rows:t.rows,columns:t.columns},null,8,["title","rows","columns"])]),_:1})}a("14d9");var o=a("44e3"),i=a("d6aa"),s=a("9ceb"),l=a("ad8d"),c=a("d867"),d=a("0011"),u=Object(r["defineComponent"])({mixins:[o["a"]],components:{ReportTemplate:i["a"],IonPage:c["D"]},data:()=>({title:"Active clients with adverse outcomes",rows:[],columns:[[s["a"].thTxt("Filing#"),s["a"].thTxt("Outcome"),s["a"].thTxt("Outcome date")]]}),async created(){const t=new l["b"],e=await t.getArchivingCandidates();this.title="Active clients with adverse outcomes - "+Object(d["g"])(t.date),e.forEach(t=>{this.rows.push([s["a"].td(t.filing_number),s["a"].td(t.outcome),s["a"].tdDate(t.outcome_date)])})}}),p=a("6b0d"),h=a.n(p);const m=h()(u,[["render",n]]);e["default"]=m}}]);
//# sourceMappingURL=chunk-10ecdc1e.b4ae1b0e.js.map