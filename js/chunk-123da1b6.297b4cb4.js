(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-123da1b6"],{ad9e:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var r=a("ade3"),s=(a("14d9"),a("1c74")),n=a("9283");class i extends s["e"]{constructor(){super(),Object(r["a"])(this,"programID",void 0),Object(r["a"])(this,"startDate",void 0),Object(r["a"])(this,"endDate",void 0),Object(r["a"])(this,"date",void 0),this.endDate="",this.startDate="",this.date=s["e"].getSessionDate(),this.programID=s["e"].getProgramID()}getPepfarReport(t){return this.getReport("pepfar_cxca",{report_name:t})}getClinicReport(t){return this.getReport("screened_for_cxca",{report_name:t})}getMohReport(t){return this.getReport("screened_for_cxca",{report_name:t})}getDateIntervalPeriod(){return`${n["b"].toStandardHisDisplayFormat(this.startDate)} - ${n["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(t){this.startDate=t}setEndDate(t){this.endDate=t}getReportPeriod(){return this.startDate&&this.endDate?`${n["b"].toStandardHisDisplayFormat(this.startDate)} - ${n["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(t,e={}){return s["e"].getJson(t,this.buildRequest(e))}buildRequest(t={}){const e={date:this.date,program_id:24};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),{...e,...t}}static getReportQuarters(t=4){const e=[];let a=n["b"].getCurrentYear();for(let r=0;r<t;++r)e.push({name:"Q4 "+a,start:a+"-10-01",end:a+"-12-31"}),e.push({name:"Q3 "+a,start:a+"-07-01",end:a+"-09-30"}),e.push({name:"Q2 "+a,start:a+"-04-01",end:a+"-06-30"}),e.push({name:"Q1 "+a,start:a+"-01-01",end:a+"-03-31"}),--a;return e}}},c930:function(t,e,a){"use strict";a.r(e);var r=a("7a23");function s(t,e,a,s,n,i){const o=Object(r["resolveComponent"])("report-template"),d=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(d,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(o,{title:t.title,rows:t.rows,fields:t.fields,columns:t.columns,period:t.period,canExportPDf:!1,canExportCsv:!1,onReportConfiguration:t.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]),_:1})}a("14d9");var n=a("552a"),i=a("9ceb"),o=a("44e3"),d=a("d867"),c=a("ad9e"),p=Object(r["defineComponent"])({components:{ReportTemplate:n["a"],IonPage:d["D"]},mixins:[o["a"]],data:()=>({title:"Booked Clients",rows:[],reportService:{},columns:[[i["a"].thTxt(""),i["a"].thTxt("First Name"),i["a"].thTxt("Last Name"),i["a"].thTxt("Birthdate"),i["a"].thTxt("Booked"),i["a"].thTxt("Seen"),i["a"].thTxt("Action")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(t,e){this.reportService=new c["a"],this.reportService.setStartDate(e.start_date),this.reportService.setEndDate(e.end_date);const a=await this.reportService.getClinicReport("BOOKED CLIENTS FROM ART RAW DATA");this.rows=this.buildRows(a)},buildRows(t){return t.map(t=>[i["a"].td(t["identifier"]),i["a"].td(t["given_name"]),i["a"].td(t["family_name"]),i["a"].tdDate(t["dob"]),i["a"].td(t["gender"]),i["a"].td(t["seen"]),i["a"].tdBtn("View",()=>this.$router.push("/patient/dashboard/"+t["person_id"]))])}}}),h=a("d959"),u=a.n(h);const l=u()(p,[["render",s]]);e["default"]=l}}]);
//# sourceMappingURL=chunk-123da1b6.297b4cb4.js.map