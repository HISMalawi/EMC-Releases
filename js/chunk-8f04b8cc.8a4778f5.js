(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f04b8cc"],{"05e1":function(e,t,r){"use strict";var a=r("7a23");const n={class:"my-table",style:{margin:"auto",width:"95%","margin-top":"3%","margin-bottom":"3%"}};function s(e,t,r,s,i,o){const d=Object(a["resolveComponent"])("report-table");return Object(a["openBlock"])(),Object(a["createBlock"])("div",n,[Object(a["createVNode"])(d,{columns:e.columns,rows:e.rows,config:{tableCssTheme:e.tableCssTheme}},null,8,["columns","rows","config"])])}var i=r("6d14"),o=r("1c74"),d=r("5a0c"),l=r.n(d),c=r("80e3"),h=r("9ceb"),u=Object(a["defineComponent"])({components:{ReportTable:c["a"]},data:function(){return{conditions:[],lessThanFiveYears:" < 5 yrs ",greaterAndEqualFiveYears:" >= 5 yrs ",total:" Total ",tableCssTheme:"opd-report-theme",rows:[],columns:[[h["a"].thTxt("",{colspan:2,sortable:!1,exportable:!1}),h["a"].thTxt("Out-patient Cases",{colspan:3,sortable:!1,exportable:!1})],[h["a"].thTxt(""),h["a"].thTxt("Diseases/Events/Conditions"),h["a"].thTxt("< 5 yrs"),h["a"].thTxt(">= 5 yrs"),h["a"].thTxt("Total")]]}},props:["params","epiweek","quarter","onDrillDown"],methods:{renderResults(){const e=new i["a"],t=e.renderResults(this.params);t.length&&(this.conditions=t,this.rows=this.buildRows(t))},onDownload(){const e=new i["a"];let{CSVString:t}=e.getCSVString(this.conditions);t+=`\n          Date Created: ${l()().format("DD/MMM/YYYY HH:MM:ss")}\n          His-Core Version: ${o["e"].getCoreVersion()}\n          API Version: ${o["e"].getApiVersion()}\n          Report Period: ${this.epiweek}\n          Site: ${o["e"].getLocationName()}\n          Site UUID: ${o["e"].getSiteUUID()}`;const r=new Blob([t],{type:"text/csv;charset=utf-8;"}),a=`${o["e"].getLocationName()} Weekly IDSR report ${this.quarter}`;if(navigator.msSaveBlob)navigator.msSaveBlob(r,"exportFilename");else{const e=document.createElement("a");e.href=window.URL.createObjectURL(r),e.setAttribute("download",a+".csv"),document.body.appendChild(e),e.click(),document.body.removeChild(e)}},buildRows(e){const t=[];return e.forEach(e=>{t.push([h["a"].td(e.id,{style:{textAlign:"left"}}),h["a"].td(e.name,{style:{textAlign:"left"}}),this.buildRow(this.lessThanFiveYears+"("+e.name+")",e.lessThanFiveYears,e.lessThanFiveYearsPatientIds),this.buildRow(this.greaterAndEqualFiveYears+"("+e.name+")",e.greaterThanEqualFiveYears,e.greaterThanEqualFiveYearsPatientIds),this.buildRow(this.total+"("+e.name+")",e.total,e.totalPatientIds)])}),t},buildRow(e,t,r){return"string"==typeof t?h["a"].td(""):t>0?h["a"].tdLink(t,async()=>this.onDrillDown(e,r)):h["a"].td(0)}},watch:{params:{immediate:!0,handler(){this.renderResults()}}}}),p=r("6b0d"),m=r.n(p);const g=m()(u,[["render",s]]);t["a"]=g},"6d14":function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var a=r("fcd5"),n=r("1c74");class s extends a["d"]{constructor(){super(),this.regenerate=!1}setRegenerate(e){this.regenerate=e}requestIDSRWeekly(){return this.getReport("generate_weekly_idsr_report",{request:"true"})}requestIDSRMonthly(){return this.getReport("generate_monthly_idsr_report",{request:"true"})}renderResults(e){const t=[];let r=1;for(const[a,n]of Object.entries(e)){const e=[],s=n,i={id:0,name:"",lessThanFiveYears:"",lessThanFiveYearsPatientIds:"",greaterThanEqualFiveYears:"",greaterThanEqualFiveYearsPatientIds:"",total:0,totalPatientIds:""};i.name=a;let o=0;i.id=r,r+=1;for(const[t,r]of Object.entries(s)){const a=r;null!=a&&(o+=a.length,i.total=o,a.length&&(e.push(...a),i.totalPatientIds=e),"<5yrs"==t&&(i.lessThanFiveYears=a.length,i.lessThanFiveYearsPatientIds=a),">=5yrs"==t&&(i.greaterThanEqualFiveYears=a.length,i.greaterThanEqualFiveYearsPatientIds=a))}t.push(i)}return t}getCSVString(e){let t="Diseases/Events/Conditions, <5 yrs, >=5 yrs, Total,\n";for(const r of e)t+=`${r.name},${r.lessThanFiveYears},${r.greaterThanEqualFiveYears},${r.total},\n`;return{CSVString:t}}static async getReportEpiWeeks(){const e=[],t=await n["e"].getJson("get_weeks");return t.reverse().forEach(t=>{const r=t[1].split(" "),a=r[0],n=r[2],s=t[0].split("W"),i=s[0]+"/W"+s[1];e.push({name:i,start:a,end:n})}),e}static async getReportMonths(){const e=[],t=await n["e"].getJson("get_months");return t.forEach(t=>{const r=t[1],a=r[0],n=r[1],s=n.split("to");e.push({name:a,start:s[0],end:s[1].trim()})}),e}}},7920:function(e,t,r){"use strict";var a=r("7a23");function n(e,t,r,n,s,i){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var s=r("9441"),i=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:s["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),o=r("6b0d"),d=r.n(o);const l=d()(i,[["render",n]]);t["a"]=l},c2b0:function(e,t,r){"use strict";var a=r("7a23"),n=r("b446"),s=r("23e6"),i=r("9283"),o=r("8a30"),d=r("d6aa"),l=r("fcd5"),c=r("6d14"),h=r("d95e"),u=r("2706"),p=r("9ceb"),m=r("5a0c"),g=r.n(m),D=r("1c74"),b=r("2ef0"),w=Object(a["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{toDate(e){return i["b"].toStandardHisDisplayFormat(e)},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async exportToCustomPDF(e){const t=open("","","width:1024px, height:768px"),r=document.getElementById("report-content");r&&t&&(t.document.write(`\n                    <html>\n                    <head>\n                        <title>${e}</title>\n                        <link rel="stylesheet" media="print" href="/assets/css/cohort.css" />\n                    </head>\n                    <body>\n                        ${r.innerHTML}\n                    </body>\n                    </html>\n                `),setTimeout(()=>{t.print(),t.close()},3500))},async onDrillDown(e,t){if(Object(b["isEmpty"])(t))return;const r=[[p["a"].thTxt("First name"),p["a"].thTxt("Last name"),p["a"].thTxt("Gender"),p["a"].thTxt("Age"),p["a"].thTxt("Phone"),p["a"].thTxt("Address"),p["a"].thTxt("Action")]],a=async e=>await Promise.all(e.map(async e=>{const t=await s["a"].findByID(e),r=new s["a"](t);return[p["a"].td(r.getGivenName()),p["a"].td(r.getFamilyName()),p["a"].td(r.getGender()),p["a"].td(r.getAge()),p["a"].td(r.getPhoneNumber()),p["a"].td(`${r.getCurrentDistrict()}, ${r.getCurrentVillage()}, ${r.getClosestLandmark()}`),p["a"].tdBtn("Select",async()=>{await o["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+e})})]}));return this.drilldownData(e,r,t,a)},async drilldownAsyncRows(e,t,r){const a=await o["X"].create({component:d["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:r,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>o["X"].dismiss()}});a.present()},async drilldownData(e,t,r,a){const n=await o["X"].create({component:d["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:r,rowParser:a,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>o["X"].dismiss()}});n.present()},getDefaultDrillDownTable(){const e=[[p["a"].thTxt("ARV number"),p["a"].thTxt("Gender"),p["a"].thTxt("Birth Date"),p["a"].thTxt("Actions")]],t=e=>e.map(async e=>{const[t,r]=e;if(r in this.drillDownCache)return[t];const a=await s["a"].findByID(r),n=new s["a"](a),i=[t,p["a"].td(n.getArvNumber()),p["a"].td(n.getGender()),p["a"].tdDate(n.getBirthdate().toString()),p["a"].tdBtn("Show",async()=>{await o["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+r})})];return this.drillDownCache[r]=i,i});return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:r,rowParser:a}=this.getDefaultDrillDownTable();this.drilldownData(t,r,e,a)},drill(e,t="Drill table"){return e&&e.length>0?p["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):p["a"].td(0)},getEpiweeksFields(){return[{id:"epiweek",helpText:"Select EPI week",type:h["b"].TT_SELECT,validation:e=>u["a"].required(e),options:async()=>{const e=await c["a"].getReportEpiWeeks(),t=e.map(e=>({label:e.name+" - ("+g()(e.start).format("DD/MMM/YYYY")+" - "+g()(e.end).format("DD/MMM/YYYY")+")",value:e.start,other:e}));return t}}]},getMonthlyFields(){return[{id:"idsrmonth",helpText:"Select Month",type:h["b"].TT_SELECT,validation:e=>u["a"].required(e),options:async()=>{const e=await c["a"].getReportMonths(),t=e.map(e=>({label:e.name+" - ("+g()(e.start).format("DD/MMM/YYYY")+" - "+g()(e.end).format("DD/MMM/YYYY")+")",value:e.start,other:e}));return t}}]},getDateDurationFields(e=!1,t=!1,r=5){const a="2001-01-01",s=D["e"].getSessionDate();return[{id:"quarter",helpText:"Select Quarter",type:h["b"].TT_SELECT,condition:()=>e,validation:e=>u["a"].required(e),options:()=>{const e=l["d"].getReportQuarters(r);let a=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(a=[{label:"Set custom period",value:"custom_period",other:{}},...a]),a}},...Object(n["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>a,maxDate:()=>s,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(n["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,r,a)=>{"next"===t&&(this.endDate=a.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>s,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const y=w;t["a"]=y},cb01:function(e,t,r){"use strict";var a=r("7a23");const n={style:{margin:"auto",width:"95%","margin-top":"1%"}};function s(e,t,r,s,i,o){const d=Object(a["resolveComponent"])("report-table");return Object(a["openBlock"])(),Object(a["createBlock"])("div",n,[Object(a["createVNode"])(d,{columns:e.columns,rows:e.rows,config:{tableCssTheme:e.tableCssTheme}},null,8,["columns","rows","config"])])}var i=r("80e3"),o=r("9ceb"),d=Object(a["defineComponent"])({components:{ReportTable:i["a"]},props:{clinicName:{type:String,default:""},reportparams:{type:Object,required:!0},totalOPDVisits:{type:Number,required:!0},reportName:{type:String,required:!0},periodLabel:{type:String,required:!0},periodDates:{type:String,required:!0},rangeLabel:{type:String,required:!0},range:{type:String,required:!0}},data:function(){return{tableCssTheme:"opd-report-theme",rows:[],columns:[[o["a"].thTxt(this.reportName,{colspan:2,sortable:!1,exportable:!1})]]}},mounted(){this.initTable()},methods:{initTable(){const e=[],t=[{name:"Country:",value:"Malawi"},{name:"Reporting Facility Name:",value:this.clinicName},{name:this.rangeLabel+":",value:this.range},{name:this.periodLabel+":",value:this.periodDates},{name:"Total OPD Visits:",value:this.totalOPDVisits}];t.forEach(t=>{"undefined:"!==t.name&&e.push([o["a"].td(t.name,{style:{textAlign:"left"}}),o["a"].td(t.value,{style:{textAlign:"left"}})])}),this.rows=e}}}),l=r("6b0d"),c=r.n(l);const h=c()(d,[["render",s]]);t["a"]=h},fcd5:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return d})),r.d(t,"b",(function(){return l})),r.d(t,"d",(function(){return c}));var a=r("1c74"),n=r("9283"),s=r("b89f"),i=r("bef6");const o={one:"AL 1",two:"AL 2",three:"AL 3",four:"LA 4"},d=["Diabetes","Hypertension","Stroke","Suspected cancer","Confirmed cancer","Palliative cancer","Asthma","Depression","Acute psychosis","Chronic psychosis","Epilepsy"],l=["Organic mental disorder (Chronic)","Organic mental disorder (acute)","Alcohol use mental disorder","Drug use mental disorder","Schizophrenia","Acute and transient psychotic disorder","Schizo-affective disorder","Mood-affective disorder (MANIC)","Mood-affective disorder (BIPOLAR)","Mood-affective disorder (DEPRESSION)","Anxiety disorder","Stress reaction adjustment disorder","Dissociative conversion disorder","Somatoform disorder","Puerperal mental disorder","Personality/Behaviour disorder","Mental retardation","Psychological mental disorder","Hyperkinetic conduct disorder","Epilepsy"];class c extends a["e"]{constructor(){super(),this.endDate="",this.startDate="",this.epiweek="",this.date=a["e"].getSessionDate(),this.programID=a["e"].getProgramID()}getPatientsWithNIDs(){return this.getReport("with_nids")}getClinicRegistrations(){return this.getReport("registration")}getDrugsGivenWithoutPrescription(){return this.getReport("drugs_given_without_prescription")}getDrugsGivenWithPrescription(){return this.getReport("drugs_given_with_prescription")}getDiagnosis(){const e=`programs/${this.programID}/reports/diagnosis`;return a["e"].getJson(e,{start_date:this.startDate,end_date:this.endDate,date:this.date})}getDiagnosisByAddress(){return this.getReport("diagnosis_by_address")}getLaPrescriptions(){const e=`programs/${this.programID}/reports/la_prescriptions`;return a["e"].getJson(e,{start_date:this.startDate,end_date:this.endDate})}printLaReport(e){const t=new s["a"],r=`programs/${this.programID}/barcodes/la_report`,a={"date[start]":this.startDate,"date[end]":this.endDate};return Object.keys(o).forEach((t,r)=>{r++,a[r+"[prescription]"]=e[`total_la_${t}_prescribed_drugs`],a[r+"[dispensed]"]=e[`total_la_${t}_dispensed_drugs`]}),t.printLbl(`${r}?${i["a"].parameterizeObjToString(a)}`)}getDateIntervalPeriod(){return`${n["b"].toStandardHisDisplayFormat(this.startDate)} - ${n["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(e){this.startDate=e}setEndDate(e){this.endDate=e}setEpiWeek(e){this.epiweek=e}getReportPeriod(){return this.startDate&&this.endDate?`${n["b"].toStandardHisDisplayFormat(this.startDate)} - ${n["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(e,t={}){return a["e"].getJson(e,this.buildRequest(t))}buildRequest(e={}){const t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.epiweek&&(t["epiweek"]=this.epiweek),{...t,...e}}static getReportQuarters(e=4){const t=[];let r=n["b"].getCurrentYear();for(let a=0;a<e;++a)t.push({name:"Q4 "+r,start:r+"-10-01",end:r+"-12-31"}),t.push({name:"Q3 "+r,start:r+"-07-01",end:r+"-09-30"}),t.push({name:"Q2 "+r,start:r+"-04-01",end:r+"-06-30"}),t.push({name:"Q1 "+r,start:r+"-01-01",end:r+"-03-31"}),--r;return t}}}}]);
//# sourceMappingURL=chunk-8f04b8cc.8a4778f5.js.map