(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04e668ba"],{e4c1:function(t,e,r){"use strict";r.r(e);var s=r("7a23");function i(t,e,r,i,a,o){const n=Object(s["resolveComponent"])("report-template"),d=Object(s["resolveComponent"])("ion-page");return Object(s["openBlock"])(),Object(s["createBlock"])(d,null,{default:Object(s["withCtx"])(()=>[Object(s["createVNode"])(n,{title:t.title,rows:t.rows,fields:t.fields,columns:t.columns,period:t.period,onReportConfiguration:t.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]),_:1})}r("13d5"),r("14d9");var a=r("fcd5"),o=r("552a"),n=r("9ceb"),d=r("44e3"),c=r("2ef0"),p=r("d867"),h=Object(s["defineComponent"])({components:{ReportTemplate:o["a"],IonPage:p["D"]},mixins:[d["a"]],data:()=>({title:"OPD diagnosis by address report",rows:[],reportService:{},columns:[[n["a"].thTxt("Address"),n["a"].thTxt("Diagnosis"),n["a"].thTxt("Count")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(t,e){this.reportService=new a["d"],this.reportService.setStartDate(e.start_date),this.reportService.setEndDate(e.end_date),this.period=this.reportService.getDateIntervalPeriod(),this.rows=this.buildRows(await this.reportService.getDiagnosisByAddress())},totalDiagnosis(t){return Object.values(t).reduce((t,e)=>t+e,0)},buildRows(t){const e=[];if(Object(c["isEmpty"])(t))return e;for(const r in t)for(const s in t[r])e.push([n["a"].td(s),n["a"].td(r),n["a"].td(t[r][s])]);return e}}}),u=r("d959"),g=r.n(u);const l=g()(h,[["render",i]]);e["default"]=l},fcd5:function(t,e,r){"use strict";r.d(e,"a",(function(){return d})),r.d(e,"c",(function(){return c})),r.d(e,"b",(function(){return p})),r.d(e,"d",(function(){return h}));var s=r("ade3"),i=(r("14d9"),r("1c74")),a=r("9283"),o=r("b89f"),n=r("bef6");const d={one:"AL 1",two:"AL 2",three:"AL 3",four:"LA 4"},c=["Diabetes","Hypertension","Stroke","Suspected cancer","Confirmed cancer","Palliative cancer","Asthma","Depression","Acute psychosis","Chronic psychosis","Epilepsy"],p=["Organic mental disorder (Chronic)","Organic mental disorder (acute)","Alcohol use mental disorder","Drug use mental disorder","Schizophrenia","Acute and transient psychotic disorder","Schizo-affective disorder","Mood-affective disorder (MANIC)","Mood-affective disorder (BIPOLAR)","Mood-affective disorder (DEPRESSION)","Anxiety disorder","Stress reaction adjustment disorder","Dissociative conversion disorder","Somatoform disorder","Puerperal mental disorder","Personality/Behaviour disorder","Mental retardation","Psychological mental disorder","Hyperkinetic conduct disorder","Epilepsy"];class h extends i["e"]{constructor(){super(),Object(s["a"])(this,"programID",void 0),Object(s["a"])(this,"startDate",void 0),Object(s["a"])(this,"endDate",void 0),Object(s["a"])(this,"date",void 0),Object(s["a"])(this,"epiweek",void 0),this.endDate="",this.startDate="",this.epiweek="",this.date=i["e"].getSessionDate(),this.programID=i["e"].getProgramID()}getPatientsWithNIDs(){return this.getReport("with_nids")}getClinicRegistrations(){return this.getReport("registration")}getAttendance(){return this.getReport(`programs/${this.programID}/reports/attendance`)}getDrugsGivenWithoutPrescription(){return this.getReport("drugs_given_without_prescription")}getDrugsGivenWithPrescription(){return this.getReport("drugs_given_with_prescription")}getDiagnosis(){const t=`programs/${this.programID}/reports/diagnosis`;return i["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate,date:this.date})}getDiagnosisByAddress(){return this.getReport("diagnosis_by_address")}getLaPrescriptions(){const t=`programs/${this.programID}/reports/la_prescriptions`;return i["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate})}getMalariaReport(){const t=`programs/${this.programID}/reports/malaria_report`;return i["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate,date:this.date})}printLaReport(t){const e=new o["a"],r=`programs/${this.programID}/barcodes/la_report`,s={"date[start]":this.startDate,"date[end]":this.endDate};return Object.keys(d).forEach((e,r)=>{r++,s[r+"[prescription]"]=t[`total_la_${e}_prescribed_drugs`],s[r+"[dispensed]"]=t[`total_la_${e}_dispensed_drugs`]}),e.printLbl(`${r}?${n["a"].parameterizeObjToString(s)}`)}getDateIntervalPeriod(){return`${a["b"].toStandardHisDisplayFormat(this.startDate)} - ${a["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(t){this.startDate=t}setEndDate(t){this.endDate=t}setEpiWeek(t){this.epiweek=t}getReportPeriod(){return this.startDate&&this.endDate?`${a["b"].toStandardHisDisplayFormat(this.startDate)} - ${a["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(t,e={}){return i["e"].getJson(t,this.buildRequest(e))}buildRequest(t={}){const e={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),this.epiweek&&(e["epiweek"]=this.epiweek),{...e,...t}}static getReportQuarters(t=4){const e=[];let r=a["b"].getCurrentYear();for(let s=0;s<t;++s)e.push({name:"Q4 "+r,start:r+"-10-01",end:r+"-12-31"}),e.push({name:"Q3 "+r,start:r+"-07-01",end:r+"-09-30"}),e.push({name:"Q2 "+r,start:r+"-04-01",end:r+"-06-30"}),e.push({name:"Q1 "+r,start:r+"-01-01",end:r+"-03-31"}),--r;return e}}}}]);
//# sourceMappingURL=chunk-04e668ba.097d76f2.js.map