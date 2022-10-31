(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48a533fb"],{3822:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r("fcd5");class a extends n["d"]{constructor(){super(),this.regenerate=!1}setRegenerate(t){this.regenerate=t}requestHMIS15(){return this.getReport("generate_hmis_15_report",{request:"true"})}requestHMIS17(){return this.getReport("generate_hmis_17_report",{request:"true"})}renderResults(t){const e=[];let r=1;for(const[n,a]of Object.entries(t)){const t=[],s=a,i={id:0,name:"",total:0,totalPatientIds:""};i.name=n;let o=0;i.id=r,r+=1;for(const[e,r]of Object.entries(s)){const e=r;null!=e&&(o+=e.length,i.total=o,e.length&&(t.push(...e),i.totalPatientIds=t))}e.push(i)}return e}getCSVString(t){let e="Diseases/Events/Conditions, #,\n";for(const r of t){const t=`${r.name},${r.total},\n`;e+=t}return{CSVString:e}}}},"6d14":function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var n=r("fcd5"),a=r("1c74");class s extends n["d"]{constructor(){super(),this.regenerate=!1}setRegenerate(t){this.regenerate=t}requestIDSRWeekly(){return this.getReport("generate_weekly_idsr_report",{request:"true"})}requestIDSRMonthly(){return this.getReport("generate_monthly_idsr_report",{request:"true"})}renderResults(t){const e=[];let r=1;for(const[n,a]of Object.entries(t)){const t=[],s=a,i={id:0,name:"",lessThanFiveYears:"",lessThanFiveYearsPatientIds:"",greaterThanEqualFiveYears:"",greaterThanEqualFiveYearsPatientIds:"",total:0,totalPatientIds:""};i.name=n;let o=0;i.id=r,r+=1;for(const[e,r]of Object.entries(s)){const n=r;null!=n&&(o+=n.length,i.total=o,n.length&&(t.push(...n),i.totalPatientIds=t),"<5yrs"==e&&(i.lessThanFiveYears=n.length,i.lessThanFiveYearsPatientIds=n),">=5yrs"==e&&(i.greaterThanEqualFiveYears=n.length,i.greaterThanEqualFiveYearsPatientIds=n))}e.push(i)}return e}getCSVString(t){let e="Diseases/Events/Conditions, <5 yrs, >=5 yrs, Total,\n";for(const r of t)e+=`${r.name},${r.lessThanFiveYears},${r.greaterThanEqualFiveYears},${r.total},\n`;return{CSVString:e}}static async getReportEpiWeeks(){const t=[],e=await a["e"].getJson("get_weeks");return e.reverse().forEach(e=>{const r=e[1].split(" "),n=r[0],a=r[2],s=e[0].split("W"),i=s[0]+"/W"+s[1];t.push({name:i,start:n,end:a})}),t}static async getReportMonths(){const t=[],e=await a["e"].getJson("get_months");return e.forEach(e=>{const r=e[1],n=r[0],a=r[1],s=a.split("to");t.push({name:n,start:s[0],end:s[1].trim()})}),t}}},7920:function(t,e,r){"use strict";var n=r("7a23");function a(t,e,r,a,s,i){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var s=r("9441"),i=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:s["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),o=r("6b0d"),d=r.n(o);const l=d()(i,[["render",a]]);e["a"]=l},"9d7f":function(t,e,r){"use strict";var n=r("7a23");const a={class:"my-table",style:{margin:"auto",width:"95%","margin-top":"3%","margin-bottom":"3%"}};function s(t,e,r,s,i,o){const d=Object(n["resolveComponent"])("report-table");return Object(n["openBlock"])(),Object(n["createBlock"])("div",a,[Object(n["createVNode"])(d,{columns:t.columns,rows:t.rows,config:{tableCssTheme:t.tableCssTheme}},null,8,["columns","rows","config"])])}var i=r("3822"),o=r("1c74"),d=r("5a0c"),l=r.n(d),c=r("80e3"),u=r("9ceb"),h=Object(n["defineComponent"])({components:{ReportTable:c["a"]},data:function(){return{conditions:[],tableCssTheme:"opd-report-theme",total:" Total ",rows:[],columns:[[u["a"].thTxt(""),u["a"].thTxt("Diseases/Events/Conditions"),u["a"].thTxt("UNVERIFIED"),u["a"].thTxt("VERIFIED")]]}},props:["params","periodDates","quarter","onDrillDown","reportName"],methods:{renderResults(){const t=new i["a"],e=t.renderResults(this.params);e.length&&(this.conditions=e,this.rows=this.buildRows(e))},onDownload(){const t=new i["a"];let{CSVString:e}=t.getCSVString(this.conditions);e+=`\n          Date Created: ${l()().format("DD/MMM/YYYY HH:MM:ss")}\n          His-Core Version: ${o["e"].getCoreVersion()}\n          API Version: ${o["e"].getApiVersion()}\n          Report Period: ${this.periodDates}\n          Site: ${o["e"].getLocationName()}\n          Site UUID: ${o["e"].getSiteUUID()}`;const r=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=`${o["e"].getLocationName()} ${this.reportName} ${this.quarter}`;if(navigator.msSaveBlob)navigator.msSaveBlob(r,"exportFilename");else{const t=document.createElement("a");t.href=window.URL.createObjectURL(r),t.setAttribute("download",n+".csv"),document.body.appendChild(t),t.click(),document.body.removeChild(t)}},buildRows(t){const e=[];return t.forEach(t=>{e.push([u["a"].td(t.id,{style:{textAlign:"left"}}),u["a"].td(t.name,{style:{textAlign:"left"}}),this.buildRow(this.total+"("+t.name+")",t.total,t.totalPatientIds),u["a"].td("")])}),e},buildRow(t,e,r){return e>0?u["a"].tdLink(e,async()=>this.onDrillDown(t,r)):u["a"].td(0)}},watch:{params:{immediate:!0,handler(){this.renderResults()}}}}),p=r("6b0d"),m=r.n(p);const g=m()(h,[["render",s]]);e["a"]=g},c2b0:function(t,e,r){"use strict";var n=r("7a23"),a=r("b446"),s=r("23e6"),i=r("9283"),o=r("8a30"),d=r("d6aa"),l=r("fcd5"),c=r("6d14"),u=r("d95e"),h=r("2706"),p=r("9ceb"),m=r("5a0c"),g=r.n(m),D=r("1c74"),b=r("2ef0"),f=Object(n["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{toDate(t){return i["b"].toStandardHisDisplayFormat(t)},confirmPatient(t){return this.$router.push("/patients/confirm?person_id="+t)},async exportToCustomPDF(t){const e=open("","","width:1024px, height:768px"),r=document.getElementById("report-content");r&&e&&(e.document.write(`\n                    <html>\n                    <head>\n                        <title>${t}</title>\n                        <link rel="stylesheet" media="print" href="/assets/css/cohort.css" />\n                    </head>\n                    <body>\n                        ${r.innerHTML}\n                    </body>\n                    </html>\n                `),setTimeout(()=>{e.print(),e.close()},3500))},async onDrillDown(t,e){if(Object(b["isEmpty"])(e))return;const r=[[p["a"].thTxt("First name"),p["a"].thTxt("Last name"),p["a"].thTxt("Gender"),p["a"].thTxt("Age"),p["a"].thTxt("Phone"),p["a"].thTxt("Address"),p["a"].thTxt("Action")]],n=async t=>await Promise.all(t.map(async t=>{const e=await s["a"].findByID(t),r=new s["a"](e);return[p["a"].td(r.getGivenName()),p["a"].td(r.getFamilyName()),p["a"].td(r.getGender()),p["a"].td(r.getAge()),p["a"].td(r.getPhoneNumber()),p["a"].td(`${r.getCurrentDistrict()}, ${r.getCurrentVillage()}, ${r.getClosestLandmark()}`),p["a"].tdBtn("Select",async()=>{await o["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+t})})]}));return this.drilldownData(t,r,e,n)},async drilldownAsyncRows(t,e,r){const n=await o["Z"].create({component:d["a"],cssClass:"large-modal",componentProps:{title:t,columns:e,asyncRows:r,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>o["Z"].dismiss()}});n.present()},async drilldownData(t,e,r,n){const a=await o["Z"].create({component:d["a"],cssClass:"large-modal",componentProps:{title:t,columns:e,rows:r,rowParser:n,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>o["Z"].dismiss()}});a.present()},getDefaultDrillDownTable(){const t=[[p["a"].thTxt("ARV number"),p["a"].thTxt("Gender"),p["a"].thTxt("Birth Date"),p["a"].thTxt("Actions")]],e=t=>t.map(async t=>{const[e,r]=t;if(r in this.drillDownCache)return[e];const n=await s["a"].findByID(r),a=new s["a"](n),i=[e,p["a"].td(a.getArvNumber()),p["a"].td(a.getGender()),p["a"].tdDate(a.getBirthdate().toString()),p["a"].tdBtn("Show",async()=>{await o["Z"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+r})})];return this.drillDownCache[r]=i,i});return{rowParser:e,columns:t}},runTableDrill(t,e="Drilldown patients"){const{columns:r,rowParser:n}=this.getDefaultDrillDownTable();this.drilldownData(e,r,t,n)},drill(t,e="Drill table"){return t&&t.length>0?p["a"].tdLink(t.length,()=>this.runTableDrill(t,e)):p["a"].td(0)},getEpiweeksFields(){return[{id:"epiweek",helpText:"Select EPI week",type:u["b"].TT_SELECT,validation:t=>h["a"].required(t),options:async()=>{const t=await c["a"].getReportEpiWeeks(),e=t.map(t=>({label:t.name+" - ("+g()(t.start).format("DD/MMM/YYYY")+" - "+g()(t.end).format("DD/MMM/YYYY")+")",value:t.start,other:t}));return e}}]},getMonthlyFields(){return[{id:"idsrmonth",helpText:"Select Month",type:u["b"].TT_SELECT,validation:t=>h["a"].required(t),options:async()=>{const t=await c["a"].getReportMonths(),e=t.map(t=>({label:t.name+" - ("+g()(t.start).format("DD/MMM/YYYY")+" - "+g()(t.end).format("DD/MMM/YYYY")+")",value:t.start,other:t}));return e}}]},getDateDurationFields(t=!1,e=!1,r=5){const n="2001-01-01",s=D["e"].getSessionDate();return[{id:"quarter",helpText:"Select Quarter",type:u["b"].TT_SELECT,condition:()=>t,validation:t=>h["a"].required(t),options:()=>{const t=l["d"].getReportQuarters(r);let n=t.map(t=>({label:t.name,value:t.start,other:t}));return e&&(n=[{label:"Set custom period",value:"custom_period",other:{}},...n]),n}},...Object(a["b"])({id:"start_date",helpText:"Start",required:!0,condition:e=>e.quarter&&"custom_period"===e.quarter.value||!t,minDate:()=>n,maxDate:()=>s,estimation:{allowUnknown:!1},computeValue:t=>t}),...Object(a["b"])({id:"end_date",helpText:"End",required:!0,condition:e=>e.quarter&&"custom_period"===e.quarter.value||!t,unload:(t,e,r,n)=>{"next"===e&&(this.endDate=n.end_date)},minDate:(t,e)=>e.start_date,maxDate:()=>s,estimation:{allowUnknown:!1},computeValue:t=>t})]}}});const w=f;e["a"]=w},cb01:function(t,e,r){"use strict";var n=r("7a23");const a={style:{margin:"auto",width:"95%","margin-top":"1%"}};function s(t,e,r,s,i,o){const d=Object(n["resolveComponent"])("report-table");return Object(n["openBlock"])(),Object(n["createBlock"])("div",a,[Object(n["createVNode"])(d,{columns:t.columns,rows:t.rows,config:{tableCssTheme:t.tableCssTheme}},null,8,["columns","rows","config"])])}var i=r("80e3"),o=r("9ceb"),d=Object(n["defineComponent"])({components:{ReportTable:i["a"]},props:{clinicName:{type:String,default:""},reportparams:{type:Object,required:!0},totalOPDVisits:{type:Number,required:!0},reportName:{type:String,required:!0},periodLabel:{type:String,required:!0},periodDates:{type:String,required:!0},rangeLabel:{type:String,required:!0},range:{type:String,required:!0}},data:function(){return{tableCssTheme:"opd-report-theme",rows:[],columns:[[o["a"].thTxt(this.reportName,{colspan:2,sortable:!1,exportable:!1})]]}},mounted(){this.initTable()},watch:{totalOPDVisits(t,e){this.initTable()}},methods:{initTable(){const t=[],e=[{name:"Country:",value:"Malawi"},{name:"Reporting Facility Name:",value:this.clinicName},{name:this.rangeLabel+":",value:this.range},{name:this.periodLabel+":",value:this.periodDates},{name:"Total OPD Visits:",value:this.totalOPDVisits}];e.forEach(e=>{"undefined:"!==e.name&&t.push([o["a"].td(e.name,{style:{textAlign:"left"}}),o["a"].td(e.value,{style:{textAlign:"left"}})])}),this.rows=t}}}),l=r("6b0d"),c=r.n(l);const u=c()(d,[["render",s]]);e["a"]=u},fcd5:function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"c",(function(){return d})),r.d(e,"b",(function(){return l})),r.d(e,"d",(function(){return c}));var n=r("1c74"),a=r("9283"),s=r("b89f"),i=r("bef6");const o={one:"AL 1",two:"AL 2",three:"AL 3",four:"LA 4"},d=["Diabetes","Hypertension","Stroke","Suspected cancer","Confirmed cancer","Palliative cancer","Asthma","Depression","Acute psychosis","Chronic psychosis","Epilepsy"],l=["Organic mental disorder (Chronic)","Organic mental disorder (acute)","Alcohol use mental disorder","Drug use mental disorder","Schizophrenia","Acute and transient psychotic disorder","Schizo-affective disorder","Mood-affective disorder (MANIC)","Mood-affective disorder (BIPOLAR)","Mood-affective disorder (DEPRESSION)","Anxiety disorder","Stress reaction adjustment disorder","Dissociative conversion disorder","Somatoform disorder","Puerperal mental disorder","Personality/Behaviour disorder","Mental retardation","Psychological mental disorder","Hyperkinetic conduct disorder","Epilepsy"];class c extends n["e"]{constructor(){super(),this.endDate="",this.startDate="",this.epiweek="",this.date=n["e"].getSessionDate(),this.programID=n["e"].getProgramID()}getPatientsWithNIDs(){return this.getReport("with_nids")}getClinicRegistrations(){return this.getReport("registration")}getAttendance(){return this.getReport(`programs/${this.programID}/reports/attendance`)}getDrugsGivenWithoutPrescription(){return this.getReport("drugs_given_without_prescription")}getDrugsGivenWithPrescription(){return this.getReport("drugs_given_with_prescription")}getDiagnosis(){const t=`programs/${this.programID}/reports/diagnosis`;return n["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate,date:this.date})}getDiagnosisByAddress(){return this.getReport("diagnosis_by_address")}getLaPrescriptions(){const t=`programs/${this.programID}/reports/la_prescriptions`;return n["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate})}printLaReport(t){const e=new s["a"],r=`programs/${this.programID}/barcodes/la_report`,n={"date[start]":this.startDate,"date[end]":this.endDate};return Object.keys(o).forEach((e,r)=>{r++,n[r+"[prescription]"]=t[`total_la_${e}_prescribed_drugs`],n[r+"[dispensed]"]=t[`total_la_${e}_dispensed_drugs`]}),e.printLbl(`${r}?${i["a"].parameterizeObjToString(n)}`)}getDateIntervalPeriod(){return`${a["b"].toStandardHisDisplayFormat(this.startDate)} - ${a["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(t){this.startDate=t}setEndDate(t){this.endDate=t}setEpiWeek(t){this.epiweek=t}getReportPeriod(){return this.startDate&&this.endDate?`${a["b"].toStandardHisDisplayFormat(this.startDate)} - ${a["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(t,e={}){return n["e"].getJson(t,this.buildRequest(e))}buildRequest(t={}){const e={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),this.epiweek&&(e["epiweek"]=this.epiweek),{...e,...t}}static getReportQuarters(t=4){const e=[];let r=a["b"].getCurrentYear();for(let n=0;n<t;++n)e.push({name:"Q4 "+r,start:r+"-10-01",end:r+"-12-31"}),e.push({name:"Q3 "+r,start:r+"-07-01",end:r+"-09-30"}),e.push({name:"Q2 "+r,start:r+"-04-01",end:r+"-06-30"}),e.push({name:"Q1 "+r,start:r+"-01-01",end:r+"-03-31"}),--r;return e}}}}]);
//# sourceMappingURL=chunk-48a533fb.395fb670.js.map