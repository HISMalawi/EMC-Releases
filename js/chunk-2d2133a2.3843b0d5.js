(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2133a2"],{ac7a:function(e,t,o){"use strict";o.r(t);var r=o("7a23");function n(e,t,o,n,i,a){const s=Object(r["resolveComponent"])("report-template"),c=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(c,null,{default:Object(r["withCtx"])(()=>[Object(r["createVNode"])(s,{title:e.title,rows:e.rows,fields:e.fields,columns:e.columns,period:e.period,onReportConfiguration:e.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]),_:1})}var i=o("552a"),a=o("9ceb"),s=o("44e3"),c=o("8a30"),l=o("ad9e"),p=Object(r["defineComponent"])({components:{ReportTemplate:i["a"],IonPage:c["D"]},mixins:[s["a"]],data:()=>({title:"CC Type of Screen",rows:[],reportService:{},columns:[[a["a"].thTxt("Fine Age"),a["a"].thTxt("CXCA_SCRN_First screen"),a["a"].thTxt("CXCA_SCRN_Rescreen"),a["a"].thTxt("CXCA_SCRN_Follow Up Screen")]]}),created(){this.fields=this.getDateDurationFields()},methods:{async init(e,t){this.reportService=new l["a"],this.reportService.setStartDate(t.start_date),this.reportService.setEndDate(t.end_date);const o=await this.reportService.getPepfarReport("CC Type of Screen");this.rows=this.buildRows(o)},buildRows(e){return e.map(e=>[a["a"].td(e.age_group),a["a"].td(e["first_screen"].length),a["a"].td(e["rescreen"].length),a["a"].td(e["follow_up_screen"].length)])}}}),d=o("6b0d"),u=o.n(d);const h=u()(p,[["render",n]]);t["default"]=h}}]);
//# sourceMappingURL=chunk-2d2133a2.3843b0d5.js.map