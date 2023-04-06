(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-116c7d50"],{ad9e:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var r=a("ade3"),s=(a("14d9"),a("1c74")),o=a("9283");class n extends s["e"]{constructor(){super(),Object(r["a"])(this,"programID",void 0),Object(r["a"])(this,"startDate",void 0),Object(r["a"])(this,"endDate",void 0),Object(r["a"])(this,"date",void 0),this.endDate="",this.startDate="",this.date=s["e"].getSessionDate(),this.programID=s["e"].getProgramID()}getPepfarReport(t){return this.getReport("pepfar_cxca",{report_name:t})}getClinicReport(t){return this.getReport("screened_for_cxca",{report_name:t})}getMohReport(t){return this.getReport("screened_for_cxca",{report_name:t})}getDateIntervalPeriod(){return`${o["b"].toStandardHisDisplayFormat(this.startDate)} - ${o["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(t){this.startDate=t}setEndDate(t){this.endDate=t}getReportPeriod(){return this.startDate&&this.endDate?`${o["b"].toStandardHisDisplayFormat(this.startDate)} - ${o["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(t,e={}){return s["e"].getJson(t,this.buildRequest(e))}buildRequest(t={}){const e={date:this.date,program_id:24};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),{...e,...t}}static getReportQuarters(t=4){const e=[];let a=o["b"].getCurrentYear();for(let r=0;r<t;++r)e.push({name:"Q4 "+a,start:a+"-10-01",end:a+"-12-31"}),e.push({name:"Q3 "+a,start:a+"-07-01",end:a+"-09-30"}),e.push({name:"Q2 "+a,start:a+"-04-01",end:a+"-06-30"}),e.push({name:"Q1 "+a,start:a+"-01-01",end:a+"-03-31"}),--a;return e}}},f240:function(t,e,a){"use strict";a.r(e);var r=a("7a23");function s(t,e,a,s,o,n){const i=Object(r["resolveComponent"])("report-template"),d=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(d,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(i,{title:t.title,rows:t.rows,fields:t.fields,columns:t.columns,period:t.period,onReportConfiguration:t.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]),_:1})}var o=a("552a"),n=a("9ceb"),i=a("44e3"),d=a("d867"),c=a("ad9e"),l=Object(r["defineComponent"])({components:{ReportTemplate:o["a"],IonPage:d["D"]},mixins:[i["a"]],data:()=>({title:"CC All Questions",rows:[],reportService:{},columns:[[n["a"].thTxt("",{sortable:!1,exportable:!1}),n["a"].thTxt("Type of Screening",{colspan:3,sortable:!1,exportable:!1}),n["a"].thTxt("Screening Result",{colspan:3,sortable:!1,exportable:!1}),n["a"].thTxt("Type of Treatment",{colspan:3,sortable:!1,exportable:!1})],[n["a"].thTxt("Fine Age"),n["a"].thTxt("CXCA_SCRN_First screen"),n["a"].thTxt("CXCA_SCRN_Rescreen"),n["a"].thTxt("CXCA_SCRN_Follow Up Screen"),n["a"].thTxt("CXCA_SCRN_Negative"),n["a"].thTxt("CXCA_SCRN_Positive"),n["a"].thTxt("CXCA_SCRN_Suspected Cancer"),n["a"].thTxt("CXCA_TX_Cryotherapy"),n["a"].thTxt("CXCA_TX_Thermocoagulation"),n["a"].thTxt("CXCA_TX_LEEP")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(t,e){this.reportService=new c["a"],this.reportService.setStartDate(e.start_date),this.reportService.setEndDate(e.end_date);const a=await this.reportService.getPepfarReport("CC All Questions");this.rows=this.buildRows(a)},buildRows(t){return t.map(t=>[n["a"].td(t.age_group),n["a"].td(t["first_screen"].length),n["a"].td(t["rescreen"].length),n["a"].td(t["follow_up_screen"].length),n["a"].td(t["result_negative"].length),n["a"].td(t["result_positive"].length),n["a"].td(t["result_suspected_cancer"].length),n["a"].td(t["cryotherapy"].length),n["a"].td(t["thermocoagulation"].length),n["a"].td(t["leep"].length)])}}}),p=a("d959"),h=a.n(p);const u=h()(l,[["render",s]]);e["default"]=u}}]);
//# sourceMappingURL=chunk-116c7d50.1586b6dc.js.map