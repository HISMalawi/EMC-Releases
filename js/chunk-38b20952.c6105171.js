(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38b20952"],{"15ab":function(t,e,s){"use strict";s.r(e);var r=s("7a23");function a(t,e,s,a,i,o){const n=Object(r["resolveComponent"])("report-template"),d=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(d,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(n,{title:t.title,rows:t.rows,fields:t.fields,columns:t.columns,period:t.period,customInfo:t.customInfo,onReportConfiguration:t.init},null,8,["title","rows","fields","columns","period","customInfo","onReportConfiguration"])]),_:1})}s("13d5"),s("14d9");var i=s("fcd5"),o=s("552a"),n=s("9ceb"),d=s("44e3"),l=s("2ef0"),h=s("d867"),c=s("23e6"),u=Object(r["defineComponent"])({components:{ReportTemplate:o["a"],IonPage:h["D"]},mixins:[d["a"]],data:()=>({title:"OPD Diagnosis",rows:[],reportService:{},customInfo:{label:"Total OPD Visits",value:0},columns:[[n["a"].thTxt("Age Groups",{sortable:!1,exportable:!1}),n["a"].thTxt("<6 months",{colspan:2,sortable:!1,exportable:!1}),n["a"].thTxt("6 months < 5 yrs",{colspan:2,sortable:!1,exportable:!1}),n["a"].thTxt("5 yrs < 14 yrs",{colspan:2,sortable:!1,exportable:!1}),n["a"].thTxt("> 14 yrs",{colspan:2,sortable:!1,exportable:!1}),n["a"].thTxt("",{sortable:!1,exportable:!1})],[n["a"].thTxt("Diagnosis"),n["a"].thTxt("F",{value:"Females <6 months"}),n["a"].thTxt("M",{value:"Males <6 months"}),n["a"].thTxt("F",{value:"Females 6 months < 5 yrs"}),n["a"].thTxt("M",{value:"Males 6 months < 5 yrs"}),n["a"].thTxt("F",{value:"Females 5 yrs < 14 yrs"}),n["a"].thTxt("M",{value:"Males 5 yrs < 14 yrs"}),n["a"].thTxt("F",{value:"Females > 14 yrs"}),n["a"].thTxt("M",{value:"Males > 14 yrs"}),n["a"].thTxt("Total")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(t,e){this.reportService=new i["d"],this.reportService.setStartDate(e.start_date),this.reportService.setEndDate(e.end_date),this.period=this.reportService.getDateIntervalPeriod(),this.rows=this.buildRows(await this.reportService.getDiagnosis());const s=await this.reportService.getAttendance();this.customInfo.value=s.length},totalDiagnosis(t){return Object.values(t).reduce((t,e)=>t+e,0)},getDrillDownColumns(){return[[n["a"].thTxt("Patient ID"),n["a"].thTxt("First Name"),n["a"].thTxt("Last Name"),n["a"].thTxt("Gender"),n["a"].thTxt("Phone Number"),n["a"].thTxt("Address")]]},buildColumn(t,e="Drilldown Data"){return Object(l["isEmpty"])(t)?n["a"].td(0):n["a"].tdLink(t.length,async()=>this.drilldownData(e,this.getDrillDownColumns(),t,async t=>await Promise.all(t.map(async t=>{const e=await c["a"].findByID(t),s=new c["a"](e);return[n["a"].td(t),n["a"].td(s.getGivenName()),n["a"].td(s.getFamilyName()),n["a"].td(s.getGender()),n["a"].td(s.getPhoneNumber()),n["a"].td(`${s.getCurrentDistrict()}, ${s.getCurrentVillage()}, ${s.getClosestLandmark()}`)]}))))},buildRows(t){if(Object(l["isEmpty"])(t))return[];const e=[];return Object.keys(t).forEach(s=>{const r=Object(l["get"])(t[s],"F.0-5 months",[]),a=Object(l["get"])(t[s],"M.0-5 months",[]),i=Object(l["get"])(t[s],"F.6 mth < 5 yrs",[]),o=Object(l["get"])(t[s],"M.6 mth < 5 yrs",[]),d=Object(l["get"])(t[s],"F.5-14 yrs",[]),h=Object(l["get"])(t[s],"M.5-14 yrs",[]),c=Object(l["get"])(t[s],"F.>= 14 years",[]),u=Object(l["get"])(t[s],"M.>= 14 years",[]);e.push([n["a"].td(s,{style:{textAlign:"left"}}),this.buildColumn(r,"under 6 months females diagnosed with "+s),this.buildColumn(a,"under 6 months males diagnosed with "+s),this.buildColumn(i,"under 5 years females diagnosed with "+s),this.buildColumn(o,"under 5 years males diagnosed with "+s),this.buildColumn(d,"under 14 years females diagnosed with "+s),this.buildColumn(h,"under 14 years males diagnosed with "+s),this.buildColumn(c,"over 14 years females diagnosed with "+s),this.buildColumn(u,"over 14 years males diagnosed with "+s),this.buildColumn([...i,...o,...r,...a,...d,...h,...c,...u],"Total diagnosed with "+s)])}),e.sort((t,e)=>t[0].td<e[0].td?-1:t[0].td>e[0].td?1:0)}}}),p=s("d959"),g=s.n(p);const m=g()(u,[["render",a]]);e["default"]=m},fcd5:function(t,e,s){"use strict";s.d(e,"a",(function(){return d})),s.d(e,"c",(function(){return l})),s.d(e,"b",(function(){return h})),s.d(e,"d",(function(){return c}));var r=s("ade3"),a=(s("14d9"),s("1c74")),i=s("9283"),o=s("b89f"),n=s("bef6");const d={one:"AL 1",two:"AL 2",three:"AL 3",four:"LA 4"},l=["Diabetes","Hypertension","Stroke","Suspected cancer","Confirmed cancer","Palliative cancer","Asthma","Depression","Acute psychosis","Chronic psychosis","Epilepsy"],h=["Organic mental disorder (Chronic)","Organic mental disorder (acute)","Alcohol use mental disorder","Drug use mental disorder","Schizophrenia","Acute and transient psychotic disorder","Schizo-affective disorder","Mood-affective disorder (MANIC)","Mood-affective disorder (BIPOLAR)","Mood-affective disorder (DEPRESSION)","Anxiety disorder","Stress reaction adjustment disorder","Dissociative conversion disorder","Somatoform disorder","Puerperal mental disorder","Personality/Behaviour disorder","Mental retardation","Psychological mental disorder","Hyperkinetic conduct disorder","Epilepsy"];class c extends a["e"]{constructor(){super(),Object(r["a"])(this,"programID",void 0),Object(r["a"])(this,"startDate",void 0),Object(r["a"])(this,"endDate",void 0),Object(r["a"])(this,"date",void 0),Object(r["a"])(this,"epiweek",void 0),this.endDate="",this.startDate="",this.epiweek="",this.date=a["e"].getSessionDate(),this.programID=a["e"].getProgramID()}getPatientsWithNIDs(){return this.getReport("with_nids")}getClinicRegistrations(){return this.getReport("registration")}getAttendance(){return this.getReport(`programs/${this.programID}/reports/attendance`)}getDrugsGivenWithoutPrescription(){return this.getReport("drugs_given_without_prescription")}getDrugsGivenWithPrescription(){return this.getReport("drugs_given_with_prescription")}getDiagnosis(){const t=`programs/${this.programID}/reports/diagnosis`;return a["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate,date:this.date})}getDiagnosisByAddress(){return this.getReport("diagnosis_by_address")}getLaPrescriptions(){const t=`programs/${this.programID}/reports/la_prescriptions`;return a["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate})}getMalariaReport(){const t=`programs/${this.programID}/reports/malaria_report`;return a["e"].getJson(t,{start_date:this.startDate,end_date:this.endDate,date:this.date})}printLaReport(t){const e=new o["a"],s=`programs/${this.programID}/barcodes/la_report`,r={"date[start]":this.startDate,"date[end]":this.endDate};return Object.keys(d).forEach((e,s)=>{s++,r[s+"[prescription]"]=t[`total_la_${e}_prescribed_drugs`],r[s+"[dispensed]"]=t[`total_la_${e}_dispensed_drugs`]}),e.printLbl(`${s}?${n["a"].parameterizeObjToString(r)}`)}getDateIntervalPeriod(){return`${i["b"].toStandardHisDisplayFormat(this.startDate)} - ${i["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(t){this.startDate=t}setEndDate(t){this.endDate=t}setEpiWeek(t){this.epiweek=t}getReportPeriod(){return this.startDate&&this.endDate?`${i["b"].toStandardHisDisplayFormat(this.startDate)} - ${i["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(t,e={}){return a["e"].getJson(t,this.buildRequest(e))}buildRequest(t={}){const e={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),this.epiweek&&(e["epiweek"]=this.epiweek),{...e,...t}}static getReportQuarters(t=4){const e=[];let s=i["b"].getCurrentYear();for(let r=0;r<t;++r)e.push({name:"Q4 "+s,start:s+"-10-01",end:s+"-12-31"}),e.push({name:"Q3 "+s,start:s+"-07-01",end:s+"-09-30"}),e.push({name:"Q2 "+s,start:s+"-04-01",end:s+"-06-30"}),e.push({name:"Q1 "+s,start:s+"-01-01",end:s+"-03-31"}),--s;return e}}}}]);
//# sourceMappingURL=chunk-38b20952.c6105171.js.map