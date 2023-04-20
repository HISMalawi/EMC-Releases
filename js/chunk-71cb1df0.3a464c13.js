(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71cb1df0"],{"0437":function(t,e,r){"use strict";r.r(e);var a=r("7a23");function s(t,e,r,s,o,n){const i=Object(a["resolveComponent"])("report-template"),d=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(d,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(i,{title:t.title,rows:t.rows,fields:t.fields,columns:t.columns,period:t.period,onReportConfiguration:t.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]),_:1})}var o=r("552a"),n=r("9ceb"),i=r("44e3"),d=r("d867"),p=r("ad9e"),c=Object(a["defineComponent"])({components:{ReportTemplate:o["a"],IonPage:d["D"]},mixins:[i["a"]],data:()=>({title:"CC Type of Treatment",rows:[],reportService:{},columns:[[n["a"].thTxt("Fine Age"),n["a"].thTxt("CXCA_TX_Cryotherapy"),n["a"].thTxt("CXCA_TX_Thermocoagulation"),n["a"].thTxt("CXCA_TX_LEEP")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(t,e){this.reportService=new p["a"],this.reportService.setStartDate(e.start_date),this.reportService.setEndDate(e.end_date);const r=await this.reportService.getPepfarReport("CC Type of Treatment");this.rows=this.buildRows(r)},buildRows(t){return t.map(t=>[n["a"].td(t.age_group),n["a"].td(t["cryotherapy"].length),n["a"].td(t["thermocoagulation"].length),n["a"].td(t["leep"].length)])}}}),h=r("d959"),u=r.n(h);const l=u()(c,[["render",s]]);e["default"]=l},ad9e:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var a=r("ade3"),s=(r("14d9"),r("1c74")),o=r("9283");class n extends s["e"]{constructor(){super(),Object(a["a"])(this,"programID",void 0),Object(a["a"])(this,"startDate",void 0),Object(a["a"])(this,"endDate",void 0),Object(a["a"])(this,"date",void 0),this.endDate="",this.startDate="",this.date=s["e"].getSessionDate(),this.programID=s["e"].getProgramID()}getPepfarReport(t){return this.getReport("pepfar_cxca",{report_name:t})}getClinicReport(t){return this.getReport("screened_for_cxca",{report_name:t})}getMohReport(t){return this.getReport("screened_for_cxca",{report_name:t})}getDateIntervalPeriod(){return`${o["b"].toStandardHisDisplayFormat(this.startDate)} - ${o["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(t){this.startDate=t}setEndDate(t){this.endDate=t}getReportPeriod(){return this.startDate&&this.endDate?`${o["b"].toStandardHisDisplayFormat(this.startDate)} - ${o["b"].toStandardHisDisplayFormat(this.endDate)}`:"-"}getReport(t,e={}){return s["e"].getJson(t,this.buildRequest(e))}buildRequest(t={}){const e={date:this.date,program_id:24};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),{...e,...t}}static getReportQuarters(t=4){const e=[];let r=o["b"].getCurrentYear();for(let a=0;a<t;++a)e.push({name:"Q4 "+r,start:r+"-10-01",end:r+"-12-31"}),e.push({name:"Q3 "+r,start:r+"-07-01",end:r+"-09-30"}),e.push({name:"Q2 "+r,start:r+"-04-01",end:r+"-06-30"}),e.push({name:"Q1 "+r,start:r+"-01-01",end:r+"-03-31"}),--r;return e}}}}]);
//# sourceMappingURL=chunk-71cb1df0.3a464c13.js.map