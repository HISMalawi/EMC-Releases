(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0080112c"],{ac7a:function(t,e,n){"use strict";n.r(e);var a=n("7a23");function r(t,e,n,r,o,c){var i=Object(a["resolveComponent"])("report-template"),s=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(s,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(i,{title:t.title,rows:t.rows,fields:t.fields,columns:t.columns,period:t.period,onReportConfiguration:t.init},null,8,["title","rows","fields","columns","period","onReportConfiguration"])]})),_:1})}var o=n("1da1"),c=(n("d81d"),n("96cf"),n("552a")),i=n("9ceb"),s=n("44e3"),u=n("8a30"),d=n("ad9e"),p=Object(a["defineComponent"])({components:{ReportTemplate:c["a"],IonPage:u["D"]},mixins:[s["a"]],data:function(){return{title:"CC Type of Screen",rows:[],reportService:{},columns:[[i["a"].thTxt("Fine Age"),i["a"].thTxt("CXCA_SCRN_First screen"),i["a"].thTxt("CXCA_SCRN_Rescreen"),i["a"].thTxt("CXCA_SCRN_Follow Up Screen")]]}},created:function(){this.fields=this.getDateDurationFields()},methods:{init:function(t,e){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.reportService=new d["a"],n.reportService.setStartDate(e.start_date),n.reportService.setEndDate(e.end_date),t.next=5,n.reportService.getPepfarReport("CC Type of Screen");case 5:a=t.sent,n.rows=n.buildRows(a);case 7:case"end":return t.stop()}}),t)})))()},buildRows:function(t){return t.map((function(t){return[i["a"].td(t.age_group),i["a"].td(t["first_screen"].length),i["a"].td(t["rescreen"].length),i["a"].td(t["follow_up_screen"].length)]}))}}}),l=n("6b0d"),f=n.n(l);const h=f()(p,[["render",r]]);e["default"]=h},ad9e:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var a=n("5530"),r=n("d4ec"),o=n("bee2"),c=n("262e"),i=n("2caf"),s=(n("99af"),n("1c74")),u=n("9283"),d=function(t){Object(c["a"])(n,t);var e=Object(i["a"])(n);function n(){var t;return Object(r["a"])(this,n),t=e.call(this),t.endDate="",t.startDate="",t.date=s["e"].getSessionDate(),t.programID=s["e"].getProgramID(),t}return Object(o["a"])(n,[{key:"getPepfarReport",value:function(t){return this.getReport("pepfar_cxca",{report_name:t})}},{key:"getClinicReport",value:function(t){return this.getReport("screened_for_cxca",{report_name:t})}},{key:"getDateIntervalPeriod",value:function(){return"".concat(u["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(u["b"].toStandardHisDisplayFormat(this.endDate))}},{key:"setStartDate",value:function(t){this.startDate=t}},{key:"setEndDate",value:function(t){this.endDate=t}},{key:"getReportPeriod",value:function(){return this.startDate&&this.endDate?"".concat(u["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(u["b"].toStandardHisDisplayFormat(this.endDate)):"-"}},{key:"getReport",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return s["e"].getJson(t,this.buildRequest(e))}},{key:"buildRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(e["start_date"]=this.startDate,e["end_date"]=this.endDate),Object(a["a"])(Object(a["a"])({},e),t)}}],[{key:"getReportQuarters",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4,e=[],n=u["b"].getCurrentYear(),a=0;a<t;++a)e.push({name:"Q4 ".concat(n),start:"".concat(n,"-10-01"),end:"".concat(n,"-12-31")}),e.push({name:"Q3 ".concat(n),start:"".concat(n,"-07-01"),end:"".concat(n,"-09-30")}),e.push({name:"Q2 ".concat(n),start:"".concat(n,"-04-01"),end:"".concat(n,"-06-30")}),e.push({name:"Q1 ".concat(n),start:"".concat(n,"-01-01"),end:"".concat(n,"-03-31")}),--n;return e}}]),n}(s["e"])}}]);
//# sourceMappingURL=chunk-0080112c.df04db2a.js.map